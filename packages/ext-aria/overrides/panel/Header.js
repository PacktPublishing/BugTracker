    Ext.define('Ext.aria.panel.Header', {
    override: 'Ext.panel.Header',
    
    requires: [
        'Ext.aria.container.Container'
    ],

    ariaGetFocusItems: function(e) {
        var me = this,
            items = me.getTools(),
            len = items.length,
            focusables = [],
            cmp;
        
        for (var i = 0; i < len; i++) {
            cmp = items[i];
            
            if (cmp.isFocusable()) {
                focusables.push(cmp);
            }
        }
        
        return focusables;
    }
});
