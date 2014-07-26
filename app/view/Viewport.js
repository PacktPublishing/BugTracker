Ext.define('BugTracker.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Fit',
        'BugTracker.view.Main'
    ],

    layout: {
        type: 'fit'
    },
    ariaRole: 'application',
    
    items: [{
        xtype: 'app-main'
    }]
});
