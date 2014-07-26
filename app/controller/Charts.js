Ext.define('BugTracker.controller.Charts', {
	extend: 'Ext.app.Controller',
	init: function() {
		this.control({
			'panel #exportButton': {
				click: this.onPanelSaveClick
			},
			'panel #exportPngButton': {
				click: this.onPanelPngClick
			},
			'panel #exportPdfButton': {
				click: this.onPanelPdfClick
			},
			'panel #refreshButton': {
				click: this.onPanelRefreshClick
			}
		});
	},
	onPanelSaveClick: function(tool) {
		var svg = tool.up('panel').down('chart').save();
		window.open('data:image/svg+xml,' + encodeURIComponent(svg));
	},
	onPanelPngClick: function(tool) {
		tool.up('panel').down('chart').save({
			type: 'image/png',
			url: '/png',
			width: 500,
			height: 400
		});
	},
	onPanelPdfClick: function(tool) {
		window.open('/pdf?url=/simpleDashboard.html')
	},
	onPanelRefreshClick: function(tool) {
		tool.up('panel').query('chart').forEach(function(i) { i.getStore().load(); });
	}
});