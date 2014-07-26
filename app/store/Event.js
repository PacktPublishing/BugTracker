Ext.define('BugTracker.store.Event', {
	extend: 'Ext.calendar.data.MemoryEventStore',
	requires: [
	'Ext.data.proxy.Ajax',
	'Ext.calendar.data.MemoryEventStore',
	'Ext.data.reader.Json'
	],

	proxy: {
		type: 'ajax',
		url: '/bugs.calendar',
		reader: {
			type: 'json',
			root: 'results'
		}
	},

	autoLoad: true

});