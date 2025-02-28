## Basic

- передаю пропсы `{ controllable: true}`
- сбрасываю пропсы
- проверяю наличие элементов на странице
- проверяю выбранный элемент (item1)
- делаю скриншот (`default`)

### 1.Select (click)

- кликаю на элемент (item2)
- проверяю выбранный элемент (item2)
- проверяю вызов `onValueChange`

### 2.Select (keyboard)
(не работает. я нажимаю `ArrorRight` 1 раз, но `onClick` срабатывает 2 раза - на item2 и потом на item3 и мы оказываемися на item1)

- сбрасываю фокус
- нажимаю `ArrorRight` 2 раза (сейчас нажимаю 1 раз)
- проверяю выбранный элемент (item1)
- проверяю вызов `onValueChange`

### 3.Select (controlled)

- передаю пропсы `{ controllable: true, value: item3 }`
- проверяю выбранный элемент (item3)
- проверяю вызов `onValueChange`
