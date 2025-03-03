## Basic

- сбрасываю пропсы
- проверяю наличие элементов на странице
- проверяю статус 

### 1.select/expand (click)

- кликаю на `control` в branch-1
- проверяю состояние (branch-1 выбран и открыт, остальные закрыты)
- проверяю вызов `onExpandedChange` и `onSelectionChange`
- кликаю на `control` в branch-2
- проверяю состояние (branch-1 открыт, branch-2 выбран и открыт, остальные закрыты)
- проверяю вызов `onExpandedChange` и `onSelectionChange`
- кликаю на `control` в branch-3
- проверяю состояние (branch-1 открыт, branch-2 открыт, branch-3 выбран и открыт)
- делаю скриншот (`branch-selected-and-expanded`)

### 2.keyboard navigation

- сбрасываю пропсы
- проверяю состояние (все закрыто, ничего не выбрано)
- нажимаю `Tab`
- проверяю фокус на `control` в branch-1
- нажимаю `Space`
- проверяю состояние (branch-1 выбран и открыт, branch-2 закрыт, branch-3 закрыт)
- нажимаю `ArrowDown` 2 раза
- проверяю фокус на item
- нажимаю `Space`
- проверяю состояние (branch-1 открыт, item выбран, branch-2 закрыт, branch-3 закрыт)
- делаю скриншот (`item-selected`)

## Multiple

- сбрасываю пропсы
- передаю `{ selectionMode:'multiple' }
- проверяю наличие элементов на странице
- проверяю статус 

### 1.select/deselect (click)

- кликаю c зажатым `Control` на `control` в branch-1
- проверяю состояние (branch-1 выбран, все закрыты)
- проверяю вызов `onExpandedChange` и `onSelectionChange`
- кликаю c зажатым `Control` на `control` в branch-2
- проверяю состояние (branch-1 выбран, branch-2 выбран, все закрыты)
- проверяю вызов `onExpandedChange` и `onSelectionChange`
- кликаю c зажатым `Control` на `control` в branch-1
- проверяю состояние (branch-2 выбран, все закрыты)
- проверяю вызов `onExpandedChange` и `onSelectionChange`


## SelectedValue

- сбрасываю пропсы
- передаю `{ selectedValue: ['1/1', '2', '3/1/1'], expandedValue: ['1', '3', '3/1'] }`
(выбраны все конечные ноды, открыты все ноды с потомками)
- проверяю наличие элементов на странице
- проверяю статус 