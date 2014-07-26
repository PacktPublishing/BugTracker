/**
* A grouping grid to show bugs by category
*/
Ext.define('BugTracker.view.ReportGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.bugreport',
	requires: ['Ext.grid.feature.GroupingSummary', 'BugTracker.utils.Format' ],
	columns: [
	{text: 'Assigned to', dataIndex: 'assigned_to'},
	{text: 'Reported by', dataIndex: 'reported_by'},
	{text: 'Date Assigned', dataIndex: 'date_assigned', xtype: 'datecolumn', summaryType: 'max'},
	{text: 'Date Completed', dataIndex: 'date_completed', xtype: 'datecolumn'},
	{text: 'Category', dataIndex: 'category'},
	{
		text: 'Estimate', 
		dataIndex: 'estimate', 
		summaryType: 'sum', 
		renderer: BugTracker.utils.Format.addDays,
		summaryRenderer: BugTracker.utils.Format.addDays
	}
	],
	features: [{
		id: 'group',
		ftype: 'groupingsummary',
		hideGroupedHeader: false,
		enableGroupingMenu: true
	}],
	store: new Ext.data.Store({
		groupField: 'category',
		autoLoad: true,
		proxy: {
			type: 'ajax',
			url: '/reports/bugs',
			reader: {
				type: 'json',
				root: 'results'
			}
		},
		fields: [ 
		{ name: 'summary' }, 
		{ name: 'assigned_to'}, 
		{ name: 'reported_by'}, 
		{ name: 'date_assigned', type: 'date', dateFormat: 'c' },
		{ name: 'date_completed', type: 'date', dateFormat: 'c' },
		{ name: 'category' },
		{ name: 'estimate', type: 'int' }
	]})

});