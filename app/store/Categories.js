Ext.define('BugTracker.store.Categories', {
	extend: 'Ext.data.Store',
	requires: 'BugTracker.model.lookups.Category',
	model: 'BugTracker.model.lookups.Category'
});