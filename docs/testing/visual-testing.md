## Visual testing

Какая логика реализована:
- по команде `test-storybook` для всех сторей запускается test-runner, который делает скрин отрендерившейся стори
- если в сторе есть `play` функция, то не делает, т.к. по стандартной логике сначала выполняется `play`, потом скриншот. соответственно, состояние `просто элемент` нам не получить
- как мы решаем эту проблему: при добавлении `play`, в начале функции вызываем `await window.takeScreenshot?.()` без аргумента. сгенерируется скриншот с именем, как если бы у нас не было `play` (вероятно, случится сравнение с существующим скриншотом)
- для проверки нужных состояний, в соответствующих местах `play` вызываем `await window.takeScreenshot?.(id)` с каким-то уникальным ид
- если сторя содержит что-то динамическое (скрины не совпадают), то можно этот элемент вырезать (в `play`) и сделать сксрин оставшегося, или добавить `tags: ['skip-test-runner']`

Чтобы `play` запускалась, только когда нужно тестировать, мы в начале каждой функции добавляем провер очку

    play: async ({ globals, canvasElement }) => {
        if (!globals.test) {
            return;
        }

        ...
    }

Сверху в интерфейса сторибука есть есть переключатель `play/ne play`