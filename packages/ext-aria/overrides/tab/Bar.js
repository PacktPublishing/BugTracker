Ext.define('Ext.aria.tab.Bar', {
    override: 'Ext.tab.Bar',
    
    requires: [
        'Ext.aria.tab.Tab'
    ],
    
    ariaRole: 'tablist',

    onAdd: function(tab) {
        var me = this;
        
        tab.isGroupedBy = me;
        
        me.callParent(arguments);
    },

    setActiveTab: function(tab) {
        var me = this,
            i, items, item;

        me.callParent(arguments);
        items = me.getRefItems();

        for (i = 0; i < items.length; i++) {
            item = items[i];
            item.ariaUpdate({
                'aria-selected': item.active
            });
        }

        // in case the tab car was not rendered when the tab was created
        // cards are rendered only when a tab is selected
        if (tab.card.rendered) {
            tab.ariaUpdate({
                'aria-controls': tab.card.getEl().id
            });
        }
    },

    ariaGetFocusItems: function(e) {
        var me = this,
            i, items, item;

        items = me.getRefItems();
        
        for (i = 0; i < items.length; i++) {
            item = items[i];
            
            if (item.hasFocus) {
                return [item];
            }
        }
        
        for (i = 0; i < items.length; i++) {
            item = items[i];
            
            if (item.active && item.isFocusable()) {
                return [item];
            }
        }
        
        return [];
    },

    ariaGetEl: function() {
        var me = this;
        
        return me.getTargetEl().getById(me.id + '-targetEl');
    },

    ariaGetRenderAttributes: function() {
        var me = this,
            ownerCt = me.ownerCt,
            attrs;
        
        attrs = me.callParent(arguments);

        attrs['aria-label'] = (ownerCt && ownerCt.title) || 'Tab Panel';

        return attrs;
    }
});
