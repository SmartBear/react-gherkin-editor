# Contribute

## Requirements
- GitHub smartbear/react-gherkin-editor repository access
- NPM user account with SmartBear organization access

___
## Release a new version
To release a new version, you need to:
- Create it in package.json
- Build the release files (currently a `lib` folder that is generated)
- Release the new version on NPM and/or on GitHub.

**This section assumes, for the given commands, that you wish to create a version named 1.0.1**

### Create a new version
To create a new version of react-gherkin-editor for release:

- Run `yarn version` to create a new version, commit the change and create the tag on GitHub
  - You can also use `yarn version --major`, `yarn version --minor` or `yarn version --patch` to generate a new version for you
- Push your changes (a new commit should have been created)

If you want to create a new version manually instead:
- Edit package.json with the new version
- Commit the changes with message "v1.0.1"
- Create a git tag: `git tag -a v1.0.1 -m "v1.0.1"`
- Push you changes

### NPM release
- Build the release using `yarn build`
- Publish using `yarn publish`

You can cleanup the created files using `yarn clean`.

### GitHub release
- Update the release branch: `git checkout release` then `git merge master`
- Build the release using `yarn build`
- Commit the changes with the message "Release 1.0.1"
- From the react-gherkin-editor repository in GitHub, go to releases and click "Draft new release"
  - Tag: v1.0.1
  - Target branch: release
  - Release title: Release 1.0.1
  - Fill the release notes
- Click on "Publish release"

___
## Upgrade

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
