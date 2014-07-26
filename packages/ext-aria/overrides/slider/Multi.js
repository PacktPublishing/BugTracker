Ext.define('Ext.aria.slider.Multi', {
    override: 'Ext.slider.Multi',
    
    ariaGetRenderAttributes: function() {
        attrs = this.callParent();
        
        // Slider fields should be focusable
        if (!('tabIndex' in attrs)) {
            attrs.tabIndex = 0;
        }
        
        return attrs;
    },
    
    onKeyDown: function(e) {
        var me = this,
            key, value;
        
        if (me.disabled || me.thumbs.length !== 1) {
            e.preventDefault();
            
            return;
        }
        
        key = e.getKey();
        
        switch (key) {
            case e.HOME:
                e.stopEvent();
                me.setValue(0, me.minValue, undefined, true);
                return;
            
            case e.END:
                e.stopEvent();
                me.setValue(0, me.maxValue, undefined, true);
                return;
            
            case e.PAGE_UP:
                e.stopEvent();
                value = me.getValue(0) - me.keyIncrement * 10;
                me.setValue(0, value, undefined, true);
                return;
            
            case e.PAGE_DOWN:
                e.stopEvent();
                value = me.getValue(0) + me.keyIncrement * 10;
                me.setValue(0, value, undefined, true);
                return;
        }
        
        me.callParent(arguments);
    }
});
