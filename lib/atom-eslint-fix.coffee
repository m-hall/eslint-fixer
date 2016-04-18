AtomEslintFixView = require './atom-eslint-fix-view'
{CompositeDisposable} = require 'atom'

module.exports = AtomEslintFix =
  atomEslintFixView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @atomEslintFixView = new AtomEslintFixView(state.atomEslintFixViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @atomEslintFixView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'atom-eslint-fix:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @atomEslintFixView.destroy()

  serialize: ->
    atomEslintFixViewState: @atomEslintFixView.serialize()

  toggle: ->
    console.log 'AtomEslintFix was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
