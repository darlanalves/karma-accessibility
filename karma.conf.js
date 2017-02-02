module.exports = function(config) {
    var browsers = [];

    if (process.env.TRAVIS || process.env.FIREFOX) {
        browsers.push('Firefox');
    }

    if (process.env.CHROME) {
        browsers.push('Chrome');
    }

    if (process.env.PHANTOMJS || !browsers.length) {
        browsers.push('PhantomJS');
    }

    config.set({
        frameworks: ['jasmine', 'accessibility'],

        files: [ 'test/*.js', 'src/*.js' ],

        browsers: browsers,

        autoWatch: true,

        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-firefox-launcher',
            'karma-chrome-launcher',
            require.resolve('./')
        ]
    })
}
