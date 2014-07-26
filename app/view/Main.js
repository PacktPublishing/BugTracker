Ext.define('BugTracker.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'BugTracker.view.Menu'
        
    ],
    
    xtype: 'app-main',

    layout: {
        type: 'border'
    },

    items: [{
        region: 'west',
        xtype: 'treemenu',
        title: 'Menu',
        width: 250
    },{
        region: 'center',
        xtype: 'tabpanel',
        itemId: 'main',
        ariaRole: 'region',
        items:[]
    }],

    initComponent: function() {
        this.callParent()
        var grid = Ext.ComponentQuery.query('tabpanel')[0].add(Ext.create('BugTracker.view.BugMasterDetail',{ title: 'bugs'}))
        grid.down('bugmaster').getStore().load()
        grid.show()
    }
});