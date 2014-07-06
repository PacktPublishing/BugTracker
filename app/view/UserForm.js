Ext.define("BugTracker.view.UserForm", {
    extend: 'Ext.window.Window',
	alias: 'widget.userform',
	autoShow: true,
	layout: {
		type: 'fit'
	},
	iconCls: 'user',
	title: 'Edit User',
	closeAction: 'hide',
	closable: false,

	items: [ {
		xtype: 'form',
		frame: false,
		bodyPadding: 15,
		model: 'BugTracker.model.User',
		defaults: {
			xtype: 'textfield', // #16
			anchor: '100%',
			labelWidth: 60
		}, 
		items: [ {
			name: 'name_first',
			fieldLabel: "First Name"
		}, {
			name: 'name_last',
			fieldLabel: "Last Name"
		}, {
			name: 'email',
			fieldLabel: "Email"
		}, {
			inputType: 'password',
			name: 'password',
			fieldLabel: "Password"
		},  {
			inputType: 'password',
			name: 'confirm_password',
			fieldLabel: "Confirm Password"
		} ],
		dockedItems: [ {
			xtype: 'toolbar',
			dock: 'bottom',
			items: [ {
				xtype: 'tbfill'
			}, {
				xtype: 'button', 
				itemId: 'cancel',
				iconCls: 'cancel',
				text: 'Cancel'
			}, {
				xtype: 'button', 
				itemId: 'submit',
				iconCls: 'save',
				text: 'Save'
			}]
		}]
	} ]
});