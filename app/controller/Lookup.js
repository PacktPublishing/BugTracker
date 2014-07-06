Ext.define('BugTracker.controller.Lookup', {
	extend: 'Ext.app.Controller',
	views: [ 'CategoriesGrid' ],
	stores: [ 'Categories' ],

	init: function (application) {
		this.control({
			"abstractgrid": {
				render: this.onGridRender
			},
			"abstractgrid button#refreshButton": {
				click: this.onRefreshClick
			}
		});
	},

	onGridRender: function (component, options) {
		component.getStore().load();
	},
	onRefreshClick: function (button) {
		button.up('abstractgrid').getStore().reload();
	},
	onItemFormSave: function (button) {
		// update the record in the store
		var form = button.up('form').getForm();
		form.updateRecord();
		form.getRecord().save();
		// now save the change to the server
		button.up('abstractform').close();
	},
	onItemFormCancel: function (button) {
		button.up('abstractform').close();
	},
	onRefreshClick: function (button) {
		button.up('abstractgrid').getStore().reload();
	}

});