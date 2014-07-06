Ext.define('BugTracker.model.User', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'id', type: 'int' },
        { name: 'email', type: 'string' },
        { name: 'password', type: 'password' },
        { name: 'name_first', type: 'string' },
        { name: 'name_last', type: 'string' },
        { name: 'lang', type: 'string' },
        { name: 'group_id', type: 'int' }
    ],

    belongsTo:[{
    	name: 'group',
    	model: 'BugTracker.model.Group',
    	foreignKey: 'group_id'
    }],
    hasMany: [{
        name: 'resources',
        model: 'BugTracker.model.Resource'
    }],

    validations: [{
    	type: 'presence', field: 'email'
    },{
    	type: 'presence', field: 'password'
    },{
    	type: 'presence', field: 'name_last'
    },{
    	type: 'length', field: 'email', max: 250, min: 4
    },{
    	type: 'length', field: 'name_last', max: 50, min: 5
    },{
    	type: 'length', field: 'password', max: 250, min: 8
    },{
    	type: 'email', field: 'email'
    },{
    	type: 'customPassword', field: 'password'
    }],

    /**
     * Determine whether this user has permission to access a given resource
     */
    can: function (resource) {
        var results = this.resources().findExact('name', resource);
        return results != -1;
    },

    proxy: {
        type: 'rest',
        url: '/users',
        reader: {
            type: 'json',
            root: 'results'
        }
    }


});
