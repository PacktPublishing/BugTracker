Ext.define('Ext.aria.Component', {
    override: 'Ext.Component',

    requires: [
        'Ext.aria.FocusManager',
        'Ext.aria.AriaSupport'
    ],

    // onBoxReady is the best place to set Aria attributes.
    // Several of the attributes, like aria-labeledby, aria-describedby, active-descendent, 
    // need to refer to element ids which are generated at this point         
    onBoxReady: function() {
        var me = this,
            attrs;
            
        me.callParent(arguments);
        
        attrs = me.ariaGetRenderAttributes();
        me.ariaUpdate(me.ariaGetEl(), attrs);

        // Assign role=presentation to all elements without role in this component
        Ext.AriaSupport.assignDefaultRole(me.el);
    },

    ariaGetRenderAttributes: function() {
        var me = this,
            attrs = {};

        if (me.ariaRole) {
            attrs['role'] = me.ariaRole;
        }
        
        if (me.hidden) {
            attrs['aria-hidden'] = true;
        }
        
        if (me.disabled) {
            attrs['aria-disabled'] = true;
        }
        
        return attrs;
    },

    /**
     * Updates the component's element properties
     * @private
     * @param {Ext.Element} The properties .
     * @param {Object[]} Array of properties (name: value)
     */
    ariaUpdate: function(el, props) {
        // The one argument form updates the actionEl
        if (arguments.length == 1) {
            props = el;
            el = this.ariaGetEl();
        }
        
        if (!el) {
            return;
        }
        
        el.set(props);
    },

    ariaGetEl: function() {
        return this.getActionEl() || this.getEl();
    },

    /**
     * Retrieves the first parent container that is designated as an Aria section
     * @private
     * @return {Ext.Container} A container that is focusable
     * Returns `null` if there is no section.
     */
    ariaGetFocusableSection: function() {
        return this.up('{ariaIsSection()}');
    },
        
    ariaGetFocusFallback: function () {
        return this.ariaGetFocusableSection();
    },

    ariaIsSection: function() {
        return false;
    },

    ariaNextSibling: function(selector, loop) {
        var me = this,
            it = me.ownerCt && me.ownerCt.items,
            last, idx, c, len, i;
        
        if (it) {
            idx = it.indexOf(me);
            
            if (idx < 0) {
                return null;
            }
            
            len = it.getCount();
            
            if (loop) {
                for (i = idx; ;) {
                    // Increment index, and loop round if off either end
                    if ((i += 1) >= len) {
                        i = 0;
                    }
                    else if (i < 0) {
                        i = len - 1;
                    }

                    // As soon as we loop back to the starting index, give up, there are no focusable siblings.
                    if (i === idx) {
                        return null;
                    }
                    
                    c = it.getAt(i);
                    
                    if (selector && c.is(selector)) {
                        return c;
                    }
                    else if (!selector) {
                        return c;
                    }
                }
            }
            else {
                if (selector) {
                    for (last = it.getCount(); idx < last; idx++) {
                        c = it.getAt(idx);
                        
                        if (c.is(selector)) {
                            return c;
                        }
                    }
                }
                else {
                    if (idx < len) {
                        return it.getAt(idx);
                    }
                }
            }
        }
        
        return null;
    },

    ariaPreviousSibling: function(selector, loop) {
        var me = this,
            it = me.ownerCt && me.ownerCt.items,
            idx, c, len, i;
        
        if (it) {
            idx = it.indexOf(me);
            
            if (idx < 0) {
                return null;
            }
            
            len = it.getCount();
            
            if (loop) {
                for (i = idx; ;) {
                    // Increment index, and loop round if off either end
                    if ((i -= 1) >= len) {
                        i = 0;
                    }
                    else if (i < 0) {
                        i = len - 1;
                    }

                    // As soon as we loop back to the starting index, give up, there are no focusable siblings.
                    if (i === idx) {
                        return null;
                    }

                    c = it.getAt(i);
                    
                    if (selector && c.is(selector)) {
                        return c;
                    }
                    else if (!selector) {
                        return c;
                    }
                }

            }
            else {
                if (selector) {
                    for (--idx; idx >= 0; idx--) {
                        if ((c = it.getAt(idx)).is(selector)) {
                            return c;
                        }
                    }
                }
                else {
                    if (idx) {
                        return it.getAt(--idx);
                    }
                }
            }

        }
        
        return null;
    },

    ariaPreviousNode: function() {
        var node = this,
            regionCt,
            result,
            it, len, i, idx;

        regionCt = node.up('{ariaIsSection()}');

        if (!regionCt) {
            return null;
        }
        
        it = regionCt.ariaGetFocusItems();
        len = it.length;
        
        if (!len) {
            return null;
        }
        
        idx = Ext.Array.indexOf(it, node);

        for (i = idx - 1; ; i--) {
            // Increment index, and loop round if off either end
            if (i === len) {
                i = 0;
            }
            else if (i < 0) {
                i = len - 1;
            }
            
            // As soon as we loop back to the starting index, give up, there are no focusable siblings.
            if (i === idx) {
                return null;
            }
            
            result = it[i];
            
            if (result && result.isFocusable()) {
                return result;
            }
        }
        
        return null;
    },

    ariaNextNode: function() {
        var node = this,
            regionCt,
            result,
            it, len, i, idx;

        regionCt = node.up('{ariaIsSection()}');
        
        if (!regionCt) {
            return null;
        }
        
        it = regionCt.ariaGetFocusItems();
        len = it.length;
        
        if (!len) {
            return null;
        }
        
        idx = Ext.Array.indexOf(it, node);

        for (i = idx + 1; ; i++) {
            // Increment index, and loop round if off either end
            if (i === len) {
                i = 0;
            }
            else if (i < 0) {
                i = len - 1;
            }
            
            // As soon as we loop back to the starting index, give up, there are no focusable siblings.
            if (i === idx) {
                return null;
            }

            result = it[i];
            
            if (result && result.isFocusable()) {
                return result;
            }
        }
        
        return null;
    },
    
    afterHide: function () {
        var me = this,
            mgr = Ext.aria.FocusManager;
       
        // We must call this here to avoid losing focus before 
        // processing
        if (mgr.enabled) {            
            mgr.onComponentHide(me);
        }
        
        this.callParent(arguments);
    },
    
    onFocus: function(e, t, eOpts) {
        var me = this,
            mgr = Ext.aria.FocusManager;

        me.callParent(arguments);

        if (me.isGroupedBy) {
            me.isGroupedBy.lastFocus = me;
        }

        if (me.hasFocus && mgr.enabled) {
            return mgr.onComponentFocus(me);
        }
    },

    onBlur: function(e, t, eOpts) {
        var me = this,
            mgr = Ext.aria.FocusManager;
            
        me.callParent(arguments);
        
        if (!me.hasFocus && mgr.enabled) {
            return mgr.onComponentBlur(me);
        }
    },

    onDestroy: function() {
        var me = this,
            mgr = Ext.aria.FocusManager;
            
        me.callParent(arguments);
        
        if (mgr.enabled) {
            mgr.onComponentDestroy(me);
        }
    },

    onDisable: function() {
        var me = this;
        
        me.callParent(arguments);
        me.ariaUpdate({ 'aria-disabled': true });
    },

    onEnable: function() {
        var me = this;
        
        me.callParent(arguments);
        me.ariaUpdate({ 'aria-disabled': false });
    },

    onHide: function() {
        var me = this,
            mgr = Ext.aria.FocusManager;
        
        me.callParent(arguments);
        me.ariaUpdate({ 'aria-hidden': true });
    },

    onShow: function() {
        var me = this;
        
        me.callParent(arguments);
        me.ariaUpdate({ 'aria-hidden': false });
    },

    getFocusFrameEl: function() {
        return this.getFocusEl();
    }
});
