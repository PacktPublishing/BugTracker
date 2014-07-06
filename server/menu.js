var models = require('./models.js');

exports.get = function(req,res) {
	var parent_id = req.query.node || null;
	if (parent_id == 'NaN') parent_id = null;

	var format_results = function(results) {
		return res.json({
			id: 0,
			text: 'Menu',
			leaf: false,
			children: results
		});
	}
	// join it to the resources the user can access
	var menus = models.Menu.findAll({where: { parent_id: parent_id }})
		.then(format_results)
};