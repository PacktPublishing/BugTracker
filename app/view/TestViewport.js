Ext.define('BugTracker.view.TestViewport', {
	extend: 'Ext.container.Viewport',
	requires: [
		'BugTracker.view.BugGrid',
		'BugTracker.view.BugCard',
		'BugTracker.view.BugTable'
	],
	layout: 'fit', 
	items: [
		//{ xtype: 'buggrid' }
		{ xtype: 'bugcard' }
	]
});