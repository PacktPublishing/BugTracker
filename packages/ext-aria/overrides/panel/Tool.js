Ext.define('Ext.aria.panel.Tool', {
    override: 'Ext.panel.Tool',
    
    requires: [
        'Ext.aria.Component'
    ],
    
    ariaRole: 'button',

    ariaGetRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent(arguments);

        if (me.tooltip && me.tooltipType == 'qtip') {
            attrs['aria-label'] = me.tooltip;
        }

        return attrs;
    }
});
