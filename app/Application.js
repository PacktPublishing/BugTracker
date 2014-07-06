Ext.define('BugTracker.Application', {
    name: 'BugTracker',

    requires: [ 'BugTracker.view.Login' ],

    extend: 'Ext.app.Application',

    views: [
        // TODO: add views here
    ],

    controllers: [
        'Menu', 'Login', 'Main', 'Users'
    ],

    stores: [
        // TODO: add stores here
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
        Ext.Ajax.on('requestexcpetion', function(conn, response) {
            // if there is a proper message in the response, display it
            var obj = Ext.JSON.decode(response); 
            if (!obj.success && obj.message) {
                Ext.Msg.alert('Error', obj.message);
            }
        });
        
        Ext.QuickTips.init();
    },

    launch: function() {
        Ext.widget('login');
    }
    
});
