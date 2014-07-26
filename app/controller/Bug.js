Ext.define('BugTracker.controller.Bug', {
	extend: 'Ext.app.Controller',
	views: [
	'BugMasterDetail',
	'BugForm'
	],
	stores: ['BugGrid'],

	refs: [{
		ref: 'detail',
		selector: 'bugmasterdetail #detail'
	}, {
		ref: 'master',
		selector: 'bugmasterdetail #master'
	}, {
		ref: 'masterDetail',
		selector: 'bugmasterdetail'
	}],

	init: function (application) {
		this.control({
			'bugmasterdetail #master': {
				render: this.onMasterRender,
				selectionchange: this.onMasterSelectionChange
			},
			'buggrid': {
				render: this.onBugCardRender
			},
			'bugcard': {
				render: this.onBugCardRender
			},
			'bugtable': {
				render: this.onBugCardRender
			}
		});
	},

	newBug: function() {
		var w = Ext.create('Ext.window.Window', { 
			width: 500, 
			height: 400, 
			layout: 'fit', 
			title: 'New bug', 
			items: [ { xtype: 'bugform' }]
		});
		w.show();
	},

	onRender: function(target) {
		
	},
	onMasterRender: function(target) {
		
	},
	onBugCardRender: function(target) {
		var me = this;
		me.getStore('BugGrid').reload();
	},

	onMasterSelectionChange: function (sm, selected, eOpts) {
		var me = this;
		if (selected.length == 1) {
			me.bindDetailPanel(selected[0]);
		}
	},

	bindDetailPanel: function (record) {
		var me = this, detail = me.getDetail();
		detail.update(detail.tpl.apply(record));
	}
});