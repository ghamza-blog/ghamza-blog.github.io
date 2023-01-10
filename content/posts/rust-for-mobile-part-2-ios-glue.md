---
title: "Rust for Mobile Development Part 2: iOS Glue"
date: 2022-12-10T15:55:57+02:00
draft: true
description: "rust-for-mobile-part-2-ios-glue"
---

- [Library Target](#library-target)
- [Dependencies](#dependencies)
- [iOS Glue Setup](#ios-glue-setup)
  - [Build File](#build-file)
  - [Errors](#errors)
  - [Prelude](#prelude)
  - [FFI Helpers](#ffi-helpers)
  - [Glue](#glue)
- [Building the Project](#building-the-project)
- [Using the Library](#using-the-library)

Most of our work is going to be on `src/ios_glue`

## Library Target

Inside `src/ios_glue/Cargo.toml` add the library target and make the crate type a static library

```toml
[package]
name = "ios_glue"
version = "0.1.0"
edition = "2021"

[lib]
name = "greeting"
crate-type = ["staticlib"]
```

## Dependencies

We want the `greeting_core` and `libc`, `greeting_core` is going to be our library and we want to glue it with iOS, and `libc` which provides all of the definitions necessary to easily interoperate with C code (or "C-like" code) on each of the platforms that Rust supports.

We want to export our library as C interfaces so that we can use C types and C functions directly from Swift. [C interoperability with Swift](https://developer.apple.com/documentation/swift/c-interoperability).

And finally we want `cbindgen` to generate C bindings.

Run

```shell
# From the project root directory
cargo add -p ios_glue --path ./src/greeting_core/
cargo add -p ios_glue libc
cargo add -p ios_glue --build cbindgen
```

## iOS Glue Setup

### Build File

Create `src/ios_glue/build.rs` and add to our bindings setup

```rust
extern crate cbindgen;
use std::env;
use cbindgen::Language::C;

fn main() {
    setup_cbindgen();
}

fn setup_cbindgen() {
    let crate_dir = env::var("CARGO_MANIFEST_DIR");
    match crate_dir {
        Ok(val) => {
            cbindgen::Builder::new()
                .with_crate(val)
                .with_language(C)
                .generate()
                .expect("Unable to generate bindings")
                .write_to_file("include/greeting_native.h");
        }
        Err(err) => {
            println!("Error: {}", err);
        }
    }
}
```

Now whenever we added an exported C function its signature will be added to `src/ios_glue/include/greeting_native.h` on save.

Create `src/ios_glue/src/include/module.modulemap` and add the proper info to export the headers

```modulemap
module Greeting {
    header "greeting_native.h"
    export *
}
```

### Errors

Create `src/ios_glue/src/error.rs` that will contain our errors enum to be handled later on.

```rust
#[derive(Debug)]
pub enum Error {
    InvalidUtf8,
    InvalidUint,
}

```

### Prelude

Prelude is going to be imported on most of the files, so we want to make it as minimal as possibile.

Inside of it we're going to make a shortcut for the `Result` type.

```rust
pub use crate::error::Error;

pub type Result<T> = core::result::Result<T, Error>;
```

Now we can add both of them to `src/ios_glue/src/lib.rs`

```rust
mod error;
mod prelude;
```

### FFI Helpers

FFI stands for foriegn function interface, we will add helpers for converting to and from C types

Create `src/ios_glue/src/ffi_helpers.rs`

```rust
use crate::prelude::*;
use libc::c_char;
use std::ffi::{CStr, CString};

pub unsafe fn to_rust_str<'a>(raw_ptr: *const c_char) -> Result<&'a str> {
    match CStr::from_ptr(raw_ptr).to_str() {
        Ok(res) => Ok(res),
        Err(_) => Err(Error::InvalidUtf8),
    }
}

pub fn to_c_str(s: &str) -> Result<*mut i8> {
    match CString::new(s) {
        Ok(string) => Ok(string.into_raw()),
        Err(_) => Err(Error::InvalidUint),
    }
}
```

And finally import `ffi_helpers.rs` inside `lib.rs`

```rust
mod error;
mod prelude;
mod ffi_helpers;
```

### Glue

For the gluing part, we want to import `libc` and `greeting_core` and with the help of `ffi_helpers` we can convert our input to rust, send it to `greet` function then convert its outout to a C char array and finally return it.

```rust
mod error;
mod ffi_helpers;
mod prelude;

use greeting_core::greet;
use libc::c_char;

#[no_mangle]
pub unsafe extern "C" fn greet_person(name: *const c_char) -> *mut c_char {
    let Ok(name) = ffi_helpers::to_rust_str(name) else {
        panic!("Failed to convert to rust string slice");
    };
    let name = greet(name);
    let Ok(name) = ffi_helpers::to_c_str(&name) else {
        panic!("Failed to convert to char array");
    };

    name
}
```

The `#[no_mangle]` is an important part, so on build the function name is still the same, it we don't wanted it to be mangled.

Now if you save, you should be able to see the `greeting_native.h` has added a function.

```c
#include <stdarg.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdlib.h>

char *greet_person(const char *name);
```

## Building the Project

Add these commands to the `Makefile`

```make
ios: ios-clean ios-build ios-framework

ios-build:
 @echo "Building for iOS..."

 @for target in ${ios_targets} ; do \
  cargo build -p ios_glue --release --target $$target ; \
 done

 @lipo -create \
  target/x86_64-apple-ios/release/lib${lib_name}.a \
  target/aarch64-apple-ios-sim/release/lib${lib_name}.a \
  -output target/lib${lib_name}_sim.a

ios-framework:
 @xcodebuild -create-xcframework \
  -library target/lib${lib_name}_sim.a \
  -headers src/ios_glue/include/ \
  -library target/aarch64-apple-ios/release/lib${lib_name}.a \
  -headers src/ios_glue/include/ \
  -output target/${framework_name}.xcframework

ios-clean:
 @cd target && rm -rf ${framework_name}.xcframework

```

And now run `make ios`

`ios-build` is going to loop over the ios targets that we specified, and build the project targeting them. Then using `lipo` we're going to create `.a` files

And finally we want to bundle the `.a` files inside an `xcframework` so we can use it in our ios app.

## Using the Library
