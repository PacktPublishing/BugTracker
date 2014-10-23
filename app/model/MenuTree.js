Ext.define('BugTracker.model.MenuTree',{
	extend: 'Ext.data.TreeModel',
	idProperty: 'id',
	fields: [
		{
			name: 'id',
			type: 'int'
		},{
			name: 'text',
			type: 'string'
		},{
			name: 'tooltip',
			type: 'string'
		},{
			name: 'actionId',
			type: 'string'
		},{
			name: 'iconCls',
			type: 'string'
		}, {
			name: 'cls',
			type: 'string'
		}
	]
});