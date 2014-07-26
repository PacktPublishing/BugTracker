Ext.define('Ext.aria.form.field.Base', {
    override: 'Ext.form.field.Base',
    
    requires: ['Ext.aria.Component'],
    
    msgTarget: 'side', // use this scheme because it is the only one working for now
    ariaRole: '',

    ariaGetEl: function() {
        return this.inputEl;
    },

    ariaGetRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent(arguments);

        if (me.labelEl) {
            attrs['aria-labelledby'] = me.labelEl.id;
        }
        
        attrs['aria-readonly'] = me.readOnly;
        
        if (me.allowBlank !== undefined) {
            attrs['aria-required'] = !me.allowBlank;
        }
        
        return attrs;
    },

    setReadOnly: function(readOnly) {
        var me = this;
        
        me.callParent(arguments);
        
        me.ariaUpdate({ 'aria-readonly': readOnly });
    },

    markInvalid: function(f, isValid) {
        var me = this;
        
        me.callParent(arguments);
        
        me.ariaUpdate({
            'aria-invalid': true,
            'aria-describedby': me.errorEl ? me.errorEl.id : undefined
        });
    },

    clearInvalid: function() {
        var me = this;
        
        me.callParent(arguments);
        
        me.ariaUpdate({
            'aria-invalid': false,
            'aria-describedby': undefined
        });
    },

    onFocus: function() {
        var me = this,
            errorTipOwner = Ext.AriaSupport.getErrorTipOwner();

        // Hide previously shown error tip
        if (errorTipOwner && errorTipOwner !== me) {
            Ext.AriaSupport.hideErrorTip(errorTipOwner);
        }

        me.callParent();
        
        //  Validate the field so it shows its error (if any) when it gets focus
        if (me.hasActiveError()) {
            me.isValid();
        }
    },

    onBlur: function() {
        var me = this;
        
        Ext.AriaSupport.hideErrorTip(me);
        
        me.blurring = true;
        me.callParent();
        me.blurring = false;
    },

    isValid: function () {
        var me = this,
            result;
        
        result = me.callParent(arguments);

        // If the field has focus keep updating the error as the user changes the value (calling isValid)
        if (me.hasFocus && !me.blurring) {
            Ext.AriaSupport.updateErrorTip(me);
        }
        
        return result;
    }
});
