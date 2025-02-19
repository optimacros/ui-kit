# extendMachine Method

The `extendMachine` method is a utility function that allows you to extend and customize ZagJS state machines with additional configurations and options.

## Type Definition

```typescript
function extendMachine<
    Module,
    Service extends AnyMachine,
    Context extends Record<string, any>,
    State extends Record<string, any>,
    Event extends Record<string, any>,
    ConfigCreator extends AnyConfig | ((prev: Service) => AnyConfig) = AnyConfig,
    Config = ConfigCreator extends () => {} ? ReturnType<ConfigCreator> : ConfigCreator,
    Options = StateMachine.MachineOptions<Config['context'] & Context, State, Event>,
    OptionCreator extends Options | ((prev: Service) => Options) = Options | ((prev: Service) => Options),
    T extends { machine: (userContext) => Service } = {
        machine: (userContext) => Service;
    }
>(
    stateMachine: T,
    configCreator: ConfigCreator,
    optionCreator: OptionCreator
): T
```

## Type Parameters

### Module
- Description: The type of the ZagJS module being extended
- Constraints: None
- Usage: Typically inferred from the stateMachine parameter

### Service
- Description: The type of the state machine service
- Extends: `AnyMachine`
- Usage: Represents the machine's service type

### Context
- Description: The type of the machine's context
- Extends: `Record<string, any>`
- Usage: Defines the shape of the context object

### State
- Description: The type of the machine's state
- Extends: `Record<string, any>`
- Usage: Defines the shape of the state object

### Event
- Description: The type of events the machine can handle
- Extends: `Record<string, any>`
- Usage: Defines the shape of event objects

### ConfigCreator
- Description: Type of the configuration creator
- Extends: `AnyConfig | ((prev: Service) => AnyConfig)`
- Default: `AnyConfig`
- Usage: Can be either a config object or a function that takes the previous service and returns a config

### Config
- Description: Resolved configuration type
- Type: `ConfigCreator extends () => {} ? ReturnType<ConfigCreator> : ConfigCreator`
- Usage: Represents the actual configuration after resolution

### Options
- Description: Machine options type
- Type: `StateMachine.MachineOptions<Config['context'] & Context, State, Event>`
- Usage: Defines the type of machine options with combined context

### OptionCreator
- Description: Type of the options creator
- Extends: `Options | ((prev: Service) => Options)`
- Usage: Can be either an options object or a function that takes the previous service and returns options

### T
- Description: Type of the state machine module
- Extends: `{ machine: (userContext) => Service }`
- Default: `{ machine: (userContext) => Service }`
- Usage: Defines the shape of the state machine module

## Parameters

### stateMachine
- Type: `T`
- Required: Yes
- Description: The ZagJS module to extend
- Example:
```typescript
import * as menu from '@zag-js/menu'
const extendedMachine = extendMachine(menu, ...)
```

### configCreator
- Type: `ConfigCreator`
- Required: Yes
- Description: Configuration object or function that creates configuration
- Examples:

```typescript
// As an object
const configCreator: AnyConfig = {
  context: {
    customValue: 'default'
  },
  states: {
    customState: {
      on: {
        CUSTOM_EVENT: 'nextState'
      }
    }
  }
};

// As a function
const configCreator = (prev: Service): AnyConfig => ({
  ...prev.config,
  context: {
    ...prev.config.context,
    customValue: 'default'
  }
});
```

### optionCreator
- Type: `OptionCreator`
- Required: Yes
- Description: Options object or function that creates machine options
- Examples:

```typescript
// As an object
const optionCreator: Options = {
  guards: {
    isCustomCondition: (ctx) => Boolean(ctx.someValue)
  },
  actions: {
    onCustomAction: (ctx) => {
      console.log('Custom action', ctx);
    }
  }
};

// As a function
const optionCreator = (prev: Service): Options => ({
  ...prev.options,
  guards: {
    ...prev.options.guards,
    isCustomCondition: (ctx) => Boolean(ctx.someValue)
  }
});
```

## Usage Examples

### Basic Extension with Type Safety

```typescript
import {
    ConnectMachine,
    ExtendedMachine,
    extendMachine,
    MachineConfig,
    MachineOptions,
    UserContext,
    UserState,
} from '@optimacros-ui/store';
import { omit, Orientation } from '@optimacros-ui/utils';
import * as zagMenu from '@zag-js/menu';

const config = {
    context: {
        orientation: Orientation.Vertical,
        disabled: false,
        hoverable: false,
    } as {
        orientation?: string;
        disabled?: boolean;
        hoverable?: boolean;
    },
    on: {
        'ORIENTATION.SET': { actions: 'setOrientation' },
        'DISABLED.SET': { actions: 'setDisabled' },
        'SUBMENU.SET': { actions: 'setSubmenuVisible' },
    },
} satisfies MachineConfig<zagMenu.Service>;

const options = {
    actions: {
        setOrientation: (ctx, evt) => {
            ctx.orientation = evt.value;
        },
        setDisabled: (ctx, evt) => {
            ctx.disabled = evt.value;
        },
    },
} satisfies MachineOptions<zagMenu.Service, zagMenu.Context, typeof config>;

type State = UserState<typeof zagMenu>;
type Context = UserContext<zagMenu.Context, typeof config>;

export const machine = extendMachine(zagMenu, config, options) satisfies ExtendedMachine<
    typeof zagMenu,
    Context,
    State
>;
```

## See Also

- [ZagJS Documentation](https://zagjs.com)
- [XState Documentation](https://xstate.js.org)