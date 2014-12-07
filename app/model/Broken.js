Ext.define('BugTracker.model.Broken', {
	extend: 'Ext.data.Model',
	requires: ['BugTracker.proxy.BugTracker', 
		'BugTracker.model.lookups.Category', 
		'BugTracker.model.lookups.Version', 
		'BugTracker.model.User'],
	proxy: {
		type: 'bugtracker',
		url: '/bugs'
	},
	fields: [
	{
		name: 'id',
		type: 'int'
	},
	{
		name: 'category_id',
		type: 'int'
	},
	{
		name: 'importance_id',
		type: 'int'
	},
	{
		name: 'version_id',
		type: 'int'
	},
	{
		name: 'reported_by_id',
		type: 'int'
	},
	{
		name: 'assigned_to_id',
		type: 'int'
	},
	{
		name: 'description',
		type: 'string'
	},
	{
		name: 'summary',
		type: 'string'
	},
	{
		name: 'date_assigned',
		type: 'date',
		dateFormat: 'c'
	},
	{
		name: 'date_completed',
		type: 'date',
		dateFormat: 'd/m/Y'
	},
	{ 
		name: 'estimate', 
		type: 'int'
	},
	{
		name: 'createdAt',
		type: 'date',
		dateFormat: 'd/m/Y'
	},
	{
		name: 'updatedAt',
		type: 'date',
		dateFormat: 'd/m/Y'
	}
	],
	belongsTo: [{
		name: 'category',
		model: 'BugTracker.model.lookups.Category',
		getterName: 'getCategory',
		foreignKey: 'category_id',
		associationKey: 'category'
	}, {
		name: 'version',
		model: 'BugTracker.model.lookups.Version',
		getterName: 'getVersion',
		foreignKey: 'version_id',
		associationKey: 'version'
	}, {
		name: 'importance',
		model: 'BugTracker.model.lookups.Importance',
		getterName: 'getImportance',
		foreignKey: 'importance_id',
		associationKey: 'importance'
	}, {
		name: 'assigned_to',
		model: 'BugTracker.model.User',
		associatedName: 'AssignedTo',
		foreignKey: 'assigned_to_id',
		associationKey: 'assignedTo'
	}, {
		name: 'reported_by',
		model: 'BugTracker.model.User',
		associatedName: 'ReportedBy',
		foreignKey: 'reported_by_id',
		associationKey: 'reportedBy'
	}]
});