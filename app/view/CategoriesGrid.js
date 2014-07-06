Ext.define('BugTracker.view.CategoriesGrid', {
	extend: 'BugTracker.view.AbstractGrid',
	alias: 'widget.categorygrid',
	store: Ext.create('BugTracker.store.Categories')
});
