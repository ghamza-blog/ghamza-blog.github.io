---
title: "Implement Stack with Rust and TDD"
date: 2022-04-18T22:28:02+03:00
draft: true
description: "Implement stacks in rust following test driven development"
---

## Test Driven Development

Test Driven Development is a way of programming where we write our test with the acceptance criteria, then we implement accordingly, trying to make these tests work.

## Stacks

Stacks are known as LIFO (last in first out), it's similar to stacking dishes, in which we can only add new dishes at the top of the previous ones, and we can remove dishes only from the top of the stack.

## Implementation

### Writing the Tests

We'll start by creating a new project by running

```bash
cargo new --lib rusty-stack
```

If you navigate to `src/lib.rs`, you'll find this code

```rust
#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        let result = 2 + 2;
        assert_eq!(result, 4);
    }
}

```

The `#[cfg(test)]` tells the compiler that its a test configuration, so it will only be compiled when we run `cargo test`, however if we compile for debug or release it will be ignored.

The `#[test]` indicated that it's a test case.

Now we're going to remove this same test case and write our own test.

The first thing we want to test is the creation of the stack, so lets add that.

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_is_created_empty() {
        let list = RustyStack::new();

        assert_eq!(list.count(), 0);
        assert_eq!(list.peek(), None);
    }
}
```

Here we defined our first acceptance criteria, when creating a new stack we want to have 0 elements in it, and the item at the top of the stack is `None`

The `None` here is alternative to `null` in other languages, in safe rust there is no nulls, instead there is an `Optional` in which the element may be a `None` or some value `Some(value)`.

Going back to the stack, now a stack can push new elements and pop elements at the top. Let us create test cases for that and call the `todo!()` macro.

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_is_created_empty() {
        let stack = RustyStack::new();

        assert_eq!(stack.count(), 0);
        assert_eq!(stack.peek(), None);
    }

    #[test]
    fn it_is_pushed_to_the_top() {
        todo!();
    }

    #[test]
    fn it_can_pop_off() {
        todo!();
    }
}
```

Now we're wrote our tests, let try running them and watch them fail.

```bash
cargo test
```

For the next step we're going to try and making the test success one after the other.

### Implementing the Stack

#### new, count, and peek

Let us start defining how our data structure will look like.

- Some picture here -

We want to have the head and the count of the stack in our stack memory, and we want to allocate the element in the heap memory.

If we want to allocate resources in the heap in rust we should use a smart pointer, we're going to use the `Box` and let us define our data structure in code.

```rust
pub struct RustyStack {
    head: Elem,
    count: u32,
}

type Elem = Option<Box<Node>>;

struct Node {
    elem: i32,
    next: Elem,
}
```

For the sake of simplicity we will make the stack on accepts `i32`, but we're going to get back to it and make it generic.

Now let's create a constructor for our stack. In rust `new` is not a keyword, instead it's a convention for a static function that will return an instance.

```rust
impl RustyStack {
    fn new() -> Self {
        Self {
            head: None,
            count: 0,
        }
    }
}
```

So now we should not have an error with this line of code

```rust
let stack = RustyStack::new();
```

and now lets add a method for the stack, methods should have `self` as their first argument, `self` comes in 3 forms; me, myself, and I in English, while in rust `self`, `&self`, `&mut self`.

- `self` will pass a copy of our stack
- `&self` will pass an immutable reference of our stack (readonly permission)
- `&mut self` will pass a mutable reference of our stack (write permission)

We're going to add the `count()` method. We don't have to use the `self` or `&mut self`, as there is no need to pass a copy and we're not modifing the instance, we're just returning the count.

```rust
impl RustyStack {
    fn new() -> Self {
        Self {
            head: None,
            count: 0,
        }
    }

    fn count(self) -> u32 {
        self.count
    }
}
```

now all is left is to implement the peek before running our first test!

The peek only peeks on the top of the stack and returns what's there, so there could be an element or it could be empty. So we're going to return an `Optional`

```rust
// below count(self)
pub fn peek(&self) -> Option<&i32> {
    self.head.as_ref().map(|node| &node.elem)
}
```

Again we're just reading so we picked `&self`, and we're returning an optional of `&i32` because we want an immutable reference of the element, peek's value should not be modified.

And now we can finally run

```bash
cargo test
```

or

```bash
cargo test --package rusty-stack --lib -- tests::it_is_created_empty --exact --nocapture
```

so only the `it_is_created_empty` runs and we can see it ran successfully.

#### push and pop

Now let us write the tests for the push and pop then jump back into the implementation.

For the push test, we want to create a new stack, push an element, and check the count and peek at that element.
And for the pop test, we also want to create a new stack, push an element, and then pop it, check if the count is zero and the head is `None` and finally check if the popped element is the same as the one we pushed.

```rust
#[cfg(test)]
mod tests {
    use super::RustyStack;

    #[test]
    fn it_is_created_empty() {
        let stack = RustyStack::new();

        assert_eq!(stack.count(), 0);
        assert_eq!(stack.peek(), None);
    }

    #[test]
    fn it_is_pushed_to_the_top() {
        let mut stack = RustyStack::new();

        stack.push(7);
        assert_eq!(stack.count(), 1);
        assert_eq!(stack.peek(), Some(&7));
    }

    #[test]
    fn it_can_pop_off() {
        let mut stack = RustyStack::new();

        stack.push(7);
        let popped_element = stack.pop();
        assert_eq!(stack.count(), 0);
        assert_eq!(stack.peek(), None);
        assert_eq!(popped_element, Some(7));
    }
}
```

For the push, we first want to create a new element with the passed data and increment the counter. Now since we're going to modify the stack we need a mutable reference so we're gonna use `&mut self`

```rust
pub fn push(&mut self, elem: i32) {
    let new_node = Box::new(Node {
        elem,
        next: self.head.take(),
    });
    self.head = Some(new_node);
    self.count += 1;
}
```

Let's walk through this block line by line.
First we have the `Box::new`, which will allocate rescource in the heap, this resource is our defined `Node` type. We used a shorthand for `elem`, when the passed variable name is similar to the struct member we can use this shorthand. And finally, the next is `self.head.take()`, `take()` is a method for the `Optional`, which will take the value from `head`, return it, and put `None` instead.

Now `head` contains `None`, so we're going to pass him the newly created node, but as a `Some` since it's of type `Optional` and increment the counter by 1.

Let us go over it one more time with illustartions.

-- Some image here --

Now let us run the test and check if it will pass.

```bash
cargo test --package rusty-stack --lib -- tests::it_is_pushed_to_the_top --exact --nocapture
```

Everythings works well for the push.

Now to the pop!

The pop should remove the element at the top of the stack and return it and decremnt the counter, if there is nothing we return `None` and do nothing with the counter.

```rust
pub fn pop(&mut self) -> Option<i32> {
    self.head.take().map(|node| {
        self.head = node.next;
        self.count -= 1;
        node.elem
    })
}
```

We talked before about the `take()` method, it will replace whatever is in the head with `None` and return it, and now we're gonna chain it with the `map()` funtion, which returns `None` if the returned value from `take()` is `None`, else if it contains `Some(value)` it passes it to a function and we can do whatever we want with it. In this case we assigned the `head` to the next element in our stack, decremented the counter, and returned back the popped element.

-- Some image here --

Now we can run all of our tests using

```bash
cargo test
```
