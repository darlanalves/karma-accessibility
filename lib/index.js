var path = require('path');

var createPattern = function(pattern) {
    return {
        pattern: pattern,
        included: true,
        served: true,
        watched: false
    };
}

var initPlugin = function(files) {
    var axsPath = path.dirname(require.resolve('accessibility-developer-tools'));

    files.unshift(createPattern(axsPath + '/dist/js/axs_testing.js'));
    files.unshift(createPattern(path.join(__dirname, '/adapter.js')));
    files.unshift(createPattern(path.join(__dirname, '/boot.js')));
}

initPlugin.$inject = ['config.files']

module.exports = {
    'framework:accessibility': ['factory', initPlugin]
}
