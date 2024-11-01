## Tailwind
#### Основная дока: https://tailwindcss.com/docs
#### Фичи v4: https://tailwindcss.com/blog/tailwindcss-v4-alpha
---
**Дополнительно:**
<details>
  <summary>
    Изменение стилей на основе дата атрибутов
  </summary>

**В этом примере 3 варианта кнопки и мы изменяем свойство bg в зависимости от [data-variant]**

``` tsx
 <button
            // кастомное значение
            data-variant={variant}
            className='data-[variant="primary"]:bg-primary data-[variant="secondary"]:bg-secondary data-[variant="custom"]:bg-black'
          >
            <Sprite name={icon} />
</button>
```

---

**Рассмотрим изменение дата атрибута [data-size]**

``` tsx
<button
            // кастомное значение
            data-size={size}
            className='data-[size="xl"]:size-xl data-[size="md"]:size-md'
          >
            <Sprite name={icon} />
</button>
```

**Также по документации tailwind мы можем менять эти свойства в зависимости от состояния**

https://tailwindcss.com/docs/hover-focus-and-other-states

``` tsx 
<button
            // кастомное значение
            data-size={size}
           // будет работать только при hover
            className='hover:data-[size="xl"]:size-xl'
          >
            <Sprite name={icon} />
</button>
```
</details>

<details>
  <summary>
    Использование переменных темы
  </summary>

**Вы можете использовать значение из root переменной**
```css
:root {
  --color-pink-rose: pink;
  --color-primary: var(--bg-pink-rose);
  --color-primary-hover: blue;

  --size-xl: 48rem;
}
```
```tsx
<button className="bg-pink-rose">text</button>

<button className="bg-primary hover:bg-primary-hover">text</button>

<button className="text-primary hover:text-primary-hover size-xl">text</button>

```


</details>


**Более подробные примеры использования -> './example'**