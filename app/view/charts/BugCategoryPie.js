Ext.define('BugTracker.view.charts.BugCategoryPie', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.chart-bugcategorypie',
	store: {
		fields: [{ name: 'category', type: 'string' }, {name: 'bugs', type: 'int' }],
		proxy: { type: 'ajax', url: '/charts/bugsByCategory', reader: { type: 'json', root: 'results'}},
		autoLoad: true
	},
	legend: {
		position: 'right'
	},
	series: [{
		type: 'pie',
		field: 'bugs',
		showInLegend: true,
		donut: 70,
		tips: {
			trackMouse: true,
			width: 200,
			renderer: function(storeItem, item) {
				this.setTitle(storeItem.get('category') + ': ' + storeItem.get('bugs') + ' bugs');
			}
		},
		label: {
			field: 'category',
			display: 'inside',
			contrast: false,
			font: '16px Arial'
		}
	}]
});