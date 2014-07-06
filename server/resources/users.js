var db2json = require('../db2json').db2json
	,models = require('../models.js');
exports.index = function(req, res) {
  models.User.findAll().on('success', db2json(res))
};
exports.show = function(req, res) {
  models.User.find(req.params.user).on('success', db2json(res));
}

exports.create = function(req, res) {
	models.User.create(req).success(function(user){
		res.json({success: true});
	}).error(function() {
		res.json({success: false});
	});
}

exports.update = function(req, res) {
	models.User.find(req.params.user).success(function(user){
		delete req.body.password;
		delete req.body.id;
		user.updateAttributes(req.body)
			.success(function(user) {
			db2json(res)
		})
			.error(function() { 
			res.json({success: false});
		})
	})

}