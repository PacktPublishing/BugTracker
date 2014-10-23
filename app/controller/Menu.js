Ext.define('BugTracker.controller.Menu', {
	extend: 'Ext.app.Controller',
	views: ['Menu'],
	models: ['MenuTree'],
	stores: ['MenuTree'],
	init: function (application) {
		var me = this;
		this.control({
			'treemenu': {
				itemclick: this.handleMenu
			}, 
			'tabpanel#main': {
				render: function() {
					Ext.History.on('change', me.historyChange, this)
				}
			}
		});
		this.menuActions = {
			bugsList: this.showBugList,
			bugsReport: this.showBugReport,
			calendar: this.showCalendar,
			bugsNew: BugTracker.getApplication().getController('Bug').newBug
		};
	},
	refs: [
	{
		ref: 'tabs',
		selector: 'tabpanel#main'
	}
	],
	historyChange: function(token) {
		var me = this;
		var tokenDelimiter = ':';
		if (token == null) token = '';

		var tabsRequired = token.split(tokenDelimiter);
		var tabsFound = [];
		var tabs = this.getTabs();

		tabs.items.each(function(tab) {
			// if not in the required, close it
			var itemId = tab.getItemId();
			tabsFound.push(itemId);
			if (!Ext.Array.contains(tabsRequired,itemId)) {
				tabs.remove(itemId);
			}			
		});

		// if in required, but not created, run the action
		Ext.Array.each(tabsRequired, function(tab) {
			if (!Ext.Array.contains(tabsFound,tab)) {
				var action = me.menuActions[tab];
				if (action) {
					action.call(me);
				}
			}
		});	
	},

	handleMenu: function (view, record, node, rowIndex, e) {
		var actionId = record.data.actionId;
		var action = this.menuActions[actionId];
		var tokenDelimiter = ':';
		if (action) {
			action.call(this);

			// history management
			var currentToken = Ext.History.getToken() || '';
			var currentTabs = currentToken.split(tokenDelimiter);
			currentTabs.push(actionId);
			Ext.History.add(currentTabs.join(tokenDelimiter));
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
		var tab = this.addTab(Ext.widget('buggrid', { title: 'Bugs', itemId: 'bugsList' }));
		tab.getStore().load();
	},

	showBugReport: function () {
		var report = Ext.create('BugTracker.view.ReportGrid', {
			title: 'Report on Bugs',
			itemId: 'bugsReport',
			closable: true
		});
		this.addTab(report)
	},

	showCalendar: function () {
		this.addTab(Ext.create('BugTracker.view.Calendar', {
			title: 'Bug calendar',
			itemId: 'calendar',
			closable: true
		}));
	}

});