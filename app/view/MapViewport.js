Ext.define('BugTracker.view.MapViewport', {
	extend: 'Ext.container.Viewport',
	requires: [
	'Ext.layout.container.Fit',
	'Ext.ux.GMapPanel',
	'BugTracker.view.GMap'
	],

	layout: {
		type: 'fit'
	},
	items: [{
		xtype: 'gmapheatpanel',
		center: {
			geoCodeAddr: 'Santa Clara Convention Center, Santa Clara, California'
		},
		markers: [{
			title: 'Sencha Con',
			lat: 37.404375,
			lng: -121.975405
		}],
		store: Ext.create('Ext.data.ArrayStore', { 
	      fields: [
	        { name: 'lat', type: 'float'},
	        { name: 'lng', type: 'float'} 
	      ],
	      data: function() {
	          var testData = []
	          for (var i = 0; i < 20; i++) {
	            testData.push([
	              (Math.random()-0.5) * 0.03 + 37.404375, 
	              (Math.random()-0.5) * 0.03 + -121.975405
	            ]);
	          }
	          return testData
	        }()
	      }
	    ),
		mapOptions: {
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
	}]
});