Ext.define('BugTracker.controller.Menu', {
	extend: 'Ext.app.Controller',
	views: ['Menu'],
	models: ['MenuTree'],
	stores: ['MenuTree'],
	init: function (application) {
		this.control({
			'treemenu': {
				itemclick: this.handleMenu
			}
		});
		this.menuActions = {
			bugsList: this.showBugList,
			bugsReport: this.showBugReport,
			calendar: this.showCalendar
		};
	},
	refs: [
	{
		ref: 'tabs',
		selector: 'tabpanel#main'
	}
	],
	
	handleMenu: function (view, record, node, rowIndex, e) {
		var actionId = record.data.actionId;
		var action = this.menuActions[actionId];
		var tokenDelimiter = ':';
		if (action) {
			action.call(this);
		}
	},
	addTab: function (tabContent) {
		var tabs = this.getTabs();
		var tab = tabs.add(tabContent);
		tabs.setActiveTab(tab);
		return tab;
	},

	showBugList: function () {
		// show the bug master details grid
		var tab = this.addTab(Ext.widget('buggrid', { title: 'Bugs' }));
		tab.getStore().load();
	},

	showBugReport: function () {
		var report = Ext.create('BugTracker.view.ReportGrid', {
			title: 'Report on Bugs',
			closable: true
		});
		this.addTab(report)
	},

	showCalendar: function () {
		this.addTab(Ext.create('BugTracker.view.Calendar', {
			title: 'Bug calendar',
			closable: true
		}));
	}
});