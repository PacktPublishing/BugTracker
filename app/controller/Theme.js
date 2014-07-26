Ext.define('BugTracker.controller.Theme', {
	extend: 'Ext.app.Controller',
	init: function() {
		this.control({
			'#themeChooser': {
				select: this.selectTheme
			}
		})
	},
	selectTheme: function(combo, records) {
		var suffix = records[0].data.id,
		css = '/ext/packages/' + suffix + '/build/resources/' + suffix + '-all.css';
		if (suffix == 'default') css = 'build/BugTracker/production/resources/BugTracker-all.css';
		Ext.util.CSS.swapStyleSheet('theme', css);
	}
});

