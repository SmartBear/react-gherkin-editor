# How to Contribute

## Requirements
- GitHub smartbear/react-gherkin-editor repository access
- NPM user account with SmartBear organization access

## Release a new version
- Run `yarn publish`
- Enter the new version when asked
- Enter your NPM account password when asked
- Push the generated commits using `git push --tags` then `git push`

**Note:** you can skip entering the new version by using `yarn publish --major`, `yarn publish --minor` or `yarn publish --patch`. This will generate a new version based on the current version.

**Information:** 2 new commits are created in the release process:
- The first (created by the `release:build` and `release:commit` scripts) updates the release files (the `lib` folder)
- The second (created by `yarn publish`) updates the version in `package.json` and adds a Git tag matching that version

### GitHub release
After executing the `yarn publish` command, you need to make a GitHub release.
For instance with version `1.0.1`:
- From the react-gherkin-editor repository in GitHub, go to releases and click "Draft new release"
  - Tag: v1.0.1
  - Target branch: master
  - Release title: Release 1.0.1
  - Fill the release notes
- Click on "Publish release"

## Upgrade from another package

### Using the NPM release
You can upgrade like any other package. For instance using yarn: `yarn upgrade @smartbear/react-gherkin-editor --latest`

### Using the GitHub release
You can upgrade react-gherkin-editor from GitHub in two different ways:
- [Using the release tag](https://github.com/SmartBear/react-gherkin-editor/tree/release#install-from-a-release-tag)
- From the Github repository:
  - Go to the wanted release in react-gherkin-editor Github repository
  - Download the source code and copy the downloaded file
  - Go to vendor folder of your project and paste the copied file
  - Run `yarn add file:[path to vendor file]`

**Keep in mind this version contains the full content of the project, including sources and development files.**

If you want the actual package, you need to pack it:
- Extract the source code you downloaded (or go to your current react-gherkin-editor folder if you want the latest version)
- Run `yarn` to install dependencies
- Run `yarn build` to build the release files
- Run `yarn pack` to create a package file at the root of your folder
- Replace the source code file by the package file as the file you will use with `yarn add file:[path to package file]`
