Ext.define('Ext.aria.container.Viewport', {
    override: 'Ext.container.Viewport',
    
    requires: [
        'Ext.aria.container.Container'
    ],
    
    ariaRole: 'application',
    
    ariaGetRenderAttributes: function() {
        var attrs = this.callParent();
        
        // Viewport should not have a label, document title should be announced instead
        delete attrs['aria-labelledby'];
        delete attrs['aria-label'];
        
        return attrs;
    }
});
