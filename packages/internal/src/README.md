### Чтобы вопользоваться библиотекой
`npm i @optimacros-ui/kit-internal`

### Импорт компонента
import { Calendar } from '@optimacros-ui/kit-internal'

### Импорт темизации
```tsx
const styles = Promise.all([
    import('../../../packages/themes/src/default/tokens.css?raw'),
    import('../../../packages/themes/src/default/component-tokens.css?raw'),
]);


function App = () => {
            const [style, setStyle] = useState(null);

            useEffect(() => {
                styles.then(([root, theme]) => {
                    setStyle({ root: root.default, theme: theme.default });
                });
            }, []);

            return style ? (
                <UiKit.Provider
                    initialState={{
                        iconsSrc,
                        // raw css
                        styles: style,
                    }}
                >
                    <AppWrapper />
                </UiKit.Provider>
            ) : (
                <Story />
            );
        }


```