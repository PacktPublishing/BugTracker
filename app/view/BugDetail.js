Ext.define('BugTracker.view.BugDetail', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.bugdetail',
	tpl: new Ext.XTemplate(
		'<tpl for=".">',
		'<div class="bugdetail-item">',
		'<p class="description">Description: {data.summary:htmlEncode}</p>',
		'<p class="category">{[values.getCategory().get("name")]}</p>',
		'<p class="estimate">{[this.addDays(values.data.estimate)]}</p>',
		'<p class="date">{data.date_assigned:date("d-M-y")}</p>',
		'</div>',
		'</tpl>',
		{
			addDays: function(i) {
				return Ext.util.Format.format('{0} days', i);
			}
		}),
	disableFormat: false
});