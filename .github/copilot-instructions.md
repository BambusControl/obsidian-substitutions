# Copilot coding instructions

This repository is an Obsidian plugin written in TypeScript.

## Project layout

- Source code: `src/`
- Build output: `dist/`
- Static schema: `resources/save-data-schema.json`

## Local development

- Install dependencies: `npm install`
- Run tests: `npm run test`
- Build plugin: `npm run build`
- Re-export save data schema (when save data types change): `npm run export-schema`

## Change guidelines

- Keep changes focused and minimal.
- Prefer updating existing code patterns over introducing new abstractions.
- Do not commit generated artifacts from local experiments.
- When changing save data types in `src/libraries/types/savedata`, also regenerate `resources/save-data-schema.json`.
