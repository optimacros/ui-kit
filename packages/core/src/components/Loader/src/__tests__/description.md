# Linear

## Basic

- сбрасываю пропсы
- проверяю наличие элементов и значение

### 1.Controlled

- сбрасываю пропсы
- передаю пропсы `{ controllable: true, value: 66 }`
- проверяю значение

### 2.Start/stop

- сбрасываю пропсы
- передаю пропсы `{ step: 3, speed: 77 }`
- нажимаю `start-trigger`
- жду 1000мс
- нажимаю `cancel-trigger`
- проверяю значение (`89`)

### 3.Infinite/min/max (не работает)

- сбрасываю пропсы
- передаю пропсы `{ step: 15, speed: 100, min: 30, max: 70, infinite: true, value: 50, controllable: true }`
- передаю пропсы `{ controllable: false }`
- нажимаю `start-trigger`
- жду 200мс
- нажимаю `cancel-trigger`
- проверяю значение (`40`)

# Circular

## Basic

- сбрасываю пропсы
- проверяю наличие элементов и значение

### 1.Controlled

- сбрасываю пропсы
- передаю пропсы `{ controllable: true, value: 66 }`
- проверяю значение

### 2.Start/stop

- сбрасываю пропсы
- передаю пропсы `{ step: 3, speed: 77 }`
- нажимаю `start-trigger`
- жду 1000мс
- нажимаю `cancel-trigger`
- проверяю значение (`89`)