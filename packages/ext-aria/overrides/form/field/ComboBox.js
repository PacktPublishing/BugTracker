Ext.define('Ext.aria.form.field.ComboBox', {
    override: 'Ext.form.field.ComboBox',
    
    requires: [
        'Ext.aria.form.field.Picker'
    ],
    
    ariaRole: 'combobox',

    onBoxReady: function() {
        var me = this;
        
        me.callParent(arguments);

        // update aria-activedescendant whenever the picker highlight changes
        me.picker.on('highlightitem', me.ariaUpdateActiveDescendant, me);
    },

    ariaGetRenderAttributes: function() {
        var me = this,
            role = me.ariaRole,
            readOnly = me.readOnly,
            attrs, picker;
        
        picker = me.getPicker();

        // For a combobox assign the aria role to the parent container, not to the inputEl
        // As recommended by the Paciello group, assign readOnly to the parent 
        // as well as the text box element to make a distinction between readOnly and not editable
        me.ariaUpdate(me.triggerWrap, {
            role: role,
            'aria-readonly': readOnly
        });

        // Temporarily set the role to none so that it does not get included in the list to be assigned to inputEl
        me.ariaRole = '';
        attrs = me.callParent(arguments);
        me.ariaRole = role;

        // These will be assigned to the inputEl (textbox)
        attrs['aria-readonly'] = !me.editable || readOnly;
        attrs['aria-haspopup'] = true;
        attrs['aria-autocomplete'] = "list";
        attrs['aria-owns'] = picker.id;

        return attrs;
    },

    setReadOnly: function(readOnly) {
        var me = this;
        
        me.callParent(arguments);
        me.ariaUpdate(me.triggerWrap, { 'aria-readonly': me.readOnly });
    },

    setEditable: function(editable) {
        var me = this;
        
        me.callParent(arguments);
        me.ariaUpdate({ 'aria-readonly': !me.editable });
    },

    onExpand: function() {
        var me = this,
            selected = me.picker.getSelectedNodes();

        me.callParent(arguments);
        me.ariaUpdate({
            'aria-expanded': true,
            'aria-activedescendant': (selected.length ? selected[0].id : undefined)
        });
    },

    onCollapse: function() {
        var me = this;

        me.callParent(arguments);
        me.ariaUpdate({
            'aria-expanded': false,
            'aria-activedescendant': undefined
        });
    },

    ariaUpdateActiveDescendant: function(list) {
        this.ariaUpdate({
            'aria-activedescendant': list.highlightedItem ? list.highlightedItem.id : undefined
        });
    }
});
