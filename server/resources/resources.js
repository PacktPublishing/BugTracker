var db2json = require('../db2json').db2json
	,models = require('../models.js');
// List all the resources for the given user
exports.index = function(req, res) {
	var filters = JSON.parse(req.query.filter);
	filters.forEach(function(filter) {
		if (filter['property']=="bugtracker.model.user_id") {
			user_id = filter['value'];
			// ensure this is the user that owns the session to prevent users asking about each other
			if (user_id != req.session.user_id) {
				res.json({success:false}, 403);
				return;
			} 
			// get the user roles and resources linked to those roles 
		  	models.User.find(user_id).success(function(user){ 
		  		user.getResources(function(error, results) {
		  			if (error) {
		  				res.json({ success: false }, 500);
		  			} else { 
		  				res.json({ success: true, results: results });
		  			}
		  		});
		  	});
		}
	});
};
