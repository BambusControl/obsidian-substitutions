# Unicode Search: Development

These are my notes on the development of the plugin.

## Release: How To

1. From the `develop` branch, create a release branch `release/X.Y.Z`
2. Go to [package.json](./package.json) and overwrite `X.Y.Z-NEXT` with new version throughout the whole project (double check if save data version needs to be updated)
3. Update the [package-lock](./package-lock.json) file: `npm install`
4. Export save data schema: `npm run export-schema`
5. Run tests: `npm run test`
6. Run build and test out the app: `npm run build`
7. Commit as "Version `X.Y.Z`"
8. Push, and fix if build fails, otherwise merge to the `main` branch
9. Create a tag with the label `X.Y.Z`
10. GitHub Actions will create a [release](https://github.com/BambusControl/obsidian-unicode-search/releases)
11. Add release notes to the release
12. Fast-forward the `develop` branch
13. Go to [package.json](./package.json) and overwrite `X.Y.Z` with _next_ version `X.Y.Z-NEXT` throughout the whole project
14. Update the [package-lock](./package-lock.json) file: `npm install`
15. Commit as "Set version as `X.Y.Z-NEXT`" to the `develop` branch

## Development Diary
