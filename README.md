# karma-accessibility

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/darlan/karma-accessibility)
[![npm version](https://img.shields.io/npm/v/karma-accessibility.svg?style=flat-square)](https://www.npmjs.com/package/karma-accessibility) [![npm downloads](https://img.shields.io/npm/dm/karma-accessibility.svg?style=flat-square)](https://www.npmjs.com/package/karma-accessibility)

[![Build Status](https://img.shields.io/travis/darlan/karma-accessibility/master.svg?style=flat-square)](https://travis-ci.org/darlan/karma-accessibility)

> Adapter for the [Google Accessibility](https://github.com/GoogleChrome/accessibility-developer-tools/) testing framework.


## Installation


```bash
$ npm install karma-accessibility@0.1.0 --save-dev
```


## Configuration

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['accessibility'],

    files: [
      '*.js'
    ],

    accessibility: {
        // if true, prints a list of all available rules before running the tests
        printRules: true,

        // array of rules to run (the names from the list above)
        auditRulesToRun: [],

        // array of rules to ignore (the names from the list above)
        auditRulesToIgnore: [],

        // CSS selector to restrict the tests to a specific portion of your HTML
        scope: 'body',

        // if true, a message is logged when some rules were not applied due to
        // some issue with the document
        showUnsupportedRulesWarning: false,

        // limit the amount of results logged on console
        maxResults: 0,

        // a map of rule name and CSS selectors for elements that should NOT be
        // checked against that rule
        ignoreSelectors: {
            lowContrast: ['.no-contrast'],
            pageWithoutTitle: ['title']
        }
    }
}
```

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
