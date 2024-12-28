# Counter

<!-- example -->
```typescript jsx 
import { Counter } from 'ui-kit-core/components/Counter';

interface NavigationLinkProps {
    children: React.JSX.Element | null;
    route: Record<string, any>;
    className: string;
}

const NavigationLink = (props: NavigationLinkProps): React.JSX.Element => {
    const { route, className, children } = props

    return (
        <a href={route.href} className={className} >
            {children}
        </a>
    )
}

const TestComponent = () => (
    <div style={{ background: 'black', display: 'inline-block' }} >
        <Counter value={12} className="CustomCounter" /> 
        <Counter value={12} maxValue={10} /> 
        <Counter value={12} navigationComponent={NavigationLink} route={{ href: 'https://google.com' }} />
    </div>
);
```

## Import
```jsx
import { Counter } from 'ui-kit-core';
// or
import { Counter } from 'ui-kit-core/components/Counter';
```

## Properties

| Name                  | Type     | Default | Description                                                                                                       |
|:----------------------|:---------|:--------|:------------------------------------------------------------------------------------------------------------------|
| `className`           | `String` | `''`    | Set a class to style the Counter.                                                                                 |
| `value`               | `Number` | -       | Count to show.                                                                                                    |
| `maxValue`            | `Number` | -       | Max count to show.                                                                                                |
| `route`               | `Object` | -       | Object contains custom properties for the `navigationComponent`. Passed as a `prop` to the `navigationComponent`. |
| `navigationComponent` | `Node`   | -       | Navigation component, displayed only if there is a `route` prop exists.                                           |
