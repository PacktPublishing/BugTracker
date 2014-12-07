Ext.define('BugTracker.store.Broken', {
	extend: 'Ext.data.Store',
	requires: ['BugTracker.model.Broken'],
	storeId: 'broken',
	model: 'BugTracker.model.Broken',
});