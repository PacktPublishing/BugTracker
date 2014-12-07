Ext.define('BugTracker.view.LanguageChooser', {
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.languageChooser',
	store: [['en','English'],['es','Spanish'],['fr','French']],
	fieldLabel: 'Language'
});