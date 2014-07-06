Ext.define('BugTracker.view.Menu', {
	extend: 'Ext.tree.Panel',
	requires: ['BugTracker.store.MenuTree'],
	alias: 'widget.treemenu',
	rootVisible: false,
	store: 'MenuTree'
});