Ext.define('BugTracker.view.charts.BugGauge', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.chart-buggauge',
	requires: [
	'Ext.chart.axis.Gauge',
	'Ext.chart.series.Gauge'
	],
	store: {
		fields: [{ name: 'complete', type: 'float' }],
		proxy: { type: 'ajax', url: '/charts/bugsProgress', reader: { type: 'json', root: 'results' }},
		autoLoad: true
	},
	animate: true,
	axes: [{
		type: 'gauge',
		position: 'gauge',
		minimum: 0,
		maximum: 100,
		steps: 10,
		margin: -10
	}],
	series: [{
		type: 'gauge',
		field: 'complete',
		colorSet: ['#F49D10', '#ddd'],
		donut: 70
	}]
});