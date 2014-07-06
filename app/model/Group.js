Ext.define('BugTracker.model.Group', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' }

    ],

    hasMany: [{
    	model: 'BugTracker.model.User',
    	foreignKey: 'group_id',
    	name: 'Users'
    }]
});
