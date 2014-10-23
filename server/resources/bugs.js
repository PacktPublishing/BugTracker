var db2json = require('../db2json').db2json
	,models = require('../models.js')
	,_ = require('lodash');


var page = function(model, req, res, options) {
	var processExtSort = function(sort) {
		return sort.map(function(i) {
			if (i.property == 'reportedBy') return ['reportedBy.name_last', i.direction];
			if (i.property == 'assignedTo') return ['assignedTo.name_last', i.direction];
			return [i.property.replace(/_/, '.'), i.direction];
		});
	}
	var _options = options;
	if (req.query.sort) {
		_options = _.extend(_options, {
			offset: req.query.start,
			limit: req.query.limit,
			order: processExtSort(JSON.parse(req.query.sort))
		});
	}
	model.findAndCountAll(_options).on('success', db2json(res));
}

exports.index = {
	json: function(req, res) {
		page(models.Bug, req, res, { include: [ 
			models.Category, 
			models.Version,
			models.Importance,
			{ model: models.User, as: 'assignedTo' },
			{ model: models.User, as: 'reportedBy' } 
		] });
	},
	calendar: function(req, res) {
		res.type('json');
		var map_result = function(r) {
			return {
				id: r.id,
                cid: r.category_id,
                title: r.summary,
                start: r.createdAt,
                end: r.date_completed || new Date(),
                notes: r.description
			}
		};

		var format_calendar = function(results) {
			return res.json({
				success: true,
				results: results.map(map_result)
			});
		};

		models.Bug.findAll().then(format_calendar);
	}	
};

exports.show = function(req, res) {
	models.Bug.find({ 
		where: {id: req.params.bug }, 
		include: [ 
			models.Category, 
			models.Version,
			models.Importance,
			{ model: models.User, as: 'assignedTo' },
			{ model: models.User, as: 'reportedBy' } 
		] 
	}).on('success', function(result) {
		var bug = result.mapAttributes();
		// expand the objects, note that because of the eager loading above, this does not perform additional queries.
		bug.version = result.version.mapAttributes();
		bug.category = result.category.mapAttributes();
		bug.assigned_to = result.assignedTo.mapAttributes();
		bug.reported_by = result.reportedBy.mapAttributes();
		bug.importance = result.importance.mapAttributes();

		res.json({
    		success: true,
    		results: [bug]
	    });
	});
}

exports.create = function(req,res) {
	var body; 
	if (typeof(req.body) === 'array') {
		body = req.body[0]
	} else {
		body = req.body;
	}
	body.reported_by_id = 1
	models.Bug.create(body)
		.on('success', function(result) {
			res.json(201, {
				success: true,
				results: [result]
			});
		})
		.on('error', function(error) { 
			res.json(500, {
				success: false,
				message: error.code
			});
		})
}

exports.update = function(req,res) {
	models.Bug.find(req.params.bug)
		.on('success', function(result) {
			result.updateAttributes(req.body[0])
			result.save().on('success', function(returned) {
				res.json({
					success: true,
					results: [returned]
				});
			});
		});
}