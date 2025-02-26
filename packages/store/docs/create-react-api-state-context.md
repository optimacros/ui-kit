# createMachineContext

A utility function for creating an optimacros-ui store with enhanced functionality, integrating ZagJS state machines with React context and Redux-like state management.

## Type Definition

```typescript
function createMachineContext<
    Machine extends Record<string, any>,
    Api extends Record<string, any> = Record<string, any>,
    Context extends Record<string, any> = Parameters<Machine['machine']>[0],
    State extends StateMachine.StateSchema = StateMachine.StateSchema,
    Connect extends (
        api: Api,
        {
            state,
            send,
        }: {
            state: StateMachine.State<Context, State>;
            send: StateMachine.Send;
        },
        machine: Record<string, any>,
    ) => any = any,
    ID extends string = string,
    Selectors extends Record<string, Selector<Api>> = NonNullable<unknown>,
>(config: {
    id: ID;
    machine: Machine;
    createConfig?: (initialState: Api) => {
        selectors?: Selectors;
    };
    connect?: Connect;
    GlobalContext?: {
        useProxySelector: any;
    };
})
```

## Type Parameters

### Machine
- Description: Type of the ZagJS-like state machine module
- Extends: `Record<string, any>`
- Usage: Defines the shape of the state machine module

### Api
- Description: Type of the machine's API
- Extends: `Record<string, any>`
- Default: `Record<string, any>`
- Usage: Defines the shape of the API object

### Context
- Description: Type of the machine's context
- Extends: `Record<string, any>`
- Default: `Parameters<Machine['machine']>[0]`
- Usage: Represents the context parameter of the machine

### State
- Description: Type of the machine's state schema
- Extends: `StateMachine.StateSchema`
- Usage: Defines the structure of the state

### Connect
- Description: Type of the connect function
- Parameters:
  - `api: Api`: Base machine API
  - `{ state, send }`: Machine state and send function
  - `machine`: Machine instance
- Default: `any`
- Usage: Function to connect machine API with state and send function

### ID
- Description: Type of the store identifier
- Extends: `string`
- Usage: Unique identifier for the store

### Selectors
- Description: Type of the selector functions
- Extends: `Record<string, Selector<Api>>`
- Default: `NonNullable<unknown>`
- Usage: Defines the shape of selector functions

## Configuration Parameters

### id
- Type: `ID`
- Required: Yes
- Description: Unique identifier for the store
- Example:
```typescript
id: 'menu-store'
```

### machine
- Type: `Machine`
- Required: Yes
- Description: ZagJS-like state machine module
- Example:
```typescript
import * as menu from '@zag-js/menu'
machine: menu
```

### createConfig
- Type: `(initialState: Api) => { selectors?: Selectors }`
- Required: No
- Description: Function to create custom selectors based on initial state
- Example:
```typescript
createConfig: (api) => ({
  selectors: {
    isOpen: (state) => state.isOpen,
    selectedItem: (state) => state.selectedItem
  }
})
```

### connect
- Type: `Connect`
- Required: No
- Description: Function to connect machine API with state and send function
- Example:
```typescript
connect: (api, { state, send }, machine) => ({
  ...api,
  customAction: () => send({ type: 'CUSTOM' })
})
```

### GlobalContext
- Type: `{ useProxySelector: any }`
- Required: No
- Description: UI Kit global context for feature flags
- Example:
```typescript
GlobalContext: UiKit
```

## Return Value

The function returns an object with the following properties:

### select
- Type: `slice.selectors`
- Description: Map of selector functions
- Usage:
```typescript
const { isOpen } = select.isOpen(state)
```

### slice
- Type: `Redux-like slice`
- Description: Redux-compatible state slice
- Usage: Used for Redux store integration

### useSelector
- Type: `Hook`
- Description: Hook to select API properties
- Usage:
```typescript
const isOpen = useSelector(state => state.isOpen)
```

### useProxySelector
- Type: `Hook`
- Description: Hook to select API properties using proxy
- Usage:
```typescript
const isOpen = useProxySelector(state => state.isOpen, deps)
```

### useFeatureFlags
- Type: `Hook`
- Description: Hook to access state feature flags
- Usage:
```typescript
const isSubmenuEnabled = useFeatureFlags('submenu')
```

### useApi
- Type: `Hook`
- Description: Hook to access API from connect function
- Usage:
```typescript
const api = useApi()
```

### Api
- Type: `Component`
- Description: HOC for providing API access
- Usage:
```typescript
<Menu.Api>
  {(api) => <span>{api.open ? 'open' : 'closed'}</span>}
</Menu.Api>
```

### RootProvider
- Type: `Component`
- Description: React Context provider for machine
- Usage:
```typescript
<Menu.RootProvider>
  <MenuComponent />
</Menu.RootProvider>
```

### RootActorProvider
- Type: `Component`
- Description: React Context provider for actor
- Usage:
```typescript
<Menu.RootActorProvider>
  <ToastComponent />
</Menu.RootActorProvider>
```

### splitProps
- Type: `Function`
- Description: Function to split context and other props
- Note: May not work with extended machines
- Usage:
```typescript
const [local, others] = splitProps(props)
```

## Usage Examples

### Basic Store Creation

```typescript
import * as menu from '@zag-js/menu'

const MenuStore = createMachineContext({
  id: 'menu',
  machine: menu,
  createConfig: (api) => ({
    selectors: {
      isOpen: (state) => state.isOpen,
      selectedItem: (state) => state.selectedItem
    }
  })
})
```

### Custom Connect Function

```typescript
const MenuStore = createMachineContext({
  id: 'menu',
  machine: menu,
  connect: (api, { state, send }, machine) => ({
    ...api,
    toggleWithDelay: () => {
      setTimeout(() => {
        send({ type: 'TOGGLE' })
      }, 500)
    }
  })
})
```

### Using Feature Flags

```typescript
const MenuStore = createMachineContext({
  id: 'menu',
  machine: menu,
  GlobalContext: {
    useProxySelector: (selector) => {
      const flags = useFlags()
      return selector(flags)
    }
  }
})

// Usage
function MenuComponent() {
  const isSubmenuEnabled = MenuStore.useFeatureFlags('submenu')
  return isSubmenuEnabled ? <Submenu /> : null
}
```

## Error Handling

```typescript
// Error handling in connect function
connect: (api, { state, send }, machine) => {
  try {
    return {
      ...api,
      safeAction: () => {
        try {
          send({ type: 'ACTION' })
        } catch (error) {
          console.error('Action failed:', error)
        }
      }
    }
  } catch (error) {
    console.error('Connect failed:', error)
    return api
  }
}
```

## See Also

- [ZagJS Documentation](https://zagjs.com)
- [React Context API](https://reactjs.org/docs/context.html)