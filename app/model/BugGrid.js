Ext.define('BugTracker.model.BugGrid', {
	extend: 'BugTracker.model.Bug',
	fields: [{
		name: 'category_name',
		mapping: 'category.name'
	},{
		name: 'importance_name',
		mapping: 'importance.name'
	}]
});