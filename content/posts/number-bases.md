---
title: "Number Bases"
date: 2022-01-03T01:00:00+03:00
draft: false
tags: ["Easy CS"]
description: "Let us look at our number systems and see what number bases mean."
---

## Old number systems

Most historians believe that numbers were originally invented to count things, such as people, possessions, and transactions in commerce. For example, if someone owned three apples, it was written as drawings of three apples 🍎🍎🍎

The person whose job it was to draw the apples and other things thought, "Why do I have to draw the same thing multiple times? Why can't I draw it once and indicate that there are several of them with, I don't know, a scratch mark or something?"

🍎 ////

And then there came the day when someone had 38 apples, and the scratch marks got ridiculous.

🍎 //////////////////////////////////////

Someone said, "There's got to be a better way," and a number system was born.

Only Roman numerals are still common in all the early number systems. You find them on the faces of clocks and watches, used for dates on monuments and statues, for some page numbering in
books, some items in an outline, and—most annoyingly—for the copyright notice in movies.

Thirty-eight apples in Roman numerals is XXXVIII

The concept here is easy enough: The X stands for ten scratch marks, and the V stands for five.

The symbols of Roman numerals that survive today are I V X L C D M

The I is a one. This could be derived from a single raised finger. The V, probably a symbol for a hand, stands for five. Two V's make an X, which stands for ten. The L is fifty. The letter C comes from the word centum, Latin for a hundred. D is five hundred. Finally, M comes from the Latin word mille, or a thousand.

Although we might disagree, Roman numerals were considered easy to add and subtract for a long time, and that's why they survived so long in Europe for bookkeeping. Indeed, when adding two Roman numerals, you combine all the symbols from both numbers and then simplify the result using just a few rules: five I's make a V, two V's make an X, five X's make L, and so forth.

But multiplying and dividing Roman numerals is difficult. Many other early number systems (such as the ancient Greeks) are similarly inadequate for working with numbers sophisticatedly.

## Modern number systems

The number system we use today is known as the Hindu-Arabic or Indo-Arabic. It's of Indian origin but was brought to Europe by Arab mathematicians. Of particular, Muhammaed ibn-Musa al-Khawarizmi (from whose name we have derived the word algorithm).

The Hindu-Arabic number system was different from previous number systems in two ways:

- Virtually all early number systems have something that the Hindu-Arabic system does not have, and that's a unique symbol for the number ten. In our number system, there's no special symbol for them.

- On the other hand, virtually all of the early number systems are missing something that the Hindu-Arabic system has, which turn out to be much more important than a symbol for ten. And that's the Zero.

The zero is undoubtedly one of the most important inventions in the history of numbers and mathematics. It supports positional notation because it allows differentiation of 25 from 205 and 250. The zero also eases many mathematical operations that are awkward in nonpositional systems, particularly multiplication and division.

The whole structure of Hindu-Arabic numbers is revealed in how we pronounce them. Take 4825, for instance. We say "four thousand, eight hundred, twenty-five." That means 4000 + 800 + 20 + 5
or 4 x 1000 + 8 x 100 x 2 x 10 + 5 x 1 or using powers of 10.

## Number Bases

There is something special about the number ten; most civilizations have based their number systems around Ten (sometimes five).

From the very beginning, people have used their fingers to count. It's no coincidence that the word digit can refer to fingers or toes and numbers or that the words five and fist have similar roots.

![Human Hand][human_hand]

We endow numbers based on ten with almost magical significance and give them notable names. Ten years is a decade; ten decades is a century; a thousand million is a billion.

Ten is a significant number to us humans. Ten is the number of fingers and toes most of us have, and we certainly prefer to have all ten of each. Because our fingers are convenient for counting, we humans have adapted an entire number system that's based on the number 10.

Our number system works as follows; we have symbols for numbers from 0 to 9; when we reach our symbols limit, we reset the first digit to zero and increment (add one) the second, as follows: 0 1 2 3 4 5 6 7 8 9 (now we reset the digits and add a 1 to the left) 10 11 12 13 14 15 16 17 18 19 20 21 and so on.

We call this number system base-ten, or decimal because we have ten symbols. The only reason we adopted base ten is that we have ten fingers and ten toes. What if we're a cartoon character with four fingers on each hand? We would've used the base eight number system, similar to base ten, but we have only eight symbols from 0 till 7 (8 excluded because, in base ten, we don't have a unique symbol for 10).

![Cartoon Hand][cartoon_hand]

Base eight is similar to base ten, but we start resetting after the seven immediately, so counting in base eight is 0 1 2 3 4 5 6 7 (we reset here) 10 11 12 13 14 15 16 17 20 21

It isn't clear if we pronounce 10 in base eight as ten. Instead, we pronounce it as one-zero.

Other number bases work the same way; base four has 0 1 2 3 as symbols, base sixteen has 0 1 2 3 4 5 6 7 8 9 A B C D E F, we ran out of symbols from base ten, so we use alphabets; A is 10 in base ten, B is 11, C is 12, D is 13, E is 14, and F is 15.

## Base-two

The functionality of a modern computer at its core is to manipulate electricity, and in computers, either electricity is flowing or not, so the best number system we can use is base two (0 if no electricity is flowing and 1 otherwise)

In base two, we only have two digits, 0 and 1, and we follow the same rule in resetting the digits, so counting in base two is as follows: 0 1 10 11 100 101 110 111 1000 1001 1010 and so on, notice that when we use lower number bases, the length of presenting a number will be longer. The example we used to count the apples before the roman number system was introduced is a base one because we only have one symbol, a scratch /.

Here is number 11 in different bases:

- Base 1: ///////////
- Base 2 (binary): 1011
- Base 4: 23
- Base 8 (octal): 13
- Base 10 (decimal): 11
- Base 16 (hexa-decimal): B

[human_hand]: https://static.ghamza.dev/images/number-bases/human_hand.jpg
[cartoon_hand]: https://static.ghamza.dev/images/number-bases/cartoon_hand.png
