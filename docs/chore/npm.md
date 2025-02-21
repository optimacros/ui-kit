# NPM Commands Documentation

## Development Commands

### Starting Development Environment

- `npm run start`: Launches the Storybook development environment on port 6006 without automatically opening the browser.
- `npm run start:figma`: Starts the Figma plugin development environment using Lerna, specifically for the @optimacros-ui/figma package.

### Build Commands

#### Main Build Commands
- `npm run build`: Executes build for all packages under @optimacros-ui/* scope.
- `npm run build:ui`: Builds all UI packages in parallel using Lerna.
- `npm run build:core`: Builds component packages first, then builds kit and kit-store packages.

#### Component-Specific Builds
- `npm run build:components`: Builds all component packages, excluding utility packages (kit, store, utils, figma, etc.).
- `npm run build:legacy`: Builds the legacy kit package (@optimacros-ui/kit-legacy).
- `npm run build:internal`: Builds the internal kit package (@optimacros-ui/kit-internal).
- `npm run build:example`: Builds the example package.

#### Utility Package Builds
- `npm run build:themes`: Builds the themes package.
- `npm run build:store`: Builds the store package.
- `npm run build:utils`: Builds the utilities package.
- `npm run build:figma`: Builds the Figma plugin package.
- `npm run build:types`: Builds the types package.

### Testing and Quality Assurance

#### Linting
- `npm run lint`: Checks packages using Biome with error-level logging.
- `npm run lint:fix`: Fixes linting issues using Biome with custom commit configuration.

#### Storybook Testing
- `npm run test-storybook`: Runs Storybook tests.
- `npm run test-storybook:update`: Updates Storybook test snapshots.
- `npm run build:storybook`: Builds Storybook for production.

#### Type Checking
- `npm run type:check`: Runs TypeScript type checking without emitting files.
- `npm run type:coverage`: Generates TypeScript coverage report in .coverage/ts directory.

#### Coverage
- `npm run test:coverage`: Generates Storybook test coverage in .coverage/storybook directory.
- `npm run coverage`: Runs both type and test coverage reports after cleaning the .coverage directory.

### Project Management

#### Package Management
- `npm run bootstrap`: Cleans and bootstraps packages using Lerna.
- `npm run clean`: Removes all node_modules directories from packages.
- `npm run reinstall`: Executes the reinstall script.
- `npm postinstall`: Runs post-installation script.

#### Publishing
- `npm run publish`: Builds all UI packages and publishes them using Lerna.
- `npm run unpublish`: Unpublishes the @optimacros-ui/kit package.

#### Git Operations
- `npm run create:mr`: Runs type checking and creates a merge request.
- `npm run rebase`: Executes rebase script with main branch.
- `npm run rebase:continue`: Continues the rebase operation.
- `npm run rebase:create-mr`: Continues rebase and creates a merge request.

### Husky
- `npm run prepare`: Sets up Husky git hooks.

## Script Locations

Various custom scripts are located in the ./scripts directory:
- postinstall.js
- create-mr.js
- rebase.js
- reinstall.js

## Dependencies

This project uses several key tools:
- Lerna for monorepo management
- Storybook for component development and testing
- Biome for code quality
- TypeScript for type checking
- Husky for git hooks

## Notes

- All packages are scoped under @optimacros-ui/*
- The project uses a monorepo structure managed by Lerna
- Coverage reports are stored in the .coverage directory
- Custom configurations exist for Biome (biome-commit.json)