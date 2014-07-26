Ext.define('Ext.aria.panel.Panel', {
    override: 'Ext.panel.Panel',
    
    requires: [
        'Ext.aria.panel.AbstractPanel',
        'Ext.aria.panel.Header'
    ],
    
    closeText: 'Close Panel',
    collapseText: 'Collapse Panel',
    expandText: 'Expand Panel',
    untitledText: 'Untitled Panel',
    
    initComponent: function() {
        var me = this;
        
        me.callParent();
        
        me.on('drag', me.ariaOnDrag, me);
    },
    
    setTitle: function(newTitle) {
        var me = this;
        
        me.callParent(arguments);
        me.ariaUpdate({ 'aria-label': newTitle });
    },
    
    ariaGetRenderAttributes: function() {
        var me = this,
            header = me.header,
            newAttrs = {},
            attrs, toolBtn, textEl;
        
        attrs = me.callParent(arguments);

        attrs['aria-expanded'] = !me.collapsed;
        
        if (me.header) {
            textEl = header.titleCmp && header.titleCmp.textEl;
            
            if (textEl) {
                newAttrs = {
                    'aria-labelledby': textEl.id,
                    'aria-label': undefined
                };
            }
        }

        if (me.collapseTool) {
            me.ariaUpdate(me.collapseTool.getEl(), {
                'aria-label': me.collapsed ? me.expandText : me.collapseText
            });
            
            me.collapseTool.keyMap = new Ext.util.KeyMap({
                target: me.collapseTool.el,
                key: [ Ext.EventObject.ENTER, Ext.EventObject.SPACE ],
                handler: me.toggleCollapse,
                scope: me
            });
        }

        if (me.closable) {
            toolBtn = me.down('tool[type=close]');
            
            me.ariaUpdate(toolBtn.getEl(), { 'aria-label': me.closeText });
            
            toolBtn.keyMap = new Ext.util.KeyMap({
                target: toolBtn.el,
                key: [ Ext.EventObject.ENTER, Ext.EventObject.SPACE ],
                handler: me.close,
                scope: me
            });
        }
        
        Ext.apply(attrs, newAttrs);

        return attrs;
    },

    onExpand: function() {
        var me = this;
        
        me.callParent(arguments);
        
        me.ariaUpdate({ 'aria-expanded': true });
        
        if (me.collapseTool) {
            me.ariaUpdate(me.collapseTool.getEl(), { 'aria-label': me.collapseText });
        }
    },

    onCollapse: function() {
        var me = this;
        
        me.callParent(arguments);
        
        me.ariaUpdate({ 'aria-expanded': false });
        
        if (me.collapseTool) {
            me.ariaUpdate(me.collapseTool.getEl(), { 'aria-label': me.expandText });
        }
    },
    
    ariaOnDrag: function() {
        Ext.aria.FocusManager.reDrawFocus();
    }
})