---
title: "Data Structures"
date: 2022-01-16T14:34:56+03:00
draft: false
tags: ["Easy CS"]
description: "Data Structures look mean, but they're nice when you get to know them!"
---

It's hard to represent information in plain text only and expect people to understand the meaning behind them. So people used different methods to ease the knowledge transfer.

Let us look at different types of representing data and how it could affect usage of it. We will learn Morse code in this article!

Morse code is a communication method invented by Samuel Morse. It's based on short and long signals. If you want to communicate with someone using light, you can turn on the light for 1 second and turn it off to show him it's a short signal and 3 seconds for long signals. For example, sending the letter A would be a short signal then a long one. We represent it on paper using dots and dashed, so A is `. _`.

To learn Morse code, we will use different methods of representing the encoding and decode of the code.

Here are the letters and Morse code for each one:
`A . _`, `B _ . . .`, `C _ . _ .`, `D _ . .`, `E .`, `F . . _ .`, `G _ _ .`, `H . . . .`, `I . .`, `J . _ _ _`, `K _ . _`, `L . _ . .`, `M _ _`, `N _ .`, `O _ _ _`, `P . _ _ .`, `Q _ _ . _`, `R . _ .`, `S . . .`, `T _`, `U . . _`, `V . . . _`, `W . _ _`, `X _ . _ _`, `Y _ . _ _`, and `Z _ _ . .`.

Obviously, this isn't the right way to list the codes. Instead, we use a table to be more straightforward.

| Letter | Code      | Letter | Code      | Letter | Code      |
| ------ | --------- | ------ | --------- | ------ | --------- |
| A      | `. _`     | J      | `._ _ _`  | S      | `. . .`   |
| B      | `_ . . .` | K      | `_ . _`   | T      | `_`       |
| C      | `_ . _ .` | L      | `. _ . .` | U      | `. . _`   |
| D      | `_ . .`   | M      | `_ _`     | V      | `. . . _` |
| E      | `.`       | N      | `_ .`     | W      | `. _ _`   |
| F      | `. . _ .` | O      | `_ _ _`   | X      | `_ . . _` |
| G      | `_ _ .`   | P      | `. _ _ .` | Y      | `_ . _ _` |
| H      | `. . . .` | Q      | `_ _ . _` | Z      | `_ _ . .` |
| I      | `. .`     | R      | `. _ .`   |        |           |

This table makes things more accessible. It's a table structure; we are already familiar with it. It represents the data in rows and columns, and now we can easily convert encoded Latin letters to Morse code and decode Morse code to Latin letters. Try to encode this message: "Morning."

Now try to decode this:

```null
_ _ .
. . . .
. _
_ _
_ _ . .
. _
```

Surly encoding was easier than decoding. It's harder to search for a code to know which letter it corresponds to because we're not as familiar with Morse code as we are with Latin letters, so we need a better way of decoding. And here, I introduce you to the binary search tree.

![Morse Code Binary Search Tree][morse_code_bst]

It's called binary since there exist at most 2 possibilities at any part of the tree. We can traverse this tree to decode Morse code and find its corresponding Latin letter.

Let us use this tree to decode the first code in the example `_ _ .`

First, we encounter a `_`, so we'll go to the bottom branch of the tree.

![step one][step_1]

We got another `_`, so again, we'll take the bottom route of the subtree

![step two][step_2]

Lastly, we got a `.` so we'll go the upper part of the subtree, the code ends here, and we got a `G`.

![Letter found][letter_found]

As you saw, data structures are all about bringing data together logically and facilitating the effective use and sharing of information.

[morse_code_bst]: https://static.ghamza.dev/images/data-structures/morse_code_bst.png
[step_1]: https://static.ghamza.dev/images/data-structures/step_1.png
[step_2]: https://static.ghamza.dev/images/data-structures/step_2.png
[letter_found]: https://static.ghamza.dev/images/data-structures/found.png
