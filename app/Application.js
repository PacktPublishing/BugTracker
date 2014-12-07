Ext.define('BugTracker.Application', {
    name: 'BugTracker',

    requires: [ 
        'Ext.util.History', 
        'BugTracker.proxy.BugTracker',
        'BugTracker.store.Categories', 
        'BugTracker.store.Users', 
        'BugTracker.view.Login', 
        'BugTracker.view.Viewport',
        'BugTracker.utils.Format',
        'Ext.state.LocalStorageProvider' ],

    extend: 'Ext.app.Application',

    views: [
        'BugGrid', 'CategoriesGrid', 'UserGrid', 'UserForm'
    ],

    controllers: [
        'Menu', 'Login', 'Main', 'Users', 'Charts', 'Category', 'Bug', 'Translation', 'Theme'
    ],

    stores: [
        'BugGrid', 'Categories', 'Importances', 'Users'
    ],

    init: function() {
        Ext.apply(Ext.data.validations, {
            customPassword: function(val, field) {
                return /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,50})/.test(val);
            },
            customPasswordText: 'Not a valid password. Length must be at least 8 characters and password must contain one digit, one lowercase letter, one uppercase and one special symbol (@#$%)'
        });

        var csrfToken = Ext.query('meta[name=csrf-token]')[0].getAttribute('content');
        Ext.Ajax.defaultHeaders = {
            'X-CSRF-Token': csrfToken
        };
        Ext.Ajax.extraParams = { '_csrf': csrfToken };
        
        // general error handling
        Ext.Ajax.on('requestexception', function(conn, response) {
            // if there is a proper message in the response, display it
            var obj = Ext.JSON.decode(response); 
            if (!obj.success && obj.message) {
                Ext.Msg.alert('Error', obj.message);
            }
        });

        if (window.backendUrl) {
            Ext.Ajax.on('beforerequest', function(conn, options, eOpts) {
                if (options.url.indexOf('://') == -1) {
                    options.url = window.backendUrl + options.url;
                }
            });
        }

        Ext.Ajax.cors = true;
        Ext.Ajax.withCredentials = true;
        
        Ext.QuickTips.init();
        //Ext.FocusManager.enable({focusFrame: true} );
        Ext.History.init();
        Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider());
    },

    launch: function() {
        //Ext.widget('login');
        Ext.create('BugTracker.view.Viewport')

        var me = this;
        var map = new Ext.util.KeyMap(document,[{
            key: 'n',
            ctrl: true,
            shift: true,
            handler: me.getController('Bug').newBug
        }]);
    }
    
});
