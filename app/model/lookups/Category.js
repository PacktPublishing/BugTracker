Ext.define('BugTracker.model.lookups.Category', {
	extend: 'BugTracker.model.AbstractLookup',
	proxy: {
		type: 'bugtracker',
		url: '/categories'
	}
});