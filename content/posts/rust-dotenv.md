---
title: "Rust .env"
date: 2023-01-11T03:09:15+02:00
draft: false
tags: ["Rust"]
description: "Load Environment Variales in Rust"
---

## Environment Variables

Good practice in software development is parametrizing our environment; for example, if we're accessing a database and want to store the URL, username, and password, we should parametrize them so we can deploy staging and production environments without changing code.

## Enviroment Varaibles in Rust

We can access the environment variables from `std::env::var`.

```rust
use std::env;

fn main() {
    let db_url = env::var("DB_URL").unwrap();
    let db_user = env::var("DB_USER").unwrap();
    let db_pass = env::var("DB_PASS").unwrap();
    println!("{db_url} {db_user} {db_pass}");
}
```

Then we can run the project.

```shell
DB_URL=database.com DB_USER=dbuser DB_PASS=password cargo run

# will output
# database.com dbuser password
```

Now appending the env variables at the start of the command doesn't feel right.

## .env

The `.env` will make our parametrizion much easier by storing all our env vars in it.

Add `dotenv` crate.

```shell
cargo add dotenv
```

Then put your environment variables in a `.env` file in the form of `KEY=value`.

```text
DB_URL=database.com
DB_USER=dbuser
DB_PASS=password

# This is a comment
# SECRET_KEY=1234
```

Finally, call `dotnev()`

```rust
use dotenv::dotenv;
use std::env;

fn main() {
    _ = dotenv();
    let db_url = env::var("DB_URL").unwrap();
    let db_user = env::var("DB_USER").unwrap();
    let db_pass = env::var("DB_PASS").unwrap();
    println!("{db_url} {db_user} {db_pass}");
}
```

---
**Lots of boilerplates?**

Use `dotenv_codegen`, and getting the environment variable is as simple as `dotenv("DB_USER")`.

```shell
cargo add dotenv_codegen
```

Final code:

```rust
#[macro_use]
extern crate dotenv_codegen;
use dotenv::dotenv;

fn main() {
    _ = dotenv();
    let db_url = dotenv!("DB_URL");
    let db_user = dotenv!("DB_USER");
    let db_pass = dotenv!("DB_PASS");
    println!("{db_url} {db_user} {db_pass}");
}
```
