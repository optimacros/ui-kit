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

## 3.Infinite/min/max

- сбрасываю пропсы
- передаю пропсы `{ step: 20, speed: 200, min: 25, max: 75, infinite: true, value: 50 }`
- нажимаю `start-trigger`
- жду 700мс (3 тика)
- нажимаю `cancel-trigger`
- проверяю значение (`45`)

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

## 3.Infinite/min/max

- сбрасываю пропсы
- передаю пропсы `{ value: 90, step: 20, speed: 200, infinite: true, }`
- нажимаю `start-trigger`
- жду 300мс (1 тик)
- нажимаю `cancel-trigger`
- проверяю значение (`10`)