---
title: "Building a CLI tool in Rust"
date: 2023-04-07T04:20:15+02:00
draft: false
tags: ["Rust"]
description: "Build a CLI tool in Rust"
---

Today we're going learn how to write a CLI tool in rust
through creating a dummy implementation of [Github's CLI tool](https://cli.github.com/).

We're calling it `dugh` (dummy Github 🤓).

## Defining the functionality

Before we start writing code, we should define the functionality of our tool.

We will start with managing pull requests command and making the tool extensible for other commands.

An example command would be:

```shell
cargo dugh pr create -t "title" -d
```

## Project setup

Create a new bin rust project.

```shell
cargo new --bin dugh
cd dugh
```

Add the dependencies that we need.

```shell
cargo add anyhow
cargo add clap -F derive
```

We are using `anyhow` for error handling and `clap` for parsing the command line arguments
with the `derive` feature to fill command line args into a structure.

## Basic setup

Setup `clap` inside `main.rs` by making a struct and derive `Parser`

```rust
// main.rs
use anyhow::Result;
use clap::Parser;

#[derive(Parser)]
#[command(version, about, long_about = None)]
struct Cli {}

fn main() -> Result<()> {
    let cli = Cli::parse();
    Ok(())
}
```

We are going to create the `Execute` trait. The purpose of it is to make all subcommands implement it.

> Not that important but I like to see things fall under the same rules.

```rust
// execute.rs
use anyhow::Result;

pub trait Execute {
    fn execute(&self) -> Result<()>;
}
```

And surely add `mod execute;` in `main.rs`

```rust {hl_lines=[2]}
// main.rs
mod execute;

use anyhow::Result;
use clap::Parser;

#[derive(Parser)]
#[command(version, about, long_about = None)]
struct Cli {}

fn main() -> Result<()> {
    let cli = Cli::parse();
    Ok(())
}
```

Now we can create `Dugh` and have dugh's implement `Execute`.

```rust
// dugh.rs
use crate::execute::Execute;
use clap::Subcommand;

#[derive(Subcommand)]
pub enum Dugh {
    /// Manage pull requests
    Pr,
}

impl Execute for Dugh {
    fn execute(&self) -> anyhow::Result<()> {
        match self {
            Self::Pr => Ok(()),
        }
    }
}
```

Add `mod dugh`, import it, and add it to the `Cli` struct.

```rust {hl_lines=[2,5,8,13,14,19]}
// main.rs
mod dugh;
mod execute;

use crate::dugh::Dugh;
use anyhow::Result;
use clap::Parser;
use execute::Execute;

#[derive(Parser)]
#[command(version, about, long_about = None)]
struct Cli {
    #[command(subcommand)]
    command: Dugh,
}

fn main() -> Result<()> {
    let cli = Cli::parse();
    cli.command.execute()
}
```

Okay, we have a working base now!

```shell
cargo run -- --help
```

It's alive!

## Adding PR subcommand

Create `pr.rs`, add `mod pr;`

```rust {hl_lines=[4]}
// main.rs
mod dugh;
mod execute;
mod pr;

use crate::dugh::Dugh;
use anyhow::Result;
use clap::Parser;
use execute::Execute;

#[derive(Parser)]
#[command(version, about, long_about = None)]
struct Cli {
    #[command(subcommand)]
    command: Dugh,
}

fn main() -> Result<()> {
    let cli = Cli::parse();
    cli.command.execute()
}
```

and add our `pr` variants

```rust
// pr.rs
use clap::Subcommand;

#[derive(Subcommand)]
pub enum Pr {
    /// Create a pull request
    Create,
    /// List pull requests in a repo
    List,
    /// Show status of relevant pull requests
    Status,
}
```

The `///` is the command help message that will be displayed when passing `--help` to the tool.

Then implement `Execute`

```rust {hl_lines=[2,"15-32"]}
// pr.rs
use crate::execute::Execute;
use clap::Subcommand;

#[derive(Subcommand)]
pub enum Pr {
    /// Create a pull request
    Create,
    /// List pull requests in a repo
    List,
    /// Show status of relevant pull requests
    Status,
}

impl Execute for Pr {
    fn execute(&self) -> anyhow::Result<()> {
        match self {
            Self::Create => {
                println!("PR Created!");
                Ok(())
            }
            Self::List => {
                println!("List of PRs");
                Ok(())
            }
            Self::Status => {
                println!("PR status");
                Ok(())
            }
        }
    }
}
```

And now we can wire `Pr` with `Dugh`

```rust {hl_lines=[17]}
// dugh.rs
use crate::{execute::Execute, pr::Pr};
use clap::Subcommand;

#[derive(Subcommand)]
pub enum Dugh {
    /// Manage pull requests
    Pr {
        #[command(subcommand)]
        pr_commands: Pr,
    },
}

impl Execute for Dugh {
    fn execute(&self) -> anyhow::Result<()> {
        match self {
            Self::Pr { pr_commands } => pr_commands.execute(),
        }
    }
}
```

Let us see the result!

```shell
cargo run -- pr create
```

## Adding arguments to a command

Our `Pr` variants do not hold any data. Let us change that by making one of the variants a struct

```rust {hl_lines=["8-13", "23-26"]}
// pr.rs
use crate::execute::Execute;
use clap::Subcommand;

#[derive(Subcommand)]
pub enum Pr {
    /// Create a pull request
    Create {
        #[arg(short, long)]
        title: String,
        #[arg(short, long)]
        draft: bool,
    },
    /// List pull requests in a repo
    List,
    /// Show status of relevant pull requests
    Status,
}

impl Execute for Pr {
    fn execute(&self) -> anyhow::Result<()> {
        match self {
            Self::Create { title, draft } => {
                println!("PR {title} Created! isDraft: {draft}");
                Ok(())
            }
            Self::List => {
                println!("List of PRs");
                Ok(())
            }
            Self::Status => {
                println!("PR status");
                Ok(())
            }
        }
    }
}
```

Run again 👀

```shell
cargo run -- pr create --title fix/minor-bug-fix -d
```

## Alias the command

I like to alias the commands to make them easier to use and smaller.

```toml
# .cargo/config.toml
[alias]
dugh = "run -rq --bin dugh --"
```

Now we can run it easier

```shell
cargo dugh -d -t "Hello World"
```

> Alias becomes handy when working with a complex project, for example, the current project
> I am working on has cargo workspace and two CLI tools.

## Conclusion

We have a working base, but adding more functionality requires adding enum variants on the proper nesting level.

To support issue management, we add a new variant to `Dugh` enum. To make a new `Pr` command, we add a new enum variant for that,
and we write the logic in the branch of that variant.
