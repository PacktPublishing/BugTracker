/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

Ext.application({
    name: 'Aria',

    views: [
        'Buttons',
        'DatePicker',
        'Form',
        'Grid',
        'Image',
        'ItemSelector',
        'List',
        'Panel',
        'Toolbar',
        'Viewport',
        'Window'
    ],

    autoCreateViewport: true,
    
    launch: function() {
        Ext.AriaSupport.enable(true);
    },

    msg: function(title, format) {
        var msgCt = this.msgCt;
        
        if (!msgCt) {
            this.msgCt = msgCt = Ext.DomHelper.insertFirst(document.body, {
                id: 'msg-div',
                role: 'alert',
                style: "position:absolute; left: 50%; top:0; margin-left:-200px; z-index:42000; width:400px; height:200px;"
            }, true);
        }
        var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1)),
            box = '<div style="display:none;background:white; color: black; padding: 12px;border:1px solid #ddd;border-radius:1em"><h3>' + title + '</h3><p>' + s + '</p></div>',
            m = Ext.DomHelper.append(msgCt, box, true);
        
        msgCt.setVisible(true);

        m.slideIn('t').ghost("t", {
            delay: 1500,
            remove: true,
            callback: function() {
                msgCt.setVisible(false);
            }
        });
    }
});
