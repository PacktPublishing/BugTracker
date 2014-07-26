Ext.define('Ext.aria.menu.KeyNav', {
    override: 'Ext.menu.KeyNav',
    
    focusNextItem: function(step) {
        var menu = this.menu,
            focusedItem = menu.focusedItem,
            count = 0,
            items, startIdx, idx, len, item;
        
        items    = menu.query(':focusable');
        startIdx = focusedItem ? Ext.Array.indexOf(items, focusedItem) : -1;
        idx      = startIdx + step;
        len      = items.length;
        
        while (count < len && idx !== startIdx) {
            if (idx < 0) {
                idx = len - 1;
            }
            else if (idx >= len) {
                idx = 0;
            }
            
            item = items[idx];
            
            if (menu.canActivateItem(item)) {
                menu.setActiveItem(item);
                break;
            }
            
            idx += step;
            ++count;
        }
    }
});
