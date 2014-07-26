Ext.define('Ext.aria.form.field.Checkbox', {
    override: 'Ext.form.field.Checkbox',
    requires: 'Ext.aria.form.field.Base',
    
    ariaRole: 'checkbox',
    isFieldLabelable: false,
    hideLabel: true,
    inputTypeAttr: 'checkbox', // needed for compatibility with 4.2.1

    getSubTplData: function() {
        var me = this,
            data;
        
        data = me.callParent();
        
        return Ext.apply(data, {
            inputAttrTpl: me.checked ? 'checked' : ''
        });
    },

    ariaGetRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent(arguments);
        attrs['aria-checked'] = me.getValue();
        
        return attrs;
    },

    onChange: function() {
        var me = this,
            isChecked;

        me.callParent(arguments);
        isChecked = me.getValue();
        
        me.inputEl.dom.checked = isChecked;
        me.ariaUpdate({
            'aria-checked': isChecked
        });

        if (isChecked && me.isGroupedBy) {
            me.isGroupedBy.ariaUpdate({
                'aria-activedescendant': me.el.id
            });
        }
    },

    onBoxReady: function() {
        var me = this;
        
        me.callParent(arguments);

        // The screen reader will not announce the boxLabel if there is a fieldLabel
        if (me.boxLabelEl || !me.fieldLabel) {
            me.labelEl.set({ 'for': undefined });
        }
    }
});