# Contribute

## Requirements
- GitHub smartbear/react-gherkin-editor repo access
- NPM user account with Smartbear organization access

___
## Release a new version
To release a new version of react-gherkin-editor, you need to:
- Run `git checkout release` then `git merge master`
- Update the version in package.json file (example: 1.0.1)
- Run `yarn` and `yarn build`
- A folder named "build" will be created
- Commit the changes with the message "release [version]" (example: "release 1.0.1")

### GitHub release
- From react-gherkin-editor repository, go to releases tab and click on "Draft new release"
  - Tag: v[version] (example: v1.0.1)
  - Target branch: release
  - Release title: Release [version] (example: Release 1.0.1)
  - Fill the release notes
- Click on "Publish release"

### NPM Registry release
- Run `npm publish`

___
## Upgrade
***If you are using the release archive from GitHub only***

You can upgrade react-gherkin-editor in two different ways:
- [Using the release tag](https://github.com/SmartBear/react-gherkin-editor/tree/release#install-from-a-release-tag)
- From the Github repository:
  - Go to the wanted release in react-gherkin-editor Github repository
  - Download the source code and copy the downloaded file
  - Go to vendor folder of your project and paste the copied file
  - Run `yarn add file:[path to vendor file]`
