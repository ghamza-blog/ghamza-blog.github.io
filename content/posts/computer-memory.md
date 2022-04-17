---
title: "Computer Memory"
date: 2021-09-12T14:22:04+03:00
draft: false
tags: ["Easy CS"]
description: "An application to a computer is just like a book, in fact, data in memory are distributed in a page-like model."
---

Usually in computers data are stored in 3 different types of memories, nonvolatile memory (or NVM for short), volatile memory, and processor memory. Think of the application's data as a book, in fact, data in memory are distributed in a page-like model.

NVM has the capacity of storing a large amount of data, so we see computers or external storage have capacities of 500 GB, 1 TB, 2 TB, and even more. NVM's main feature is maintaining information after powering it off. Think of it as a bookshelf!

The volatile memory is computer storage that maintains its data while the device is powered. An example of a volatile memory would be the Random Access Memory (RAM), volatile memory is used to keep data for the currently opened applications, so if you open Word, Zoom, and Chrome, all three apps are being loaded in RAM. Think of RAM as your backpack.

Finally, the "processor memory" is very close to the computer's brain; the CPU, and it's very small compared to the two other types. Now think of it as your school desk.

So, the flow is as following: when you want to go to school you move your books from the bookshelf to your backpack, as soon as you arrive, you withdraw the suitable book for a certain subject, and you start using it to study for the current class.

![Visual computer memory example][computer_memory_gif_path]

Viewing the same flow according to our previous examples; when you first power up your computer, it copies the Operating System (say Windows or Android) from the NVM (bookshelf) to the RAM (backpack), now when you run Word and Chrome, both of the apps will also be loaded to the RAM, and the apps that are currently running are loaded to the processor memory (your school desk) so they can be processed.

Now, why is the memory hierarchy necessary? Looking back at our previous example, it would be insane to bring all of the books at home to school, and it'd be also illogical to go home at each period to get a specific subject, for example, get the math book, then after the math period, go back home and get the physics book.

The same thing applies to dealing with data in the computer, we can't just access the NVM directly, and we can't load the whole NVM to the processor memory.

[computer_memory_gif_path]: https://static.ghamza.dev/images/computer-memory/computer_memory.gif
