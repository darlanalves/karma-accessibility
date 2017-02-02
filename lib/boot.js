(function(global) {
    /*global axs */
    'use strict'

    /**
     * Setting up timing functions to be able to be overridden.
     * Certain browsers (Safari, IE 8, PhantomJS) require this hack.
     */
    global.setTimeout = global.setTimeout
    global.setInterval = global.setInterval
    global.clearTimeout = global.clearTimeout
    global.clearInterval = global.clearInterval

}(typeof window !== 'undefined' ? window : global))
