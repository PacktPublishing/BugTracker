Ext.define('BugTracker.controller.Charts', {
	extend: 'Ext.app.Controller',
	init: function() {
		this.control({
			'panel #save': {
				click: this.onPanelSaveClick
			}
		})
	},
	onPanelSaveClick: function(tool) {
		var svg = tool.up('panel').down('chart').save();
	}
});