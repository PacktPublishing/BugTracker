Ext.define('BugTracker.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'BugTracker.view.Menu',
        'BugTracker.view.LanguageChooser'
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
    }, {
        region: 'north',
        xtype: 'toolbar', 
        height: 36,
        items: [{
            xtype: 'button',
            text: 'New Bug',
            itemId: 'btnNewBug',
            iconCls: 'newBug',
        }, {
            xtype: 'textfield',
            emptyText: 'Search',
            width: 280
        }, '->', {
            xtype: 'languageChooser',
            value: 'en'
        }, {
            xtype: 'button',
            text: 'Logout',
            iconCls: 'logout'
        }]
    }],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: []
    }],

    initComponent: function() {
        this.callParent()
        var grid = Ext.ComponentQuery.query('tabpanel')[0].add(Ext.create('BugTracker.view.BugMasterDetail',{ title: 'bugs'}))
        grid.down('bugmaster').getStore().load()
        grid.show()
    }
});