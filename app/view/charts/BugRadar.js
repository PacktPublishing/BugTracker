Ext.define('BugTracker.view.charts.BugRadar', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.bugradar',
	requires: ['Ext.chart.*', 'BugTracker.store.Test'],
	store: {
		fields: [
			{ name: 'weekday', type: 'string' }, 
			{ name: 'Blocker', type: 'float' },
			{ name: 'Bug', type: 'float' },
			{ name: 'Improvement', type: 'float' }
		],
		proxy: { type: 'bugtracker', url: '/charts/bugsByCategoryByDay'},
		autoLoad: true
	},
	legend: {
		position: 'right'
	},
	insetPadding: 20,
	animate: true,
	axes: [{
		type: 'radial',
		position: 'radial',
		minimum: 0,
		maximum: 10,
		label: { 
			display: true
		}
	}],
	series: ['Blocker','Bug','Improvement'].map(function(i) {
		return {
			type: 'radar',
			xField: 'weekday',
			yField: i,
			showInLegend: true,
			showMarkers: true,
			style: {
	        	'stroke-width': 2,
            	fill: 'none'
        	}
        }
    })
});