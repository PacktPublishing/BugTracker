// generate fake data
var models = require('./models'), 
	crypto = require('crypto'),
	Sequelize = require('Sequelize'), 
	_ = require('lodash');

// proporition of nullable things which will indeed be null
var NULL_PROPORTION = 0.2, earliest = new Date(), today = new Date(), aWeekAgo = new Date();


var chainer = new Sequelize.Utils.QueryChainer();

function identity(i) { 
	return i;
}

var makeLookup = function(key, values, mapper, chainer) {
	_.each(values, function(i) {
		chainer.add(models[key], 'create', [mapper(i)]);
	});
}

makeLookup('Menu', [
	{ id: 1, parent_id: null, text: 'Bugs', tooltip: 'Features relating to bugs', actionId: 'bugs', iconCls: 'bugs', resource_id: null},
	{ id: 2, parent_id: 1, text: 'List Bugs', tooltip: '', actionId: 'bugsList', iconCls: 'list', resource_id: null},
	{ id: 3, parent_id: 1, text: 'New Bug', tooltip: 'Create a new bug', actionId: 'bugsNew', iconCls: 'new', resource_id: null},
	{ id: 4, parent_id: 1, text: 'Report', tooltip: '', actionId: 'bugsReport', iconCls: 'report', resource_id: null},
	{ id: 5, parent_id: null, text: 'Calendar', tooltip: '', actionId: 'calendar', iconCls: 'calendar', resource_id: null},
], identity, chainer);

chainer
  	.runSerially()
  	.success(function() { console.log('done')})
  	.error(function(error) {
		console.log(error);
	});