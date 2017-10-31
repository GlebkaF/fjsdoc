# fjsdoc
Строит хорошую, годную документацию используя jsdoc и flow аннотации

#### Macro TODO
Для входного js файла, с одним классом, построить html страничку, содержащую
- [ ] Название класса
    * Описание из JSdoc
    * Список параметров конструктора с описаниями и типами из JSdoc. Eсли параметры конструктора типизированы Flow, то вместо типов JSdoc подставить типы flow.
- [ ] Методы класса
    * Описание из JSdoc
    * Список параметров конструктора с описаниями и типами из JSdoc. Eсли параметры конструктора типизированы Flow, то вместо типов JSdoc подставить типы flow.

#### Micro TODO
- [x] Get AST via babylon
- [ ] Get class names within a file:
  - [x] Get names from named and default export declarations
  - [ ] Get names from variable declarations
  - [ ] Get names from unassigned class expressions
  - [ ] Get names for any other class declarations
- [ ] Get a list of class properties
- [ ] Get a list of class methods
- [ ] Get flow types for class properties and methods
- [ ] Parse jsdoc descriptions
- [ ] Parse jsodc @param