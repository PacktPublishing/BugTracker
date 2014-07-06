Ext.define("BugTracker.view.UserGrid", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.usergrid',
    store: 'usersStore',
    columns: [
    	{ text: 'Name', xtype: 'templatecolumn', tpl: '{name_first} {name_last}' },
    	{ text: 'Email', dataIndex: 'email', flex: 1 }
    ]
});