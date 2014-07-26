Ext.define('Ext.aria.form.FieldContainer', {
    override: 'Ext.form.FieldContainer',
    
    requires: [
        'Ext.aria.container.Container'
    ],
    
    ariaRole: 'group',

    ariaGetEl: function() {
        return this.getTargetEl();
    },

    ariaGetRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent(arguments);

        if (me.labelEl) {
            attrs['aria-labelledby'] = me.labelEl.id;
        }

        return attrs;
    }
});
