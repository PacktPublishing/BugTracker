Ext.define('BugTracker.view.GMap', {
	extend: 'Ext.ux.GMapPanel', 
	alias: 'widget.gmapheatpanel',

	initComponent: function() {
		this.callParent();
		this.on('mapready', function(map) {
			this.store.load();
		});

		// the store will contain the heat map data
		this.store.on('load', function(store) {
			var data = store.data.items.map(function(record) {
				return new google.maps.LatLng(record.get('lat'), record.get('lng'))
			});

			var pointArray = new google.maps.MVCArray(data);
			this.heatmap = new google.maps.visualization.HeatmapLayer({
				data: pointArray,
				radius: 60
			});
			this.heatmap.setMap(this.gmap);
		}, this);
	}
});