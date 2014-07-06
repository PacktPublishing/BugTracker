Ext.define('BugTracker.model.AbstractLookup', {
	extend: 'Ext.data.Model',
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
		name: 'description',
		type: 'string'
	},
	{
		name: 'createdAt',
		type: 'date',
		dateFormat: 'Y-m-d H:i:s'
	},
	{
		name: 'updatedAt',
		type: 'date',
		dateFormat: 'Y-m-d H:i:s'
	}
	],

	belongsTo: [{
		name: 'bug',
		model: 'BugTracker.model.Bug'
	}],

	validations: [
	{
		type: 'presence',
		field: 'name'
	},
	{
		type: 'length',
		field: 'name',
		max: 100
	},
	{
		type: 'length',
		field: 'description',
		max: 254
	}
	]
});