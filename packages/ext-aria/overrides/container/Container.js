Ext.define('Ext.aria.container.Container', {
    override: 'Ext.container.Container',
    
    requires: [
        'Ext.aria.container.AbstractContainer'
    ],
    
    untitledText: 'Untitled Container',

    onBoxReady: function() {
        var me = this,
            scrollFlags = me.scrollFlags;
        
        me.callParent(arguments);

        // Scrolling will affect the location of the focus frame
        // Issue an afterLayout event so the focus manager can redraw the focus
        if (scrollFlags.y || scrollFlags.x) {
            me.getTargetEl().on('scroll', function() {
                Ext.globalEvents.fireEvent('afterlayout', me);
            });
        }
    },
    
    ariaGetRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent();

        // ARIA requires that all focusable items have a title so the screen readers can announce it
        // So we add a default title to the focusable container
        if (me.ariaIsSection()) {
            attrs['aria-label'] = me.ariaLabel || me.title || me.untitledText;
        }
        
        return attrs;
    },

    addFocusListener: function() {
        var me = this;

        // Do not add a listener to a container unless according to ARIA it is a section
        // or the developer has set focusableContainer: true
        if (me.ariaIsSection() || me.focusableContainer) {
            me.callParent(arguments);
        }
    }
});
