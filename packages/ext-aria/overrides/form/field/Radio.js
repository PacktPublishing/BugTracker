Ext.define('Ext.aria.form.field.Radio', {
    override: 'Ext.form.field.Radio',
    requires: 'Ext.aria.form.field.Checkbox',
    
    ariaRole:'radio',
    inputTypeAttr: 'radio', // needed for compatibility with 4.2.1

    onFocus: function(e) {
        var me = this;

        if (!e.ctrlkey) {
            me.setValue(true);
        }
        
        return me.callParent(arguments);
    }
});
