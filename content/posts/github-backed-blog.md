---
title: "Github Backed Blog"
date: 2022-04-18T22:28:02+03:00
draft: false
description: "Build a blog similar to this one with github only!"
---

Create a blog similar to this one with `Hugo` and `Github Pages`.

## Create the Website

### Install Hugo

First you should [install hugo](https://gohugo.io/getting-started/installing/)

If you're on mac and you have homebrew install you just have to run this:

```shell
brew install hugo
```

If you're on windows you can follow [this video](https://www.youtube.com/watch?v=G7umPCU-8xc&ab_channel=MikeDane) or follow [this written guide](https://www.youtube.com/watch?v=G7umPCU-8xc&ab_channel=MikeDane).

Then verify that the installation went successfully

```shell
hugo version
```

### Generating an Hugo site

Run

```shell
hugo new site my-blog
```

The above will create a new Hugo site in a folder named `my-blog`

### Add a Theme

```shell
cd my-blog
git init
git submodule add https://github.com/ghamza-blog/ghamza-archie.git themes/ghamza-archie
echo theme = \"ghamza-archie\" >> config.toml
```

### Create a New Post

You can manually create content files. However, you can use the `new` command.

```shell
hugo new post/first-post.md
```

The file you created will start with something like this:

```txt
---
title: "First Post"
date: 2022-04-18T12:00:00+03:00
draft: true
---
```

this boilerplate was predefined in the `archetypes/default.md`, so you can customize the boilerplate there.

### Start the Hugo Server

Run the below command in the website directory:

```shell
# -D, is a flag to include the draft posts
hugo server -D
```

then open a browser and go to `http://localhost:1313/`
