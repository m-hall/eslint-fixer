# ESLint Fixer

Runs ```eslint --fix``` on the current file.

This plugin is considered deprecated, in favor of using [Linter ESLint](https://atom.io/packages/linter-eslint) (see below).


## Linter ESLint
It is recommended to use [Linter ESLint](https://atom.io/packages/linter-eslint) instead of this plugin. It has a feature to autofix on save.

If you want to fix files on right-click, then you can use add the following script to your init file.

```coffeescript
atom.contextMenu.add {
    'atom-workspace': [
        { label: 'Fix lint', command: 'linter-eslint:fix-file' }
    ]
}
```
