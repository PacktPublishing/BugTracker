Ext.define('BugTracker.controller.Translation', {
	extend: 'Ext.app.Controller',
	init: function() {
		this.control({
			'#langChooser': {
				select: this.onLanguageSelect
			}

		})
	},
	onLanguageSelect: function(combo, records, eOpts) {
		var lang = combo.getValue();
		localStorage.setItem('userLang', lang);
		window.location.reload();
	}
});