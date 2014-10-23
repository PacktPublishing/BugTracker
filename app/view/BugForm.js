Ext.define('BugTracker.view.BugForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.bugform',
	url: '/bugs',
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
		height: 150
	}, {
		type: 'panel',
		html: 'etc...'
	}], 
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'bottom',
		items: [
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