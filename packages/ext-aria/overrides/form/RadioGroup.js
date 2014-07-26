Ext.define('Ext.aria.form.RadioGroup', {
    override: 'Ext.form.RadioGroup',
    
    requires: [
        'Ext.aria.form.CheckboxGroup'
    ],
    
    ariaRole: 'radiogroup',

    ariaGetRenderAttributes: function() {
        var me = this,
            radios, attrs, i, len;
        
        attrs = me.callParent(arguments);

        attrs['aria-required'] = !me.allowBlank;

        radios = me.getRefItems();

        for (i = 0, len = radios.length; i < len; i++) {
            radios[i].isGroupedBy = me;
        }

        if (me.labelEl) {
            attrs['aria-labelledby'] = me.labelEl.id;
        }
        
        return attrs;
    },

    ariaGetFocusItems: function(e) {
        var me = this,
            radios, radio, len, i, radio;
        
        radios = me.getRefItems();
        len = radios.length;

        // When a radio group gets focus it should pass it to
        // the radio button that is checked or the last focused one or the first one
        for (i = 0; i < len; i++) {
            radio = radios[i];
            
            if (radio.hasFocus) {
                return [radio];
            }
        }
        
        for (i = 0; i < len; i++) {
            radio = radios[i];
            
            if (radio.checked) {
                return [radio];
            }
        }
        
        if (me.lastFocus && me.lastFocus.isFocusable()) {
            return [me.lastFocus];
        }

        if (radios.length > 0) {
            return [radios[0]];
        }
    },

    ariaGetEl: function() {
        return this.getTargetEl();
    }
});
