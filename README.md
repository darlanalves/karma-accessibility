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

## Available Rules

| Rule | Description |
| --- | --- |
| ariaOnReservedElement | This element does not support ARIA roles, states and properties |
| ariaOwnsDescendant | aria-owns should not be used if ownership is implicit in the DOM |
| ariaRoleNotScoped | Elements with ARIA roles must be in the correct scope |
| audioWithoutControls | Audio elements should have controls |
| badAriaAttribute | This element has an invalid ARIA attribute |
| badAriaAttributeValue | ARIA state and property values must be valid |
| badAriaRole | Elements with ARIA roles must use a valid, non-abstract ARIA role |
| controlsWithoutLabel | Controls and media elements should have labels |
| duplicateId | Any ID referred to via an IDREF must be unique in the DOM |
| focusableElementNotVisibleAndNotAriaHidden | These elements are focusable but either invisible or obscured by another element |
| humanLangMissing | The web page should have the content's human language indicated in the markup |
| imagesWithoutAltText | Images should have a text alternative or presentational role |
| linkWithUnclearPurpose | The purpose of each link should be clear from the link text |
| lowContrastElements | Text elements should have a reasonable contrast ratio |
| mainRoleOnInappropriateElement | role=main should only appear on significant elements |
| elementsWithMeaningfulBackgroundImage | Meaningful images should not be used in element backgrounds |
| multipleAriaOwners | An element's ID must not be present in more that one aria-owns attribute at any time |
| multipleLabelableElementsPerLabel | A label element may not have labelable descendants other than its labeled control. |
| nonExistentRelatedElement | Attributes which refer to other elements by ID should refer to elements which exist in the DOM |
| pageWithoutTitle | The web page should have a title that describes topic or purpose |
| requiredAriaAttributeMissing | Elements with ARIA roles must have all required attributes for that role |
| requiredOwnedAriaRoleMissing | Elements with ARIA roles must ensure required owned elements are present |
| roleTooltipRequiresDescribedby | Elements with role=tooltip should have a corresponding element with aria-describedby |
| tabIndexGreaterThanZero | Avoid positive integer values for tabIndex |
| tableHasAppropriateHeaders | Tables should have appropriate headers |
| uncontrolledTabpanel | A tabpanel should be related to a tab via aria-controls or aria-labelledby |
| unfocusableElementsWithOnClick | Elements with onclick handlers must be focusable |
| unsupportedAriaAttribute | This element has an unsupported ARIA attribute |
| videoWithoutCaptions | Video elements should use <track> elements to provide captions' |


----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
