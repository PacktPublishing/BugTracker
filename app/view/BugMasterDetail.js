Ext.define('BugTracker.view.BugMasterDetail', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.bugmasterdetail',
	requires: ['BugTracker.view.BugMaster','BugTracker.view.BugDetail'],
	layout: {
		type: 'border'
	},
	items: [
	{ 
		xtype: 'bugmaster',
		itemId: 'master',
		region: 'north',
		height: 400
	}, {
		xtype: 'bugdetail',
		itemId: 'detail',
		region: 'center'
	}
	]
});