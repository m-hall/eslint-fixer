'use strict';

var $atom = require('atom');
var c = console;

var AtomEslintFix = {
    activate: function () {
        this.subscriptions = new $atom.CompositeDisposable();

        this.subscriptions.add(atom.commands.add('atom-workspace', {'atom-eslint-fix:run': this.run}));
    },
    serialize: function () {},
    run: function () {
        c.log('Eslint Fix was run!');
    }
};

module.exports = AtomEslintFix;
