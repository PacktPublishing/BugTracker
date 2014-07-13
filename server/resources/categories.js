var db2json = require('../db2json').db2json
	,models = require('../models.js');
exports.index = function(req, res) {
  models.Category.findAll().on('success', db2json(res));
};

exports.calendars = function(req, res) {
	var mapResults = function(results) {
		return res.json({
			success: true,
			results: results.map(function(i){
				return {
					id: i.id,
					name: i.name
				};
			})
		});
	}
	models.Category.findAll().then(mapResults);
};
exports.show = function(req, res) {
	models.Category.find({ 
		where: {id: req.params.category }
	}).on('success', function(result) {
		var category = result.mapAttributes();
		res.json({
    		success: true,
    		results: [category]
	    });
	});
}