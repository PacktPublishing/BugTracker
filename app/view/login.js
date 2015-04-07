Ext.define('BugTracker.view.Login', {
	extend: 'Ext.window.Window',
	requires: ['BugTracker.view.LanguageChooser'],
	alias: 'widget.login',
	autoShow: true,
	height: 220,
	width: 360,
	layout: {
		type: 'fit'
	},
	iconCls: 'key',
	title: 'Login',
	closeAction: 'hide',
	closable: false,

	items: [{
		xtype: 'form',
		frame: false,
		bodyPadding: 15,
		defaults: {
			xtype: 'textfield',
			anchor: '100%',
			labelWidth: 60
		},
		items: [{
			name: 'user',
			fieldLabel: translate('User')
		},{
			inputType: 'password',
			name: 'password',
			fieldLabel: translate('Password')
		},{
			xtype: 'languageChooser',
			itemId: 'langChooser',
			anchor: '80%'
		}, {
			xtype: 'combo',
			itemId: 'themeChooser',
			store: [['default','Default'], ['ext-theme-access','Accessible'], ['ext-theme-classic','Classic']],
			fieldLabel: 'Theme',
			anchor: '80%'
		}],
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'bottom',
			items: [{
				xtype: 'tbfill'
			}, {
				xtype: 'button',
				itemId: 'cancel',
				iconCls: 'cancel',
				text: 'Cancel',
				ui: 'red'
			}, {
				xtype: 'button',
				itemId: 'submit',
				iconCls: 'login',
				text: 'Login'
			}]
		}]
	}]
})