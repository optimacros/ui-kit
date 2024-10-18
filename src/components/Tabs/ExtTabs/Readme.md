# Ext Tabs

### Структура
Данный виджет состоит из трех компонентов:

- Tabs Container
- Tab Header
- Tab Content

```jade
.TabsContainer
    .TabHeaderContainer
        .TabHeaderButton
            .TabHeaderButton_Inner
                .TabHeaderButton_Content

        .TabHeaderButton.TabHeaderButton__active
            .TabHeaderButton_Inner
                .TabHeaderButton_Content

        .TabHeaderButton.TabHeaderButton__disabled
            .TabHeaderButton_Inner
                .TabHeaderButton_Content

        .TabHeaderButton.TabHeaderButton__draggable
            .TabHeaderButton_Inner
                .TabHeaderButton_Content

    .TabContent
        .TabContent_Inner
```
