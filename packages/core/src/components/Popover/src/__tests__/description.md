## Basic

- сбрасываю пропсы
- проверяю наличие элементов на странице и атрибуты

### 1.Open/close (trigger click)

- кликаю `open-trigger`
- проверяю состояние (открыто)
- делаю скриншот (`open`)
- кликаю `close-trigger`
- проверяю состояние (закрыто)

### 2.Open/close (keyboard)

- сбрасываю фокус с активного элемента
- нажимаю `tab` (для фокусировки на `open-trigger`) и `enter`
- проверяю состояние (открыто)
- нажимаю `escape`
- проверяю состояние (закрыто)
- передаю пропсы (`{ closeOnEscape: false }`)
- нажимаю `space`
- проверяю состояние (открыто)
- нажимаю `escape`
- проверяю состояние (открыто)
- кликаю на `close-trigger`
- проверяю состояние (закрыто)

### 3.Open/close (outside click)

- сбрасываю пропсы
- кликаю `open-trigger`
- проверяю состояние (открыто)
- кликаю `canvasElement`
- проверяю состояние (закрыто)
- передаю пропсы (`{ closeOnInteractOutside: false }`)
- кликаю `open-trigger`
- проверяю состояние (открыто)
- кликаю `canvasElement`
- проверяю состояние (открыто)
- кликаю на `close-trigger`
- проверяю состояние (закрыто)

### 4.Open/close (controlled)

- сбрасываю пропсы
- передаю пропсы (`{ 'open.controlled': true }`)
- кликаю `open-trigger`
- проверяю состояние (закрыто)
- проверяю вызов `onOpenChange`
- передаю пропсы (`{ open: true }`)
- проверяю состояние (открыто)
- кликаю `close-trigger`
- проверяю состояние (открыто)
- проверяю вызов `onOpenChange`
- передаю пропсы (`{ open: false }`)
- проверяю состояние (закрыто)