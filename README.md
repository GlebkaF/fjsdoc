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
- [ ] Построить АСТ через бабилон
- [ ] Отобразить название класса
- [ ] Отобразить список всех методов класса, у которых есть многострочный комментарий 
- [ ] Для конструктора и всех методов показать типы flow
- [ ] Распарсить описания из jsdoc
- [ ] Распарсить @param из jsdoc