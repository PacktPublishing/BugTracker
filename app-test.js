Ext.require('BugTracker.Application');

var Application = null;
Ext.onReady(function() {
    Application = Ext.application('BugTracker.Application', {
        name: 'BugTracker',
        controllers: ['Bug']
    });
});
