Ext.define('BugTracker.view.Calendar', {
	extend: 'Ext.calendar.CalendarPanel',
	eventStore: Ext.create('BugTracker.store.Event'),
	calendarStore: Ext.create('BugTracker.store.Calendar'),
	enableDD: false,

	dockedItems: [{
		xtype: 'toolbar',
		dock: 'top',
		items: [{
			xtype: 'datefield',
			format: 'm d Y'
		}]
	}]

})