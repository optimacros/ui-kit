# ui-kit

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
