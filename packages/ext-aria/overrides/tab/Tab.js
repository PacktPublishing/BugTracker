Ext.define('Ext.aria.tab.Tab', {
    override: 'Ext.tab.Tab',
    
    ariaRole: 'tab',
    
    onRender: function() {
        var me = this;
        
        me.callParent();
        
        me.keyNav.destroy();
        
        me.keyNav = new Ext.util.KeyNav(me.el, {
            enter: me.onEnterKey,
            space: me.onEnterKey,
            del: me.onDeleteKey,
            scope: me
        });
    },

    ariaGetRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent(arguments);

        if (me.card && me.card.getEl()) {
            attrs['aria-controls'] = me.card.getEl().id;
            attrs['aria-selected'] = me.active;
        }
        
        return attrs;
    }
});
