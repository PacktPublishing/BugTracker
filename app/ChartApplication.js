Ext.define('BugTracker.ChartApplication', {
	name: 'BugTracker',
	extend: 'Ext.app.Application',
	requires: [
		'BugTracker.view.ChartViewport',
		'Ext.data.Store'
	],

	views: [
	'ChartViewport'
	],

	controllers: [
	'Charts'
	],

	stores: [

	],

	init: function () {

	},

	launch: function () {
		Ext.QuickTips.init();
		Ext.create('BugTracker.view.ChartViewport');
	}
});