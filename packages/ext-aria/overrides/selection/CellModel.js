Ext.define('Ext.aria.selection.CellModel', {
    override: 'Ext.selection.CellModel',

    onKeyTab: function(e, t) {
        var me = this,
            pos, editingPlugin;
        
        pos = me.getCurrentPosition();

        if (pos) {
            editingPlugin = pos.view.editingPlugin;
            
            // If we were in editing mode, but just focused on a non-editable cell, behave as if we tabbed off an editable field
            if (editingPlugin && me.wasEditing) {
                //me.onEditorTab(editingPlugin, e);
                me.wasEditing = false;
            }
        }
        
        // Let the key tab bubble up
        return true;
    }
});
