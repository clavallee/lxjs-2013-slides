![modularidade](static/images/modularidade.png)

![browserify](static/images/browserify.png)

browserify is a tool for smuggling node-style modularity into hostile browser
territory

![dragon](static/images/dragon.png)

![hacker wizard](static/images/hacker_wizard.png)

![browserify demo](static/images/terminal.png)

![free software](static/images/free_software.png)

![npm](static/images/npm.png)

![anarchy](static/images/anarchy.png)

![king isaacs](static/images/king_isaacs.png)

![whatever](static/images/whatever.png)

![king whatever](static/images/king_whatever.png)

![c](static/images/c.png)

C is excellent

* for writing fast things
* for writing memory-efficient things
* for writing operating systems
* for writing code that still works decades later

![unix](static/images/unix.png)

c was written FOR unix

![c sickle](static/images/c_sickle.png)

and yet...

C is terrible

* for writing complicated things
* for writing simple things

![2038](static/images/2038.png)

We're going to have to refactor everything ANYWAYS.

![include](static/images/include.png)

![require](static/images/require.png)

![export](static/images/export.png)

``` c
#export= foo
int foo(int n) {
    return n * 111;
}
```

![require as](static/images/require_as.png)

![sweet as](static/images/sweet_as.png)

``` c
#require "./foo.c" as flibble

int main (int argc, char **argv) {
    var n = flibble(atoi(argv[1]));
    printf("%d\n", n);
}
```

![dotc](static/images/dotc.png)

dotc is a c/c++ preprocessor
written in javascript!

```
$ dotc pre main.c

#include "stdio.h"
#include "stdlib.h"

namespace _7ce9a233 {

int foo (int n) {
    return n * 111;
}

};


int main(int argc, char **argv) {
    printf("%d\n", (_7ce9a233::foo)(atoi(argv[1])));
    return 0;
}
```

![whatever.c](static/images/whatever.c.png)

![dotc demo](static/images/terminal.png)

![npm](static/images/npm.png)

let's just put c code on npm

with a `.c` extension

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

![king whatever](static/images/king_whatever.png)

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
* glsl, embedded systems, arduino

# content-addressable data

let's use npm for now

but next...

content-addressable data

all libraries, code snippets, blog posts

can be hashed

![modularidade](static/images/modularidade.png)

