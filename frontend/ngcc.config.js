module.exports = {
  packages: {
    'ng-project-helper': {
      ignorableDeepImportMatchers: [
        /class-transformer\//,
        /@angular\/material\//,
      ]
    }
  }
};
