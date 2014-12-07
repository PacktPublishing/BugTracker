Ext.define('BugTracker.store.Importances', {
	extend: 'Ext.data.Store',
	requires: 'BugTracker.model.lookups.Importance',
	model: 'BugTracker.model.lookups.Importance'
});