Ext.define('Ext.aria.form.field.Text', {
    override: 'Ext.form.field.Text',
    
    requires: [
        'Ext.aria.form.field.Base'
    ],
    
    ariaRole: 'textbox'
});
