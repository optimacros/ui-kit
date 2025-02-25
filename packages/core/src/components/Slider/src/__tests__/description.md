## Basic

- сбрасываю пропсы
- проверяю наличие (отсутствие) элементов на странице
- проверяю длину `range` и значение `output` (33)
- делаю скриншот (`default`)

### 1.Value change (drag)

- перетягиваю `thumb` на `43%` ширины `track`
- проверяю длину `range`, значение `output`, скрытый инпут, проп `value` (43)
- проверяю вызовы `onValueChange` и `onValueChangeEnd`
- перетягиваю `thumb` на `50px` за левый край экрана
- проверяю длину `range`, значение `output`, скрытый инпут, проп `value` (min)
- проверяю вызовы `onValueChange` и `onValueChangeEnd`

### 2.Value change (click)

- сбрасываю пропсы
- сбрасываю статистику `onValueChange` и `onValueChangeEnd`
- кликаю на 60% ширины `track`
- проверяю длину `range`, значение `output`, скрытый инпут, проп `value` (60)
- проверяю вызовы `onValueChange` и `onValueChangeEnd`

### 3.Value change (keyboard)

- сбрасываю пропсы
- сбрасываю статистику `onValueChange` и `onValueChangeEnd`
- фокусируюсь на `thumb`
- делаю скриншот `focused`
- нажимаю `arrowLeft` 3 раза
- проверяю длину `range`, значение `output`, скрытый инпут, проп `value` (30)
- проверяю вызовы `onValueChange` и `onValueChangeEnd`
- нажимаю `arrowRight` 80 раз
- проверяю длину `range`, значение `output`, скрытый инпут, проп `value` (max)
- проверяю вызовы `onValueChange` и `onValueChangeEnd`

### 4.Value change (prop)

- сбрасываю пропсы
- проверяю длину `range`, значение `output`, скрытый инпут (33)
- передаю проп `{ value: [ 77 ] }`
- проверяю длину `range`, значение `output`, скрытый инпут (77)

## MinStepBetweenThumbs

- сбрасываю пропсы
- передаю пропсы `{ value: [4, 6], step: 0.2, min: 2, max: 10, minStepsBetweenThumbs: 1 }`
- проверяю наличие (отсутствие) элементов на странице
- проверяю положение `thumb`, значение `output`, скрытые инпуты (4, 6)
- делаю скриншот (`default`)
- фокусируюсь табом на левом `thumb`
- жму `ArrowRight` 4 раза
- проверяю положение `thumb`, значение `output`, скрытые инпуты (4.8, 6)
- проверяю вызовы `onValueChange` и `onValueChangeEnd`
- фокусируюсь табом на правом `thumb`
- жму `ArrowLeft` 3 раза
- проверяю положение `thumb`, значение `output`, скрытые инпуты (4.8, 5.8)
- проверяю вызовы `onValueChange` и `onValueChangeEnd`
