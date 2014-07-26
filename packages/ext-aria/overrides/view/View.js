Ext.define('Ext.aria.view.View', {
    override: 'Ext.view.View',
    
    ariaRole: 'listbox',
    itemAriaRole: 'option',
    untitledText: 'Untitled List',

    initComponent: function() {
        var me = this,
            selModel;
        
        me.callParent(arguments);

        selModel = me.getSelectionModel();
        
        selModel.on({
            scope: me,
            select: me.ariaSelect,
            deselect: me.ariaDeSelect,
            focuschange: me.ariaFocusChanged
        });
        
        me.on({
            scope: me,
            viewready: me.ariaInitView,
            refresh: me.ariaInitViewItems,
            itemadd: me.ariaItemAdd,
            itemremove: me.ariaItemRemove
        });
    },

    ariaInitView: function() {
        var me = this,
            attrs, mode;
        
        attrs = me.ariaGetRenderAttributes();
        mode  = me.getSelectionModel().getSelectionMode();

        if (mode !== 'SINGLE') {
            attrs['aria-multiselectable'] = true;
        }

        if (me.title) {
            attrs['aria-label'] = me.title || me.untitledText;
        }
        
        me.ariaUpdate(me.ariaGetEl(), attrs);

        // Assign role=presentation to all elements without role in this view
        Ext.AriaSupport.assignDefaultRole(me.el);
    },

    ariaInitViewItems: function() {
        var me = this,
            updateSize = me.pageSize || me.store.buffered,
            pos = me.store.requestStart + 1,
            nodes, node, size, i, len;

        nodes = me.getNodes();
        size  = me.store.getTotalCount();

        for (i = 0, len = nodes.length; i < len; i++) {
            node = nodes[i];
            
            if (!node.id) {
                node.setAttribute('id', Ext.id());
            }
            
            node.setAttribute('role', me.itemAriaRole);
            node.setAttribute('aria-selected', false);

            if (updateSize) {
                node.setAttribute('aria-setsize', size);
                node.setAttribute('aria-posinset', pos + i);
            }
        }
        
        // Assign role=presentation to all elements without role in this view
        Ext.AriaSupport.assignDefaultRole(this.el);
    },

    processItemEvent: function(record, row, rowIndex, e) {
        var me = this;
        
        if (e.type == 'keydown' && (e.keyCode === Ext.EventObject.ENTER)) {
            me.fireEvent('itemclick', me, record, row, rowIndex, e);
        }
    },

    onBlur: function() {
        var me = this;
        
        me.ariaStepOut();
        me.callParent(arguments);
    },

    onFocus: function() {
        var me = this;
        
        me.callParent(arguments);
        
        if (me.hasFocus) {
            me.ariaStepIn();
        }
    },

    ariaStepOut: function() {
        var me = this,
            last;
        
        last = me.getSelectionModel().getLastFocused();

        if (last) {
            me.ariaRemoveFocus(me.getNode(last));
        }
    },

    ariaStepIn: function() {
        var me = this,
            last;
        
        last = me.getSelectionModel().getLastSelected();
        
        if (last) {
            me.ariaAddFocus(me.getNode(last));
        }
    },

    refresh: function() {
        var me = this;
        
        me.callParent(arguments);
        
        if (!me.isDestroyed && me.hasFocus) {
            me.focus();
        }
    },

    ariaSelect: function(selModel, record) {
        var me = this,
            node;
        
        node = me.getNode(record);
        node.setAttribute('aria-selected', true);
        
        me.ariaUpdate({ 'aria-activedescendant': node.id });
    },

    ariaDeSelect: function(selModel, record) {
        var me = this,
            node;
        
        node = me.getNode(record);
        node.removeAttribute('aria-selected');
        
        me.ariaUpdate({ 'aria-activedescendant': undefined });
    },

    ariaRemoveFocus: function(node) {
        if (node) {
            Ext.fly(node).removeCls(Ext.AriaSupport.ariaItemFocusCls);
        }
    },

    ariaAddFocus: function(node) {
        var me = this,
            curFocus;
        
        curFocus = Ext.DomQuery.selectNode('.' + Ext.AriaSupport.ariaItemFocusCls, me.el.dom);
        
        if (curFocus) {
            if (curFocus === node) {
                return;
            }
            
            Ext.fly(curFocus).removeCls(Ext.AriaSupport.ariaItemFocusCls);
        }
        
        if (node) {
            Ext.fly(node).addCls(Ext.AriaSupport.ariaItemFocusCls);
        }
    },

    ariaItemRemove: function(records, index, nodes) {
        if (!nodes) {
            return;
        }
        
        var me = this,
            ariaSelected, i, len;
        
        ariaSelected = me.el.getAttribute('aria-activedescendant');
        
        for (i = 0, len = nodes.length; i < len; i++) {
            if (ariaSelected === nodes[i].id) {
                me.ariaUpdate({ 'aria-activedescendant': undefined });
                
                break;
            }
        }
        
        if (me.hasFocus && me.getNodes().length > 1) {
            me.getSelectionModel().selectByPosition({
                row: index === 0 ? 0 : index - 1,
                column: 0
            });
        }
    },

    ariaItemAdd: function(records, index, nodes) {
        this.ariaInitViewItems(records, index, nodes);
    },

    setTitle: function(title) {
        var me = this;
        
        me.title = title;
        me.ariaUpdate({ 'aria-label': title });
    },

    ariaFocusChanged: function(selModel, oldFocus, newFocus) {
        var me = this,
            node;

        if (oldFocus) {
            node = me.getNode(oldFocus);
            me.ariaRemoveFocus(node);
        }
        
        if (newFocus) {
            node = me.getNode(newFocus);
            me.ariaAddFocus(node);
        }
    }

});
