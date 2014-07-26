Ext.define('BugTracker.view.BugCard', {
	extend: 'Ext.view.View',
	alias: 'widget.bugcard',
	itemSelector: '.bug-wrap',
	tpl: new Ext.XTemplate(
		'<tpl for=".">',
		'<div class="bug-wrap importance-{importance_name}">',
		'<div class="importance">{importance_name}</div>',
		'<div class="bug">',
		'<div class="date"><span class="label">Assigned:</span> {date_assigned:date("d-M-Y")}</div>',
		'<div class="date"><span class="label">Completed:</span> {date_completed:date("d-M-Y")}</div>',
		'</div>',
		'</div>',
		'</tpl>',
		'<div class="x-clear"></div>'),
	store: 'BugGrid'
});