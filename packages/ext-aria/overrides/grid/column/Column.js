Ext.define('Ext.aria.grid.column.Column', {
    override: 'Ext.grid.column.Column',
    
    requires: [
        'Ext.aria.grid.header.Container'
    ],
    
    ariaRole: 'columnheader'
});
