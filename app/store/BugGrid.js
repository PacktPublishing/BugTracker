Ext.define('BugTracker.store.BugGrid', {
	extend: 'Ext.data.Store',
	requires: ['BugTracker.model.BugGrid'],
	storeId: 'BugGrid',
	model: 'BugTracker.model.BugGrid',
	pageSize: 20,
	remoteSort: true,
	proxy: {
		type: 'bugtracker',
		enablePaging: true,
		url: '/bugs'
	},
	sorters: [{
		property: 'createdAt',
		direction: 'DESC'
	}]
});