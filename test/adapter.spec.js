/**
 Tests for adapter/jasmine.js
 These tests are executed in browser.
 */

/* global MockSocket, createStartFn, getRelevantStackFrom, isExternalStackEntry */

'use strict'

describe('karma accessibility adapter', function() {
    var Karma, callParent;

    beforeAll(function() {
        Karma = window.__karma__.constructor;

        callParent = function(name, args) {
            try {
                window.__karma__[name].apply(window.__karma__, args);
            } catch (e) {
                console.log(e.message);
            }
        };
    });

    describe('start', function() {
        it('should run the axs tool upon start', function (done) {
            // var karma = new Karma(new MockSocket(), null, null, null, { search: '' });
            var karma = new Karma(callParent);

            var config = {
                accessibility: {
                    url: 'http://localhost:9876/debug.html',
                    printRules: false,
                    // auditRulesToRun: [],
                    // auditRulesToIgnore: [],
                    // scope: 'body',
                    // showUnsupportedRulesWarning: false,
                    maxResults: 0,
                    ignoreBySelector: {
                        lowContrast: ['.no-contrast'],
                        pageWithoutTitle: ['title']
                    }
                }
            };

            karma.config = config;

            var parentWindow = window.opener || window.parent
            karma.setupContext(parentWindow);

            var resultSpy = spyOn(karma, 'result').and.callThrough();

            createStartFn(karma)(done);

            // expect(karma.result).toHaveBeenCalled();
        });
    });
});
