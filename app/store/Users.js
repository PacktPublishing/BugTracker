Ext.define('BugTracker.store.Users', {
	extend: 'Ext.data.Store',
	requires: 'BugTracker.model.User',
	model: 'BugTracker.model.User'
});