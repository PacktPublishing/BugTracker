Ext.define('BugTracker.store.Calendar', {
	extend: 'Ext.calendar.data.MemoryCalendarStore',
	model: 'Ext.calendar.data.CalendarModel',

	requires: [
	'Ext.data.proxy.Ajax',
	'Ext.calendar.data.MemoryCalendarStore',
	'Ext.data.reader.Json',
	'Ext.calendar.data.CalendarModel'
	],

	proxy: {
		type: 'ajax',
		url: '/calendars',
		reader: {
			type: 'json',
			root: 'results'
		}
	},

	autoLoad: true

});