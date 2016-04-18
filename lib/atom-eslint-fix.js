'use strict';

var $atom = require('atom');
var c = console;
var cp = require('child_process')

function bytes2String(bytes) {
    var result = "";
    for (var i = 0; i < bytes.length; i++) {
        result += String.fromCharCode(bytes[i]);
    }
    return result;
}
var AtomEslintFix = {
    activate: function () {
        this.subscriptions = new $atom.CompositeDisposable();

        this.subscriptions.add(
            atom.commands.add(
                'atom-workspace',
                {
                    'atom-eslint-fix:run': () => this.run()
                }
            )
        );
    },
    serialize: function () {},
    run: function () {
        this.exec(this.getCurrentFilePath());
    },
    getCurrentFilePath: function () {
        return atom.workspace.getActivePaneItem().getPath();
    },
    getCurrentFileSource: function () {
        var te = atom.workspace.getActiveTextEditor();
        return te ? te.getText() : '';
    },
    exec: function (filepath) {
        var p = cp.spawn('eslint', ['--fix', filepath]);
        var out = '';
        var err = '';
        p.stdout.on('data', (data) => {
            out += bytes2String(data);
        });
        p.stderr.on('data', (data) => {
            err += bytes2String(data);
        });
        p.on('close', (code) => {
            if (err) {
                atom.notifications.addError(err + (out ? '\n' + out : ''));
            } else if (out) {
                atom.notifications.addInfo(out);
            }
        });
    }
};

module.exports = AtomEslintFix;
