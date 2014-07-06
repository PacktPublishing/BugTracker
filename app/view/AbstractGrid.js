Ext.define('BugTracker.view.AbstractGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.abstractgrid',
	requires: ['Ext.grid.plugin.RowEditing'],
	columns: [
	{
		text: 'Name',
		dataIndex: 'name',
		editor: {
			xtype: 'textfield',
			allowBlank: false
		}
	},
	{
		text: 'Created',
		dataIndex: 'createdAt',
		xtype: 'datecolumn'
	},
	{
		text: 'Updated',
		dataIndex: 'updatedAt',
		xtype: 'datecolumn'
	}
	],
	plugins: [
	{
		ptype: 'rowediting',
		clicksToEdit: 1
	}
	],
	dockedItems: [{
		xtype: 'toolbar',
		items: [{
			itemId: 'addButton',
			text: 'Add',
			tooltip: 'Add a new row',
			iconCls: 'add'
		}, '-', {
			itemId: 'removeButton',
			text: 'Remove Something',
			tooltip: 'Remove the selected item',
			iconCls: 'remove',
			ui: 'redtoolbar'
		}, '-', {
			itemId: 'refreshButton',
			text: 'Refresh',
			tooltip: 'Reloads data from the server',
			iconCls: 'refresh'
		}
		]
	}]
});