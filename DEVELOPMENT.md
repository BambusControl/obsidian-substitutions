# Unicode Search: Development

These are my notes on the development of the plugin.

## Release: How To

1. From the `develop` branch, create a release branch `release/X.Y.Z`
2. Go to [package.json](./package.json) and overwrite `X.Y.Z` with new version throughout the whole project (double check if save data version needs to be updated)
3. Update the [package-lock](./package-lock.json) file: `npm install`
4. Export save data schema: `npm run export-schema`
5. Run tests: `npm run test`
6. Run build and test out the plugin in obsidian manually: `npm run build`
7. Commit as "Version `X.Y.Z`"
8. Push, and fix if build fails, otherwise merge to the `main` branch
9. Create a tag with the label `X.Y.Z`
10. GitHub Actions will create a [release](https://github.com/BambusControl/obsidian-unicode-search/releases)
11. Add release notes to the release
12. Fast-forward the `develop` branch

## Features to Add

- [ ] meta-groups for substitution records: `[groups]`
  - After using the plugin for a while, finding and managing substitution records becomes a problem.
  - I want to let the users group substitutions which will enable them to enable/disable entire groups at once.
  - My use case: when journaling I use different substitutions than when I'm writing research notes.
- [ ] regex support: `[regex]`
  - I want to let users use regex for more advanced patterns.
  - However, we need to circumvent the `length` of the cache because we will not know how many characters we need to match.
  - To keep both simple and regex matching, we will prioritize simple search and only then match regex patterns.
  - My use case: Automatic new line after full stop works, however, I want to use regex to trigger substitutions also on other punctuation marks such as "?" or "!".
- [ ] dynamic substituion group activation based on specific files, folders or tags: `[dynamic]`
- [ ] user re-ordering of saved substitution records: `[reorder]`

## Development Diary
