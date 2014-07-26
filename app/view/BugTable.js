Ext.define('BugTracker.view.BugTable', {
	extend: 'Ext.view.View',
	alias: 'widget.bugtable',
	itemSelector: '.bug-wrap',
	tpl: new Ext.XTemplate(
		'<table><thead><tr><th>Importance</th><th>Assigned</th><th>Completed</th></tr></thead><tbody><tpl for=".">',
		'<tr class=".bug-wrap">',
		'<td>{importance_name}</td>',
		'<td>{date_assigned:date("d-M-Y")}</td>',
		'<td>{date_completed:date("d-M-Y")}</td>',
		'</tr>',
		'</tpl></tbody></table>'),
	store: 'BugGrid'
});