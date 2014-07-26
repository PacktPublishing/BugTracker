Ext.define('Ext.aria.view.AbstractView', {
	override: 'Ext.view.AbstractView',
	
	requires: [
	    'Ext.aria.Component'
	],
	
	ariaRole: 'list'
});
