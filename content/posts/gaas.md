---
title: "GaaS"
date: 2022-04-18T22:28:02+03:00
draft: true
description: "Github as a Service"
---

We're going to look at how to create a blog similar to this one using `Github` and `Hugo`

- [Hugo](#hugo)
  - [Install Hugo](#install-hugo)
    - [On Mac](#on-mac)
    - [On Windows](#on-windows)
    - [On Linux](#on-linux)
  - [Generating an Hugo site](#generating-an-hugo-site)
  - [Add a Theme](#add-a-theme)
  - [Create a New Post](#create-a-new-post)
  - [Start the Hugo Server](#start-the-hugo-server)
  - [Customizing the website](#customizing-the-website)
- [Github](#github)
  - [Repo](#repo)
  - [Deployment](#deployment)

## Hugo

Hugo is one of the most popular open-source static site generators (SSG).

SSGs are tools that generate a full static HTML website based on raw data and a set of templates. With Hugo we're going to write markdown files and generate a website out of them, so that we can focus on the content rather than the development.

### Install Hugo

First you should [install hugo](https://gohugo.io/getting-started/installing/)

#### On Mac
If you're on mac and you have homebrew installed, run this command:

```shell
brew install hugo
```

#### On Windows
If you're on windows you can follow [this video](https://www.youtube.com/watch?v=G7umPCU-8xc&ab_channel=MikeDane) or follow [this written guide](https://www.youtube.com/watch?v=G7umPCU-8xc&ab_channel=MikeDane).

Then verify that the installation went successfully

```shell
hugo version
```

#### On Linux
You're a linux user man 🤓

### Generating an Hugo site

Run

```shell
hugo new site gaas-blog
```

The above will create a new Hugo site in a folder named `gaas-blog`

### Add a Theme

```shell
cd gaas-blog
git init
git submodule add https://github.com/Ghamza-Jd/baseet.git themes/baseet
echo theme = \"baseet\" >> config.toml
```

### Create a New Post

You can manually create content files. However, you can use the `new` command.

```shell
hugo new posts/first-post.md
```

The file you created will start with something like this:

```md
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

### Customizing the website

After running the blog you should have a page that looks like this:

Let us add these configs to `config.toml` and save.

```toml
baseURL = "https://blog.ghamza.dev"
language = "en-us"
title = "Ghamza Blog"
theme = "baseet"
copyright = "© Hamza Jadid"

[params]
mode = "auto"
useCDN = true
subtitle = "Personal blog to share computer science and software engineering articles."

[[params.social]]
name = "GitHub"
icon = "github"
url = "https://github.com/Ghamza-Jd"

[[params.social]]
name = "rss"
icon = "rss"
url = "https://blog.ghamza.dev/index.xml"

[[menu.main]]
name = "Archives"
url = "/posts"
weight = 1

[[menu.main]]
name = "Tags"
url = "/tags"
weight = 2
```

## Github

### Repo

Create a github repository, this repo should have the format of `<your github username>.github.io` and ensure it is public.

### Deployment

```shell
git remote add origin
git add .
git commit -m "initial commit"
git push origin main
```

*Note*: if your main branch is named master, replace the occurance of main to master

```diff
on:
    push:
        branches:
-       - main
+       - master
```
