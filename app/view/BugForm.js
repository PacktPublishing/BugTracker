Ext.define('BugTracker.view.BugForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.bugform',
	url: '/bugs',
	margin: 10,
	items: [{
		xtype: 'combo',
		store: 'Users',
		name: 'assigned_to_id',
		fieldLabel: 'Assigned To',
		valueField: 'id',
		displayTpl: '<tpl for=".">{name_first} {name_last}</tpl>',
		tpl: '<tpl for="."><div class="x-boundlist-item">{name_first} {name_last}</div></tpl>',
		listWidth: 200,
		matchFieldWidth: false
	}, {
		xtype: 'textarea',
		name: 'summary',
		fieldLabel: 'Summary',
		width: 400,
		height: 100
	}, {
		xtype: 'combo',
		store: 'Categories',
		name: 'category_id',
		fieldLabel: 'Category',
		valueField: 'id',
		displayField: 'name'
	}, {
		xtype: 'combo',
		store: 'Importances',
		name: 'importance_id',
		fieldLabel: 'Importance',
		valueField: 'id',
		displayField: 'name'
	}, {
		xtype: 'textarea',
		name: 'description',
		fieldLabel: 'Description',
		anchor: '95%',
		height: 300
	}], 
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'bottom',
		items: [
			'->',
			{
				xtype: 'button',
				itemId: 'saveButton',
				text: 'Save',
				iconCls: 'save'
			}, {
				xtype: 'button',
				itemId: 'cancelButton',
				text: 'Cancel',
				iconCls: 'cancel'
			}
		]
	}]
});