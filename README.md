# 🚧 Under development, 1.0 will be released someday
# flowdoc
Build JS documentation leveraging JSDoc and Flow.
## Roadmap
Full support is:
- parse name
- parse jsdoc description
- parse jsdoc @param and @return(s)
- parse flow types
- reconcile flow and JSdoc types

### v0.0.1
MVP that shows how we can use jsdoc and flow types together when generating docs.

- [x] get AST via babylon
- [x] get class names from named and default export declarations
- [x] get raw JSdoc of a class (i.e. linked to a class comment block)
- [x] get a list of a class methods
- [ ] get flow types of a class methods
- [ ] parse JSDoc for each class method
- [ ] reconcile flow and JSdoc types for class methods
- [ ] arrange repo with lerna and yarn workspaces
- [ ] create simple react(?) app which represents output of fjs core function

### v0.0.2
Full support of the class properties and methods.

- [ ] get a list of class properties
- [ ] get flow types for class properties
- [ ] get all available class names within a file:  
  - [ ] get names from variable declarations.
  - [ ] get names from unassigned class expressions.
  - [ ] get names for any other class declarations.

### v1.0.0
- [ ] cli
- [ ] docs for classes, functions and variables
- [ ] docs for flow types and interfaces
- [ ] *.js -> html docs
- [ ] ???

Supported jsdoc tags:
- @param
- @return(s)
- @see
- @example
- @throw(s)
