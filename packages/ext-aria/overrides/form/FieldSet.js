Ext.define('Ext.aria.form.FieldSet', {
    override: 'Ext.form.FieldSet',
    
    requires: [
        'Ext.aria.container.Container'
    ],
    
    expandText: 'Expand',
    collapseText: 'Collapse',

    onBoxReady: function () {
        var me = this,
            legend = me.legend;

        me.callParent(arguments);

        if (!legend) {
            return;
        }

        // mark the legend and the checkbox or drop down inside the legend immune to collapse
        // so when they get focus, isVisible(deep) will not return true for them when the fieldset is collapsed
        legend.collapseImmune = true;
        legend.getHierarchyState().collapseImmune = true;

        if (me.checkboxCmp) {
            me.checkboxCmp.collapseImmune = true;
            me.checkboxCmp.getHierarchyState().collapseImmune = true;
            me.checkboxCmp.getActionEl().dom.setAttribute('title', me.expandText + ' ' + me.title);
        }

        if (me.toggleCmp) {
            me.toggleCmp.collapseImmune = true;
            me.toggleCmp.getHierarchyState().collapseImmune = true;

            // The toggle component is missing a key map to respond to enter and space
            me.toggleCmp.keyMap = new Ext.util.KeyMap({
                target: me.toggleCmp.el,
                key: [
                    Ext.EventObject.ENTER,
                    Ext.EventObject.SPACE
                ],
                handler: function(key, e, eOpt) {
                    e.stopEvent();
                    me.toggle();
                },
                scope: me
            });

            if (me.collapsed) {
                me.toggleCmp.getActionEl().dom.setAttribute('title', me.expandText + ' ' + me.title);
            }
            else {
                me.toggleCmp.getActionEl().dom.setAttribute('title', me.collapseText + ' ' + me.title);
            }
        }

    },

    ariaGetRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent(arguments);

        attrs['aria-expanded'] = !me.collapsed;
        
        return attrs;
    },

    setExpanded: function(expanded) {
        var me = this;

        me.callParent(arguments);
        me.ariaUpdate({ 'aria-expanded': expanded });
        
        // Should this statement go to the main branch?
        me.getHierarchyState().collapsed = !expanded;

        // Update the title
        if (me.toggleCmp) {
            if (!expanded) {
                me.toggleCmp.getActionEl().dom.setAttribute('title', me.expandText + ' ' + me.title);
            }
            else {
                me.toggleCmp.getActionEl().dom.setAttribute('title', me.collapseText + ' ' + me.title);
            }
        }
    }
});
