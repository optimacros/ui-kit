# ui-kit

## Installation
1. add to .npmrc
``` bash
@optimacros-ui:registry=https://fe-nexus.optimacros.com/repository/fe-npm
```
2. Turn VPN on
3. install any @optimacros-ui package
- [@optimacros-ui/kit ( core package with all components in one package )](./packages/core/README.md)
- @optimacros-ui/**component-name-dashcase** ( specific component package )
    - list of all components [here](./packages/core/src/components)
- [@optimacros-ui/kit-internal ( internal package )](./packages/internal/README.md)
- [@optimacros-ui/kit-store ( package with ui-kit provider )](./packages/core/src/store/README.md)
- [@optimacros-ui/store ( ui-kit store creator )](./packages/store/README.md)
- [@optimacros-ui/utils ( ui-kit utilities )](./packages/utils/README.md)
- [@optimacros-ui/themes ( ui-kit color-schemes )](./packages/themes/README.md)
- [@optimacros-ui/types ( ui-kit types )](./packages/types/README.md)

## Themes Integration
- [themes](./docs/installation/themes.md)
## Chore
- [Merge Request Guide](./docs/chore/merge-request.md)
- [NPM Guide](./docs/chore/npm.md)
- [Visualizer](./docs/chore/visualizer.md)

## Code
- [Core Documentation](./docs/code/core.md)
- [Internal Documentation](./docs/code/internal.md)

### Examples
The examples section is available under [docs/code/examples/](./docs/code/examples/)

### Old
Legacy documentation can be found under [docs/code/old/](./docs/code/old/)

## Styles
- [Figma Guidelines](./docs/styles/figma.md)
- [Variables & Conventions](./docs/styles/variables-conventions.md)

## Testing
- [Visual Testing Guide](./docs/testing/visual-testing.md)

## commit

- first `npm run rebase` to rebase to actual master branch
- then `npm run rebase:continue` to update lock files

## Q&A

Q: something is wrong  
A: do `node run reinstall`

Q: still not working  
A: do `ctrl+f5`

### Linters

#### VSCode

- install extensions: [biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)

#### WebStorm

- Copy the `.idea.example` folder inside the project and rename it to `.idea`, if this folder already exists, delete it.
- Install extension **[Biome](https://plugins.jetbrains.com/plugin/22761-biome)**: Linter and formatter plugin.

## TODO
biome config error React import
https://github.com/biomejs/biome/issues/5289