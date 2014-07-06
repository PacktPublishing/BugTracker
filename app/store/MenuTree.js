Ext.define('BugTracker.store.MenuTree', {
	extend: 'Ext.data.TreeStore',
	requires: ['BugTracker.model.MenuTree'],
	model: 'BugTracker.model.MenuTree',
	storeId: 'MenuTree',
	lazyFill: false,
	autoLoad: true,
	proxy: {
		type: 'ajax',
		url: '/menu'
	}
})