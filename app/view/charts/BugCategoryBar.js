Ext.define('BugTracker.view.charts.BugCategoryBar', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.chart-bugcategorybar',
	requires: ['Ext.data.JsonStore'],
	store: {
		fields: [{ name: 'category', type: 'string' }, {name: 'bugs', type: 'int' }],
		proxy: { type: 'ajax', url: '/charts/bugsByCategory', reader: { type: 'json', root: 'results'}},
		autoLoad: true
	},
	title: 'Bugs by Category',
	axes: [{
		type: 'Numeric',
		position: 'left',
		fields: ['bugs'],
		minimum: 0,
		title: 'Number of Bugs'
	},{ 
		type: 'Category', 
		fields: ['category'], 
		position: 'bottom',
		title: 'Type of Bug'
	}],
	series: [{
		type: 'column',
		axis: 'left',
		xField: 'category',
		yField: 'bugs',
		tips: {
			trackMouse: true,
			width: 200,
			renderer: function(storeItem, item) {
				this.setTitle(storeItem.get('category') + ': ' + storeItem.get('bugs') + ' bugs');
			}
		}
	}]
});