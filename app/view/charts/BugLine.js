Ext.define('BugTracker.view.charts.BugLine', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.chart-bugline',
	store: {
		fields: [
		{ name: 'created', type: 'date', dateFormat: 'c' },
		{ name: 'bugs', type: 'int' },
		{ name: 'open', type: 'int' }
		],
		proxy: { type: 'ajax', url: '/charts/bugsByTime', reader: { type: 'json', root: 'results'}},
		autoLoad: true
	},
	legend: {
		position: 'right'
	},
	axes: [{
		type: 'Numeric',
		minimum: 0,
		position: 'left',
		fields: ['bugs','open'],
		title: 'Bugs'
	},{
		type: 'time',
		position: 'bottom',
		fields: 'created',
		title: 'Date',

		dateFormat: 'M d'
	}],
	series: [{
		type: 'line',
		axis: 'left',
		showInLegend: true,
		xField: 'created',
		yField: 'bugs',
		title: 'Bugs Created',
		shadowAttributes: {}
	},{
		type: 'line',
		axis: 'left',
		showInLegend: true,
		xField: 'created',
		yField: 'open',
		title: 'Still open',
		shadowAttributes: {}
	}]
});