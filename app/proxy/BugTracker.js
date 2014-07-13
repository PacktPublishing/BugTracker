Ext.define('BugTracker.proxy.BugTracker', {
	extend: 'Ext.data.proxy.Rest',
	alias: 'proxy.bugtracker',

	reader: {
		type: 'json',
		messageProperty: 'message',
		root: 'results'
	},

	writer: {
		type: 'json',
		writeAllFields: false,
		allowSingle: false,
		writeRecordId: true
	},

	isValidId: function(id) {
        return id != undefined && id != 0;
    }
    
});