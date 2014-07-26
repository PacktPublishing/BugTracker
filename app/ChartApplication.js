Ext.define('BugTracker.ChartApplication', {
	name: 'BugTracker',
	extend: 'Ext.app.Application',
	requires: [
		'BugTracker.view.ChartViewport',
		//'BugTracker.view.MapViewport',
		'Ext.data.Store'
	],

	views: [
	'ChartViewport'
	//'MapViewport'
	],

	controllers: [
	'Charts', 'Maps'
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