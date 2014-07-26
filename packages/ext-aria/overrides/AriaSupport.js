/**
 * This class supplies accessibility support according to WAI ARIA practices.
 *
 * Assumptions:
 *
 *  * To add ARIA support to an application the developer must add 'Ext.aria.AriaSupport'
 *    to the requires statement of the application and call Ext.AriaSupport.enable() in
 *    the launch method of the application.
 *  * Every application needs to have a top most container with role 'application'
 *    [ariaRole='application'], which will receive the initial focus. If none is specified,
 *    by default the viewport will be assigned the role 'application'.
 *  * The application should be divided into focus sections by assigning the role 'region'
 *    to containers [ariaRole='region'].
 * 
 * Focus moves amongst sections via the Tab key.
 * In order to navigate the children of a section Enter/Space should be pressed.
 * In order to move the focus from a child to a section Esc should be pressed.
 */
Ext.define('Ext.aria.AriaSupport', {
    alternateClassName: ['Ext.AriaSupport'],
    singleton: true,

    requires: [
        'Ext.tip.QuickTip'
    ],

    sectionContainers: {
        region: true, 
        dialog: true,
        alertdialog: true,
        document: true,
        application: true
    },

    excludeElementRoleList: {
        label: true,
        input: true
    },

    ariaFocusCls: Ext.baseCSSPrefix + 'aria-focus',
    ariaItemFocusCls: Ext.baseCSSPrefix + 'aria-item-focus',

    enable: function(showFocusFrame) {
        var me = this;
        
        // Let the aria FocusManager take over the Ext.FocusManager singleton object
        Ext.FocusManager = Ext.aria.FocusManager;
        Ext.FocusManager.enable(showFocusFrame);

        if (Ext.isWindows) {
            Ext.AriaSupport.initHighContrastMode();
        }

        // create a tool tip to show tooltips and validation errors
        // ARIA requires that these tips  pop up when the field receives focus
        me.tip = Ext.create('Ext.tip.QuickTip', {
            ui: 'form-invalid',
            autoHide: false,
            header: false,
            html: "errors",
            onDocMouseDown: Ext.emptyFn
        });
    },

    isSection: function(role) {
        return this.sectionContainers[role];
    },

    // Except labels, assign the role presentation to html elements that are not assigned one
    assignDefaultRole: function(parentEl) {
        var me = this,
            excludeList = me.excludeElementRoleList,
            noRoleItems, item, tag, i, len;
        
        noRoleItems = Ext.DomQuery.select(':not([role])', parentEl.dom);
        
        if (!parentEl.getAttribute('role')) {
            noRoleItems.push(parentEl.dom);
        }
        
        for (i = 0, len = noRoleItems.length; i < len; i++) {
            item = Ext.fly(noRoleItems[i]);
            tag  = item.getAttribute('nodeName').toLowerCase();
            
            if (!excludeList[tag]) {
                item.set({ role: 'presentation' });
            }
        };
    },

    showErrorTip: function(field) {
        var tip = this.tip,
            errors = field.getActiveErrors(),
            errorText;

        if (errors.length === 0) {
            return;
        }
        
        errorText = field.getTpl('activeErrorsTpl').apply({
            errors:errors,
            listCls: Ext.plainListCls
        });
        
        tip.update(errorText);
        
        if (!tip.isVisible() || tip.ownerField != field) {
            // errorEl is null when field has msgTarget === 'qtip'
            if (field.errorEl) {
                tip.showAt(field.errorEl.getXY());
            }
            else {
                tip.showBy(field, 'tl-tr?');
            }
        }
        
        tip.ownerField = field;
    },

    hideErrorTip: function(field) {
        var tip = this.tip;

        if (tip.isVisible() && tip.ownerField === field) {
            tip.hide();
            tip.ownerField = null;
        }
    },

    updateErrorTip: function(field) {
        var me = this,
            tip = me.tip,
            errors;

        if (!tip.isVisible() || tip.ownerField === field) {
            errors = field.getActiveErrors();
            
            if (tip.isVisible() && errors.length === 0) {
                me.hideErrorTip(field);
            }
            else if (errors.length > 0) {
                me.showErrorTip(field);
            }
        }
    },

    getErrorTipOwner: function() {
        var tip = this.tip;
        
        if (tip.isVisible()) {
            return tip.ownerField;
        }
        
        return null;
    },

    initHighContrastMode: function() {
        /* Absolute URL for test image
         * (data URIs are not supported by all browsers, and not properly removed when images are disabled in Firefox) */
        var imgSrc = "http://www.html5accessibility.com/tests/clear.gif",
            AriaSupport = Ext.aria.AriaSupport,
            div = document.createElement("div"),
            divEl = Ext.get(div),
            divStyle = div.style,
            img = document.createElement("img");

        /* set defaults */
        AriaSupport.images = AriaSupport.backgroundImages = AriaSupport.borderColors = true;
        AriaSupport.highContrastMode = AriaSupport.lightOnDark = false;

        /* create div for testing if high contrast mode is on or images are turned off */
        div.id = "ui-helper-high-contrast";
        div.className = "ui-helper-hidden-accessible";
        divStyle.borderWidth = "1px";
        divStyle.borderStyle = "solid";
        divStyle.borderTopColor = "#F00";
        divStyle.borderRightColor = "#FF0";
        divStyle.backgroundColor = "#FFF";
        divStyle.width = "2px";

        /* For IE, div must be wider than the image inside it when hidden off screen */
        img.alt = "";
        div.appendChild(img);
        document.body.appendChild(div);
        divStyle.backgroundImage = "url(" + imgSrc + ")";

        img.src = imgSrc;

        var getColorValue = function (colorTxt) {
            var values = [], colorValue = 0, match;
            if (colorTxt.indexOf("rgb(") != -1) {
                values = colorTxt.replace("rgb(", "").replace(")", "").split(", ");
            }
            else if (colorTxt.indexOf("#") != -1) {
                match = colorTxt.match(colorTxt.length == 7 ? /^#(\S\S)(\S\S)(\S\S)$/ : /^#(\S)(\S)(\S)$/);
                if (match) {
                    values = [ "0x" + match[1], "0x" + match[2], "0x" + match[3]];
                }
            }
            for (var i = 0; i < values.length; i++) {
                colorValue += parseInt(values[i]);
            }
            return colorValue;
        }

        var performCheck = function (event) {
            var bkImg = divEl.getStyle("backgroundImage"),
                body = Ext.getBody();

            AriaSupport.images = img.offsetWidth == 1;
            AriaSupport.backgroundImages = !( bkImg != null && ( bkImg == "none" || bkImg == "url(invalid-url:)" ));
            AriaSupport.borderColors = !(divEl.getStyle("borderTopColor") == divEl.getStyle("borderRightColor"));
            AriaSupport.highContrastMode = !Ext.aria.AriaSupport.images || !Ext.aria.AriaSupport.backgroundImages;
            AriaSupport.lightOnDark = getColorValue(divEl.getStyle("color")) - getColorValue(divEl.getStyle("backgroundColor")) > 0;

            if (AriaSupport.highContrastMode) {
                body.addCls("x-aria-highcontrast");
            }
            if (Ext.isIE) {
                div.outerHTML = "";
                /* prevent mixed-content warning, see http://support.microsoft.com/kb/925014 */
            } else {
                document.body.removeChild(div);
            }
        };

        performCheck();
    }
});
