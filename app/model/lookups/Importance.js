Ext.define('BugTracker.model.lookups.Importance', {
	extend: 'BugTracker.model.AbstractLookup',
	proxy: {
		type: 'bugtracker',
		url: '/importance'
	}
});