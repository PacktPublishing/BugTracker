Ext.define('BugTracker.view.BugMaster', {
	requires: ['BugTracker.view.BugGrid', 'BugTracker.store.BugGrid'],
	extend: 'BugTracker.view.BugGrid',
	alias: 'widget.bugmaster',
	stateful: true,
	stateId: 'bugmaster'
})