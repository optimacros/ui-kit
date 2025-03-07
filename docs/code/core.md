### @optimacros-ui/kit package folder
### [example](./examples/core/README.md)

- ComponentName ( in PascalCase )
    - package.json
    - tsconfig.json
    - tsup.config.ts ( build config )
    - CHANGELOG.md
    - node_modules
    - **src**
        - **__ tests __** ( all tests for component )
            - **scenarios** ( test scenarios, 1 per file )
                - scenario-one.ts
                - scenario-two.ts
                - index.ts
            - description.md ( scenario description )
            - props.ts ( test props )
        - **state** ( everything about component state )
            - machine.ts ( createMachine / extendMachine method )
            - state.ts ( state creator )
            - connect.ts ( connect machine function )
            - index.ts
        - **parts** ( component parts, 1 per folder )
            - PartOne
                - index.tsx
                - styles.css
            - index.ts
        - **examples** ( component example, 1 per file )
            - ExampleOne.tsx
            - index.ts
        - **hooks** ( component specific hooks )
            - useHook.ts (example)
            - index.ts
        - **types** ( common types )
            - index.ts
        - **utils** ( all utility functions for package)
            - index.ts
        - stories.ts
        - exports.ts ( all package exports )
        - index.ts
