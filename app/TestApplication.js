Ext.define('BugTracker.TestApplication', {
	name: 'BugTracker',
	extend: 'Ext.app.Application',
	requires: [
		'BugTracker.view.TestViewport',
		'Ext.data.Store',
		'BugTracker.store.Categories', 'BugTracker.store.Users', 'BugTracker.view.Login', 
		'BugTracker.view.TestViewport', 'BugTracker.utils.Format'
	],

	views: [
		'TestViewport'
	],

	controllers: [
		'Bug'
	],

	stores: [
		'BugGrid'
	],

	init: function () {

	},

	launch: function () {
		Ext.QuickTips.init();
		Ext.create('BugTracker.view.TestViewport');
	}
});