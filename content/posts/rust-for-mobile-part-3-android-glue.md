---
title: "Rust for Mobile Development Part 3 Android Glue"
date: 2023-01-11T06:20:15+02:00
draft: true
tags: ["Rust", "Rust for Mobile"]
description: "Gluing Rust and Android"
---

- [Library Target](#library-target)
- [Dependencies](#dependencies)
- [JNI setup](#jni-setup)
  - [Logger](#logger)
  - [JNI Conventions](#jni-conventions)
- [Android Module](#android-module)
  - [Create Android Project](#create-android-project)
  - [Create Android Module](#create-android-module)
  - [Remove the Application Module](#remove-the-application-module)
  - [Adding the JNI Method](#adding-the-jni-method)
- [Building the Library](#building-the-library)
  - [Setup Gradle](#setup-gradle)

Most of our work is going to be on `glue/android`, and all our problems will come from here.

## Library Target

Inside `glue/ios/Cargo.toml` add the library target and make the crate type a static library

```toml {hl_lines=["6-8"],linenostart=1}
[package]
name = "android"
version = "0.1.0"
edition = "2021"

[lib]
name = "proximon"
crate_type = ["staticlib", "dylib"]
```

## Dependencies

- `exa_core`; our core library
- `jni`; java native interface
- `openssl-sys`
- `log`
- `log-panics`
- `android_logger`

Run

```shell
# From the project root directory
cargo add -p android --path ./exa_core/
cargo add -p android jni log log-panics android_logger
cargo add -p android openssl-sys --features vendored
```

## JNI setup

### Logger

Let us start simple by creating a logger that logs to logcat.

Create `glue/android/src/logger.rs` file, we will configure the logger there

```rust
// glue/android/src/logger.rs
use android_logger::Config;
use jni::objects::JClass;
use jni::JNIEnv;
use log::Level;

#[no_mangle]
#[allow(non_snake_case)]
pub extern "system" fn Java_com_example_exa_ExaLogger_initLogger(_env: JNIEnv, _: JClass) {
    android_logger::init_once(
        Config::default()
            .with_min_level(Level::Trace)
            .with_tag("Exa"),
    );
    log_panics::init();
    info!("ExaLogger initialized");
}
```

Before explaining why we named the function using Pascal_snake_CamelCase if that's a thing; let us add this as a public module in the `lib.rs`

```rust
// glue/android/src/lib.rs
#[macro_use]
extern crate log;

pub mod logger;
```

The first two lines are there so we can use `info!()` without importing it in every single file when logging an info message.

### JNI Conventions

So in the previous section we create this function `Java_com_example_exa_ExaLogger_initLogger`, in order to call a native function from JVM we should respect the JNI's convention (at least some of them for our use case).

1) The function should start with `Java`
2) We should provide the path to the class, if the class is in the package `com.example.exa` then we should add `com_example_exa` in the function name
3) Add the Java class name
4) Add the function name to the signature we have

So looking at this signature, the JVM is going to look for a class called `ExaLogger` in the `com.example.exa` package, and execute a function called `initLogger`.

Last but not least, we should always pass the enviroment and the class, even if we're not using any of them.

Now we run into an issue of how we make it reusable, if we take this library and put it in another project it's not going to work, as that project has a different package names and such.

As a solution we can make an android module, when we build that module we produce an android archive that can be used on multiple projects; `.aar` file.

## Android Module

We can't create an android module without creating android project, so we're going to create an android project, create an android module, then remove the application part and keep the library part.

Create android project in the `glue` folder, choose the `No Activity` Template.

### Create Android Project

Create android project:

1. Choose `No Activity` Template
2. Name the app something other than `exa` and the package to something other than `com.example.exa` because we're going to use those for the android library. (I'll call it `tempexa` since its going to be removed after making the module)
3. Place it in the `glue` folder and name it `android_module`, so the location should be ending with `exa-lib/glue/android_module`

### Create Android Module

To create an android module:

1. Click **File > New > New Module**
2. Choose **Android Library** template
3. Name the module `exa`
4. Name the package `com.example.exa`
5. Finish

### Remove the Application Module

1. Remove `include ':app'` from `settings.gradle`
2. Delete the `app` directory recursively `rm -rf ./glue/android_module/app`
3. Remove `id 'com.android.application` from `glue/android_module/build.gradle`, as its no longer needed

### Adding the JNI Method

Now we should respect the conventions that we've talked about earlier.

First create a (kotlin) class named `ExaLogger` inside `com.example.exa`, inside of it we need to have an external function and load the library.

```kotlin
package com.example.exa

class ExaLogger {
    companion object {
        init {
            System.loadLibrary("exa")
        }
    }

    public external fun initLogger()
}
```

## Building the Library

Finally this section 😂

You can write your own scripts for building the rust code using android ndk and get `.so` files out of it, if you're going that way keep an eye on `libunwind.a` issue. [libunwind issue][1]; [possible solution][2]

### Setup Gradle

1. In the top level `build.gradle` (`glue/android_module/build.gradle`) add `id "org.mozilla.rust-android-gradle.rust-android" version "0.9.3" apply true`
2. In the `exa` module `build.gradlew` (`glue/android_module/exa/build.gradle`) add the following:

```gradle {hl_lines=[4,10, "35-66"],linenostart=1}
plugins {
    id 'com.android.library'
    id 'org.jetbrains.kotlin.android'
    id 'org.mozilla.rust-android-gradle.rust-android'
}

android {
    namespace 'com.example.exa'
    compileSdk 32
    ndkVersion "25.0.8775105"

    defaultConfig {
        minSdk 21
        targetSdk 32

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        consumerProguardFiles "consumer-rules.pro"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = '1.8'
    }
}

cargo {
    module  = "../.."
    targets = ["arm64", "arm", "x86_64", "x86"]
    libname = "exa"
    profile = "release"
    pythonCommand = "python3"
    extraCargoBuildArguments = ['-p', 'android']
}

dependencies {
    implementation 'androidx.core:core-ktx:1.7.0'
    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.1.3'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.4.0'
}

tasks.whenTaskAdded { task ->
    if ((task.name == 'javaPreCompileDebug' || task.name == 'javaPreCompileRelease')) {
        task.dependsOn 'cargoBuild'
    }
}

afterEvaluate {
    android.libraryVariants.all { variant ->
        def productFlavor = ""
        variant.productFlavors.each {
            productFlavor += "${it.name.capitalize()}"
        }
        def buildType = "${variant.buildType.name.capitalize()}"
        tasks["generate${productFlavor}${buildType}Assets"].dependsOn(tasks["cargoBuild"])
    }
}
```

I'm using version `25.0.8775105` of NDK, change that with what you have on your machine, but make sure its >= version 23



[1]: https://github.com/rust-lang/rust/issues/103673
[2]: https://stackoverflow.com/questions/68873570/how-do-i-fix-ld-error-unable-to-find-library-lgcc-when-cross-compiling-rust
