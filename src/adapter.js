/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "(createStartFn)" }]*/

'use strict';

/**
 * Karma starter function factory.
 *
 * This function is invoked from the wrapper.
 * @see  adapter.wrapper
 *
 * @param  {Object}   karma        Karma runner instance.
 * @return {Function}              Karma starter function.
 */
function createStartFn (karma) {
    // This function will be assigned to `window.__karma__.start`:
    return function (done) {
        var clientConfig = (karma.config || {}).accessibility || {};

        if (clientConfig.printRules) {
            printAvailableRules();
        }

        if (clientConfig.url) {
            parseDocumentFromUrl(clientConfig.url, run);
            return;
        }

        if (clientConfig.html) {
            run(clientConfig.html);
            return;
        }

        karma.error(new Error('Invalid url or HTML text to audit. Provide a value to "url" or "html" configuration.'));

        function run(html) {
            if (!html) {
                karma.error(new Error('HTML provided is not valid or document is empty'));
                return;
            }

            clientConfig.document = parseHTML(html);
            runAudit(clientConfig);

            if (done) { done(); }
        }
    }

    function parseDocumentFromUrl(url, callback) {
        var request = new XMLHttpRequest();

        request.onload = function(response) {
            callback(request.responseText || '');
        };

        request.onerror = function() {
            callback('');
        };

        request.open('GET', url);
        request.send(null);
    }

    function parseHTML(html) {
        var doc = document.implementation.createHTMLDocument('widget');
        doc.documentElement.innerHTML = html;

        return doc;
    }

    function applyAuditConfig(target, clientConfig) {
        target.scope = clientConfig.document;

        if (clientConfig.scope !== undefined) {
            target.scope = target.scope.querySelector(clientConfig.scope);
        }

        if (clientConfig.auditRulesToRun !== undefined) {
            target.auditRulesToRun = clientConfig.auditRulesToRun;
        }

        if (clientConfig.auditRulesToIgnore !== undefined) {
            target.auditRulesToIgnore = clientConfig.auditRulesToIgnore;
        }

        if (clientConfig.withConsoleApi !== undefined) {
            target.withConsoleApi = !!clientConfig.withConsoleApi;
        }

        if (clientConfig.showUnsupportedRulesWarning !== undefined) {
            target.showUnsupportedRulesWarning = !!clientConfig.showUnsupportedRulesWarning;
        }

        if (clientConfig.maxResults !== undefined) {
            target.maxResults = Number(clientConfig.maxResults) || 0;
        }

        // if (clientConfig.ignoreSelectors !== undefined) {
        // }
    }

    function runAudit(clientConfig) {
        var AuditConfig = axs.AuditConfiguration;
        var config = new AuditConfig();
        applyAuditConfig(config, clientConfig);

        if (config.target) {
            karma.error(new Error('Scope selector not found: ' + clientConfig.scope));
            return;
        }

        var startTime = new Date().getTime();
        var auditOutput = axs.Audit.run(config);
        var endTime = new Date().getTime();
        var duration = endTime - startTime;

        var PossibleResults = axs.constants.AuditResult;

        karma.info({ total: auditOutput.length, specs: [] });

        auditOutput.forEach(function(o, index) {
            var isNotApplicable = o.result === PossibleResults.NA;

            var rule = o.rule;
            var isFailure = o.result === PossibleResults.FAIL;
            var description = formatRuleDescription(rule);
            var logMessage = isFailure && [rule.heading + '\n' + rule.url] || '';

            var resultObject = {
                id: index,
                description: description,
                suite: [],
                log: logMessage,
                success: !isFailure,
                skipped: isNotApplicable,
                time: duration,
                executedExpectationsCount: index + 1
            };

            karma.result(resultObject);
        });

        karma.complete();
    }

    function printAvailableRules(rules) {
        var rules = axs.AuditRules.specs;
        var ruleNames = Object.keys(rules);

        var ruleDescriptions = ruleNames.map(function(name) {
            var rule = rules[name];
            return '  ' + formatRuleDescription(rule);
        });

        console.log('> Available rules:');
        console.log(ruleDescriptions.join('\n'));
    }

    function formatRuleDescription(rule) {
        return '[' + rule.name + ']: ' + rule.heading;
    }
}
