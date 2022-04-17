---
title: "Computer Compression"
date: 2021-04-04T13:00:00+03:00
draft: false
tags: ["Easy CS"]
description: "The science behind decreasing file sizes."
---

Compression isn't something new, people used to compress things even before computers, folding-papers for example, so if you have a piece of paper containing some information or data, you can't keep it in its flat state, so to make it mobile you have to fold it, to reduce its size so that it can be carried easily.

However, compression has its disadvantages as well, when something is compressed it becomes "unreadable", so if you fold a paper it's no longer readable.

There are many levels of compression, you can compress a file too hard to make it small in size or you can lightly compress a file but its size will just decrease in accordance. Going back to the first example, we can fold a paper 4 times and it will surely become smaller than folding it 1 or 2 times, but here's where things get tricky, there's a limit to how much we can fold a paper, the same case applies when compressing a computer file.

But why should we compress a file lightly? why not always compress it hardly? Well, the more you compress, the harder/longer it takes to decompress that file, a 5-times folded paper will consume more time in the unfolding process than a 1-time folded paper.

Compression comes in different algorithms or methods, each one of those methods is used for a certain case. Back to the paper's example, we can fold a paper or scrabble it. Folding is used to keep information and maintain the geometry of the paper. On the other hand, scrabbling is used in case we want to play with the paper, or simply throw it in the trash.

Compression could be used for other purposes, for example, you can wrap a newspaper and try to kill a fly with it, well the same idea is used in computers, sometimes you don't care about reducing the file size, rather you just want to add a password for accessing those files, or you send a single file in your email instead of 10 attachments.

Compression is also used in videos, for example if you have a ten minutes long 1080p video that is being played at 24fps (frames per second), then the size should be 1MB x 24 x 10 x 60 = ~14GB (we have 10 minutes = 60 x 10 = 600 seconds, and each second we are displaying 24 frames; 600 x 24 = 14,400 frames, say each frame is 1 mega byte in size; 14,400 x 1MB = 14,400MB = 14.0625GB), which is not the case, all thanks to compression, now we are able to deliver the 1080p video in a relatively small size file (~10MB).

There are two types of compression, lossy compression and lossless compression, lossy is achieved by eliminating data; WhatsApp uses Lossy compression on images, when you send an image file on WhatsApp the quality is reduced, it sucks right? For some use cases we wont even realize the difference between a normal file and a compressed one.

| ![cat][original_cat] | ![compresesed cat image][compressed_cat] |
| :------------------: | :--------------------------------------: |
|       ~3.89 MB       |                 ~768 KB                  |

Using lossy compression on text files will not rslt in gtting bck the exct dta. (Pun intended 😉)

On the other hand, the lossless compression is used for keeping the same data before compression and after decompression, for example, if you write an article using word document, no loss of words will occur after compressing the file.

[original_cat]: https://static.ghamza.dev/images/computer-compression/original_cat.JPG
[compressed_cat]: https://static.ghamza.dev/images/computer-compression/compressed_cat.JPG
