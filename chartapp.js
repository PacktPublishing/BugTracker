Ext.application({
    name: 'BugTracker',
    extend: 'BugTracker.ChartApplication',
    requires: ['BugTracker.ChartApplication','Ext.util.Point'],
    autoCreateViewport: false 
});