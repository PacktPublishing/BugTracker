Ext.define('BugTracker.model.lookups.Version', {
	extend: 'BugTracker.model.AbstractLookup',
	proxy: {
		type: 'bugtracker',
		url: '/releases'
	},
	fields: [{
		name: 'release_version',
		type: 'int'
	}, {
		name: 'release_date',
		type: 'date',
		dateFormat: 'Y-m-d H:i:s'
	}, {
		name: 'release_apporved_by',
		type: 'string'
	}]

});