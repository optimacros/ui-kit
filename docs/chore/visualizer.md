### Visualizer (using utils as an example)
- Replace flag "metafile" in "tsup.config.ts" with "true"
- Run build: `npm run build:utils`
- Run visualizer: npx esbuild-visualizer --metadata packages/utils/dist/metafile-cjs.json --open
 