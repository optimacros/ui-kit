## Basic

- сбрасываю пропсы
- проверяю наличие основных элементов на странице
- проверяю значение (`ничего`)

### 1.Select

- кликаю `gradient`
- проверяю значение (`gradient`)
- кликаю `partialGradient`
- проверяю значение (`partialGradient`)

### 2.Select (controlled)

- сбрасываю пропсы
- передаю `{ value: null }`
- сбрасываю статистику `onValueChange`
- кликаю `gradient`
- проверяю значение (`ничего`)
- проверяю вызов `onValueChange`
- передаю `{ value: 'gradient' }`
- проверяю значение (`gradient`)
- кликаю `partialGradient`
- проверяю значение (`gradient`)
- проверяю вызов `onValueChange`
- передаю `{ value: 'partialGradient' }`
- проверяю значение (`partialGradient`)