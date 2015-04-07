Ext.define('BugTracker.view.ChartViewport', {
	extend: 'Ext.container.Viewport',
	requires: [
	'Ext.layout.container.Fit',
	'BugTracker.view.charts.BugLine',
	'BugTracker.view.charts.BugCategoryBar',
	'BugTracker.view.charts.BugCategoryPie',
	'BugTracker.view.charts.BugRadar',
	'BugTracker.view.charts.BugGauge'
	],

	layout: {
		type: 'fit'
	},
	items: [{
		xtype: 'bugradar',
		width: 800,
		height: 600
	}]
/*	items: [{ 
		layout: 'hbox', 
		items: [{
			xtype: 'chart-bugline',
			flex: 1,
			height: 600,
			width: 500
		}, {
			layout: 'vbox',
			flex: 1, 
			height: 600,
			items: [{
				xtype: 'chart-buggauge',
				flex: 1,
				height: 200,
				width: 400
			}, {
				xtype: 'chart-bugcategorybar',
				height: 400,
				width: 400
			}]
		}]
	}]*/
	// here is where we'll include our chart work for testing    
	/*items: [{ 
		xtype: 'panel',		
		border: true,
		layout: 'hbox',
		items: [{
			flex: 1,
			height: 400,
			width: 400,
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
		dockedItems: [{
			xtype: 'toolbar',
			items: [{
				itemId: 'refreshButton',
				text: 'Refresh',
				tooltip: 'Reloads data from the server',
                iconCls: 'refresh'
        	}, {
        		itemId: 'exportButton',
        		text: 'Export',
        		tooltip: 'Export to SVG',
        		iconCls: 'export'
        	}, { 
        		itemId: 'exportPngButton',
        		text: 'Export to PNG',
        		tooltip: 'Export PNG',
        		iconCls: 'export'
        	}, { 
        		itemId: 'exportPdfButton',
        		text: 'Export to PDF',
        		tooltip: 'Export PDF',
        		iconCls: 'exportPdf'
        	}]
        }],
		flex: 1
	}]*/
});
