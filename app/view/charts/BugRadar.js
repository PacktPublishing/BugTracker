Ext.define('BugTracker.view.charts.BugRadar', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.chart-bugradar',
	requires: ['Ext.chart.*', 'BugTracker.store.Test'],
	store: {
		fields: [
			{ name: 'category', type: 'string' }, 
			{ name: 'bugs', type: 'float' }, 
			{ name: 'open', type: 'float' }
		],
		proxy: { type: 'bugtracker', url: '/charts/bugsByCategory'},
		autoLoad: true
	},

	legend: {
		position: 'right'
	},
	insetPadding: 20,
	animate: true,
	axes: [{
		type: 'Radial',
		position: 'radial',
		label: { 
			display: false
		}
	}],
	series: [{
		type: 'radar',
		xField: 'category',
		yField: 'bugs',
		showInLegend: true,
		showMarkers: true,
		style: {
	        'stroke-width': 2,
            fill: 'none'
        }
	}]
});