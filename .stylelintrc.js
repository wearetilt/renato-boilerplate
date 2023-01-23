// https://stylelint.io/user-guide/configuration/

module.exports = {
    extends: 'stylelint-config-sass-guidelines',
    rules: {
      // Add custom rules here.
      'order/properties-alphabetical-order': null,
      'color-named': null,
      'string-quotes': 'double'
    }
  }