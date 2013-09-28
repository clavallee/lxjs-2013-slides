# modularity smuggler

browserify is a tool for smuggling node-style modularity into hostile browser
territory

what are some other places that matter where we are confronted with 

# one thing well

the unix philosophy!

# c

c was written FOR unix

and yet...

C is terrible

* for writing complicated things
* for writing simple things

C is excellent

* for writing fast things
* for writing memory-efficient things
* for writing operating systems
* for writing code that still works decades later

# modularity survival kit

fallout shelter

where else do we find hostility?

if you could take one thing with you to the programming fallout shelter

if you have one wish
you should wish for more wishes...

# 2038

oh fuck...

we're going to have to refactor everything

soon

we'll need an injection of modularity...

# dotc!

dotc is a c/c++ preprocessor

written in javascript!

## doing one thing well

``` c
#export= foo
int foo(int n) {
    return n * 111;
}
```

## let the consumer decide what to call the import

``` c
#require "./foo.c" as flibble

int main (int argc, char **argv) {
    var n = flibble(atoi(argv[1]));
    printf("%d\n", n);
}
```

# the magic

```
gcc -no-integrated-cpp -B $MAGIC_BINDIR $@
```

MAGIC_BINDIR has 2 programs: cc1 and cc1plus

there is one stackoverflow post and one or two postings on mailing lists

# let's just put c code on npm

why not?

# how to publish

Just put a `.c` at the end of your package name!

[publishing a package demo]

# search packages

```
dotc search color
```

is the same as

```
npm -s search '/\.(c|cc|h|cxx|cpp)\b/' color | grep -E '^\S+\.(c|Cc|h|cxx|cpp)\s'
```

which finds:

```
colors.cc  colors for C++  =divanvisagie  2013-09-19 18:18  0.0.0
```

# rationalizing putting c modules on npm

* npm already exists
* if they are on npm then somebody will build a nice pipline for loading them
with require() from javascript or something
* embedded systems I guess? arduino or whatever
* v8 is written in c++
* node v8 bindings are written in c++

# widening the modularity tent

* node, browsers, and now c!
* we need to amateurize computer programming
* make it easier to consume, easier to share

# content-addressable data

let's use npm for now

but next...

content-addressable data

all libraries, code snippets, blog posts

can be hashed


