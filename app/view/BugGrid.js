// this is a paging filtered sortable grid with a remote back-end
Ext.define('BugTracker.view.BugGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.buggrid',
	requires: ['BugTracker.store.BugGrid',
	'BugTracker.store.Categories',
	'BugTracker.store.Users',
	'Ext.grid.column.Date',
	'Ext.ux.grid.FiltersFeature',
	'Ext.ux.grid.filter.DateFilter',
	'Ext.ux.grid.filter.ListFilter',
	'Ext.ux.grid.filter.StringFilter',
	'Ext.grid.plugin.CellEditing'],
	store: 'BugGrid',
	dockedItems: [{
		xtype: 'pagingtoolbar',
		store: 'BugGrid',
		dock: 'bottom',
		displayInfo: true
	}],
	
	plugins: [
	{ 
		ptype: 'cellediting',
		listeners: {
			validateedit: function(editor, e, eOpts) {
				if (e.field == 'reported_by_id') {
					var user = Ext.getStore('Users').findRecord('id', e.value)
					e.record.setReportedBy(user)
					console.log(e, user);	
				}
				return true;
			}
		} 
	}
	],
	initComponent: function() {
		// quick fix to allow lazy loading of stores from manager
		// in initialisation of component instead of creation on 
		// definition
		this.features.forEach(function(j) {
			if (j.ftype === 'filters') {
				j.filters.forEach(function(i) {
					if (i.store && typeof(i.store) == 'string') {
						i.store = Ext.getStore(i.store);
					}
				})
			}
		});
		this.callParent();
	},
	listeners: {
		render: function(grid) {
			var nav = new Ext.util.KeyNav(Ext.getDoc(), {
				pageDown: function() {
					grid.down('pagingtoolbar').moveNext()
				}, 
				pageUp: function() {
					grid.down('pagingtoolbar').movePrevious()
				},
				right: function() {
					console.log('right', arguments)
					grid.down('pagingtoolbar').moveNext()
				},
				left: function() {
					console.log('left', arguments)
					grid.down('pagingtoolbar').movePrevious()
				}
			});
		}
	},
	
	features: [
	{
		ftype: 'filters',
		stateId: 'bugGridFilters',
		encode: true, // encode the filters as json to make it easier on the backend
		filters: [
		{
			type: 'date',
			dataIndex: 'createdAt',
			dateFormat: 'c'
		},
		{
			type: 'date',
			dataIndex: 'date_assigned',
			dateFormat: 'c'
		},
		{
			type: 'date',
			dataIndex: 'date_completed',
			dateFormat: 'c'
		},
		{
			type: 'string',
			dataIndex: 'summary'
		},
		{
			type: 'numeric',
			dataIndex: 'estimate'
		},
		// now for some based on the lookups
		{
			type: 'list',
			dataIndex: 'assigned_to',
			store: 'Users' //Ext.create('BugTracker.store.Users')
		},
		{
			type: 'list',
			dataIndex: 'reported_by',
			store: 'Users' //Ext.create('BugTracker.store.Users')
		},
		{
			type: 'list',
			dataIndex: 'category',
			store: 'Categories' //Ext.create('BugTracker.store.Categories')
		},
		{
			type: 'list',
			dataIndex: 'importance',
			options: ['High', 'Medium', 'Low']
		}
		]
	}
	],
	columns: [
	{
		text: 'Importance',
		dataIndex: 'importance_name'
	},
	{
		text: 'Category',
		dataIndex: 'category_name',
		name: 'category_name'
	},
	{
		text: 'Summary',
		dataIndex: 'summary',
		renderer: Ext.util.Format.htmlEncode,
		editor: {
			xtype: 'textfield'
		}
	},
	{
		text: 'Date Reported',
		dataIndex: 'createdAt',
		xtype: 'datecolumn',
		editor: {
			xtype: 'datefield'
		}
	},
	{
		text: 'Reported By',
		dataIndex: 'reported_by_id',
		editor: {
			xtype: 'combo',
			store: 'Users',
			displayTpl: '<tpl for=".">{name_first} {name_last}</tpl>',
			tpl: '<tpl for="."><div class="x-boundlist-item">{name_first} {name_last}</div></tpl>',
			listWidth: 200,
			matchFieldWidth: false,
			valueField: 'id'
		},
		renderer: function(i, m, r) { 
			try {
				var user = r.getReportedBy();
				var result = user.data.name_first + ' ' + user.data.name_last;
			} catch (e){
				return '';
			}
			return result;
		}
	},
	{
		text: 'Date Assigned',
		dataIndex: 'date_assigned',
		xtype: 'datecolumn'
	},
	{
		text: 'Assigned To',
		dataIndex: 'assigned_to_id',
		renderer: function(i, m, r) { 
			try {
				var user = r.getAssignedTo();
				var result = user.data.name_first + ' ' + user.data.name_last;
			} catch (e){
				return '';
			}
			return result;
		}
	},
	{
		text: 'Estimated Work',
		dataIndex: 'estimate'
	},
	{
		text: 'Date Completed',
		dataIndex: 'date_completed',
		xtype: 'datecolumn'
	}
	]
});