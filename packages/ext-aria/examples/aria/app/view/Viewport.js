Ext.define('Aria.view.Viewport', {
    extend:'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Border',
        'Ext.tab.Panel',
        'Ext.form.Panel'
    ],

    layout:'border',

    initComponent:function () {
        var me = this;
        var num = 1;

        me.items = [{
            xtype:'container',
            region:'north',
            padding:'6 12',
            height:40,
            ariaRole:'region',
            title:'Header',
            layout:{
                align:'stretch',
                type:'hbox'
            },
            items:[{
                xtype:'container',
                html:'Ext JS Accessibility Demo'
            }, {
                xtype:'component',
                flex:3
            }, {
                xtype:'checkbox',
                boxLabel:'Aria Support',
                checked:true
            }]
        }, {
            xtype:'mysimpleform',
            ariaRole:'region',
            region:'west',
            split:true
        }, {
            xtype:'tabpanel',
            title:'Center Panel',
            region:'center',
            split:true,
            ariaRole:'region',
            layout:'fit',
            bodyStyle:'background:white',
            defaults:{
                padding:12,
                bodyStyle:'background:white'
            },
            items:[{
                xtype:'mysimplebuttons'
            }, {
                xtype:'mysimplepanel'
            }, {
                xtype:'mysimplelist'
            },  {
                xtype:'mysimplegrid'
            }, {
                xtype: 'container',
                title: 'Window',
                items: [{
                    xtype:'button',
                    text:'Open Window',
                    handler:function () {
                        var win = this.up('container').add(Ext.widget('mysimplewindow', {
                            title:'ARIA Window ' + num++
                        }));
                        win.showBy(this, 'tr', [num*20, num*20]);
                    }
                }]
            }, {
                xtype: 'mysimpleitemselector'
            }, {
                xtype: 'mysimpledatepicker'
            }, {
                xtype: 'mysimpletoolbar'
            }, {
                xtype: 'container',
                title: 'Image',
                
                items: [{
                    xtype: 'mysimpleimage'
                }]
            }]
        }];

        me.callParent(arguments);
    }

});