Ext.define('Ext.aria.button.Button', {
    override: 'Ext.button.Button',
    requires: [
        'Ext.aria.Component'
    ],
    
    ariaRole: 'button',

    ariaGetRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent(arguments);
        
        if (me.menu) {
            attrs['aria-haspopup'] = true;
        }
        
        if (me.enableToggle) {
            attrs['aria-pressed'] = me.pressed;
        }
        
        return attrs;
    },

    toggle: function(state) {
        var me = this;
        
        me.callParent(arguments);
        me.ariaUpdate({ "aria-pressed": me.pressed });
    },
    
    // To be implemented in Ext 4.2.2
    beforeRender: function() {
        var me = this,
            ariaLabel = me.ariaLabel;
            
        if (ariaLabel) {
            me.autoEl['aria-label'] = ariaLabel;
        }
        
        me.callParent();
    }
})