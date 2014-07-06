Ext.define('BugTracker.model.Resource', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.proxy.Ajax'],
    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'user_id',
            type: 'int'
        }
    ],
    proxy: {
        type: 'ajax',
        url: '/resources',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});