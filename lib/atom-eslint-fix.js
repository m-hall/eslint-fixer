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
        atom.commands.add(
            'atom-workspace',
            {
                'atom-eslint-fix:run': () => this.run()
            }
        );
        atom.commands.add(
            '.tree-view .file .name',
            {
                'atom-eslint-fix:run-tree-view': () => this.runTreeView()
            }
        );
    },
    serialize: function () {},
    run: function () {
        this.exec(this.getCurrentFilePath());
    },
    getCurrentFilePath: function () {
        return atom.workspace.getActivePaneItem().getPath();
    },
    getTreeSelectedFiles: function () {
        var treeView = atom.packages.getLoadedPackage('tree-view');
        if (!treeView) {
            return [];
        }
        treeView = require(treeView.mainModulePath).treeView;
        return treeView.selectedPaths();
    },
    runTreeView: function (data) {
        var files = this.getTreeSelectedFiles();
        if (!files) {
            return;
        }
        this.exec(files);
    },
    exec: function (filepath) {
        var args = filepath instanceof Array ? ['--fix'].concat(filepath) : ['--fix', filepath];
        var p = cp.spawn('eslint', args);
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
                atom.notifications.addError(
                    'ESLint fix failed',
                    {
                        details: err + (out ? '\n' + out : ''),
                        dismissable: true
                    }
                );
            } else if (out) {
                atom.notifications.addSuccess(
                    'ESLint fix successful',
                    {
                        details: out
                    }
                );
            }
        });
    }
};

module.exports = AtomEslintFix;
