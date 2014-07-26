Ext.define('BugTracker.controller.Maps', {
	extend: 'Ext.app.Controller',
	init: function() {
		this.control({
			'gmappanel': {
				mapready: this.onMapReady
			}
		});
	},
	onMapReady: function(panel, maps) {
		var me = this;
		this.geocoder = new google.maps.Geocoder();
		this.geocoder.geocode({
			address: 'Santa Clara Hilton'
		}, function(data, response) {
			panel.addMarker({
				position: data[0].geometry.location,
				title: 'Nearby Hotel'
			});
		});
	}

});