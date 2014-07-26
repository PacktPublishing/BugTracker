Ext.define('Ext.aria.container.AbstractContainer', {
    override: 'Ext.container.AbstractContainer',
    
    requires: [
        'Ext.aria.Component'
    ],
    
    ariaRole: 'presentation',

    /**
     * Returns the first focusable component in the container
     * @protected
     * @return {Ext.Component} The first focusable component in the container
     */
    ariaFirstChild: function() {
        var list = this.ariaGetFocusItems();
  
        return list[0] || null;
    },

    /**
     * Returns the last focusable component in the container
     * @protected
     * @return {Ext.Component} The last focusable component in the container
     */
    ariaLastChild: function() {
        var list = this.ariaGetFocusItems(),
            len = list.length;
        
        return len ? list[len - 1] : null;
    },

    /**
     * Returns a flattened list of focusable components in the container.
     * @protected
     * @return {Ext.Component[]} Array of focusable components
     */
    ariaGetFocusItems: function() {
        var items = this.getRefItems(),
            len = items.length,
            focusables = [],
            cmp, i;

        for (i = 0; i < len; i++) {
            cmp = items[i];
            
            if (cmp.isVisible()) {
                if (cmp.focusListenerAdded) {
                    if (cmp.isFocusable()) {
                        focusables.push(cmp);
                    }
                }
                else if (cmp.isContainer) {
                    focusables = focusables.concat(cmp.ariaGetFocusItems());
                }
            }
        }
        
        return focusables;
    },

    /**
     * Checks if the container is a section according to Aria
     * When a section gets focus, you need to press enter to
     * focus its children. Esc will return focus to the section
     * @protected
     * @return {Boolean} `true` if the container is a section, else `false`.
     */
    ariaIsSection: function() {
        return Ext.AriaSupport.isSection(this.ariaRole);
    }
});