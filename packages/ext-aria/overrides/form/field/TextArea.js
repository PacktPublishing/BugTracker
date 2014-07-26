Ext.define('Ext.aria.form.field.TextArea', {
    override: 'Ext.form.field.TextArea',
    
    requires: [
        'Ext.aria.form.field.Text'
    ],

    ariaGetRenderAttributes: function() {
        var attrs = this.callParent(arguments);
        
        attrs['aria-multiline'] = true;
        
        return attrs;
    }
});
