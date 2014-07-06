Ext.define('BugTracker.view.ChartViewport', {
	extend: 'Ext.container.Viewport',
	requires: [
	'Ext.layout.container.Fit',
	'BugTracker.view.charts.BugLine',
	'BugTracker.view.charts.BugCategoryBar',
	'BugTracker.view.charts.BugGauge'
	],

	layout: {
		type: 'fit'
	},

	// here is where we'll include our chart work for testing    
	items: [{ 
		xtype: 'panel',
		
		border: true,
		layout: 'hbox',
		items: [{
			flex: 1,
			height: 400,
			xtype: 'chart-bugline'
		}, { 
			xtype: 'panel',
			layout: 'vbox',
			flex: 1,
			items: [
				{
					xtype: 'chart-bugcategorybar',
					height: 400,
					width: 300
				},
				{
					xtype: 'chart-buggauge',
					width: 300,
					height: 200
				}
			]
		}],
		flex: 1
	}]
});
