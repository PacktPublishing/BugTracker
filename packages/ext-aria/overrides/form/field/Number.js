Ext.define('Ext.aria.form.field.Number', {
    override: 'Ext.form.field.Number',
    
    requires: [
        'Ext.aria.form.field.Spinner'
    ],

    ariaGetRenderAttributes: function() {
        var me = this,
            attrs, v;
        
        attrs = me.callParent(arguments);
        v = me.getValue();

        attrs['aria-valuemin'] = isFinite(me.minValue) ? me.minValue : 'NaN';
        attrs['aria-valuemax'] = isFinite(me.maxValue) ? me.maxValue : 'NaN';
        attrs['aria-valuenow'] = v !== null && isFinite(v) ? v : 'NaN';

        return attrs;
    },

    onChange: function (f) {
        var me = this,
            v;

        me.callParent(arguments);
        
        v = me.getValue();
        me.ariaUpdate({
            'aria-valuenow': v !== null && isFinite(v) ? v : 'NaN'
        });
    },

    setMinValue: function() {
        var me = this;
        
        me.callParent(arguments);
        me.ariaUpdate({ 'aria-valuemin': me.minValue });
    },

    setMaxValue: function() {
        var me = this;
        
        me.callParent(arguments);
        me.ariaUpdate({ 'aria-valuemax': me.maxValue })
    }
});