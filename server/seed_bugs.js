// generate fake data
var Faker = require('faker'), 
	models = require('./models'), 
	async = require('async'), 
	crypto = require('crypto'),
	Sequelize = require('Sequelize'),
	_ = require('underscore'), 
	Q = require('q');

// proporition of nullable things which will indeed be null
var NULL_PROPORTION = 0.5, earliest = new Date(), today = new Date(), aWeekAgo = new Date();
aWeekAgo.setDate(today.getDate() - 7);
earliest.setDate(today.getDate() - 50);

function identity(i) { 
	return i;
}

function makeStorer(name, callback) {
	return function(err, results) {
		if (!err) {
			if (!allItems[name]) allItems[name] = [];
			allItems[name].push(results);
		}
		callback(err, results);
	}
}

var nullCallback = function(error, results) {}

function randomText(words) {
	return Faker.lorem.words(Math.round(words)).join(' ');
}

function randomIdFrom(items) {
	var i = Math.floor(Math.random() * items.length) ;
	return items[i].dataValues.id;
}
function randomIdFromOrNull(items) {
	if (Math.random() < NULL_PROPORTION) return null;
	return randomIdFrom(items);
}

function randomDate(start, end) { 
	var copy = new Date();
	copy.setTime((Math.random() * (end.getTime() - start.getTime())) + start.getTime());
	return copy;
}
function randomDateOrNull(start, end) {
	if (Math.random() < NULL_PROPORTION) return null;
	return randomDate(start, end);
}

function randomBug(callback, chainer, allItems) {
	// random date in past
	var created = randomDate(earliest, aWeekAgo);
	var assigned = randomDate(created, today);
	var completed = randomDateOrNull(assigned, today);

	var assigned_to_id = randomIdFromOrNull(allItems.User);

	var bug = {
		summary: randomText(10),
		description: randomText(Math.random() * 200), 
		category_id: randomIdFrom(allItems.Category),
		os_id: randomIdFrom(allItems.Os),
		version_id: randomIdFrom(allItems.Version),
		importance_id: randomIdFrom(allItems.Importance),
		reported_by_id: randomIdFrom(allItems.User),
		assigned_to_id: assigned_to_id,
		date_assigned: assigned,
		date_completed: completed,
		updatedAt: today,
		estimate: (assigned_to_id ? Math.floor(Math.random() * 10) : null) 
	};
	var dao = models.Bug.build(bug);
	dao.dataValues.createdAt = created;
	chainer.add(dao.save());
	callback();
}

var makeLookup = function(key, values, mapper, chainer) {
	_.each(values, function(i) {
		chainer.add(models[key], 'create', [mapper(i)]);
	});
}

var chainer = new Sequelize.Utils.QueryChainer();

chainer
	.add(models.db, 'query', ["drop table if exists roles_resources"])
	.add(models.db, 'query', ["drop table if exists users_roles"])
	.add(models.Bug, 'drop')
	.add(models.User, 'drop')
	.add(models.Group, 'drop')
	.add(models.Menu, 'drop')
	.add(models.Resource, 'drop')

_.each([
	models.Category, 
	models.Version, 
	models.Importance, 
	models.Group, 
	models.Role, 
	models.User, 
	models.Resource, 
    models.RolesResources,
    models.UsersRoles,
	models.Os, 
	models.Bug,
	models.Menu
	], function(i) {
	chainer.add(i, 'sync', [{force: true}]);
});

_.map({ 
	Category: ['Blocker','Bug','Improvement'],
	Os: ['Windows 7','Mac OS X','Linux'],
	Importance: ['Critical', 'Urgent', 'Normal', 'Low'],
	Group: ['Administrators', 'Users', 'Developers'],
	Role: ['Administrator', 'Manager', 'User', 'Power User'],
	//Resource: ['UserGrid','UserForm'],
	
}, function(values,key) {
	makeLookup(key, values, function(i) { return { name: i }; }, chainer);
});
makeLookup('Version', [
	{ name: 'Sparkly', release_date: new Date(2013,11,5)}, 
	{ name: 'Spangly', release_date: new Date(2013,6,18)}, 
	{ name: 'Dusty', release_date: new Date(2012,8,14)}
], identity, chainer);

makeLookup('Menu', [
	{ id: 1, parent_id: null, text: 'Bugs', tooltip: 'Features relating to bugs', actionId: 'bugs', iconCls: 'bugs', resource_id: null},
	{ id: 2, parent_id: 1, text: 'List Bugs', tooltip: '', actionId: 'bugsList', iconCls: 'list', resource_id: null},
	{ id: 3, parent_id: 1, text: 'New Bug', tooltip: 'Create a new bug', actionId: 'bugsNew', iconCls: 'new', resource_id: null},
	{ id: 4, parent_id: 1, text: 'Report', tooltip: '', actionId: 'bugsReport', iconCls: 'report', resource_id: null},
	{ id: 5, parent_id: null, text: 'Calendar', tooltip: '', actionId: 'calendar', iconCls: 'calendar', resource_id: null},
].map(function(i) { i.cls = i.iconCls; return i}), identity, chainer);
 
chainer
  	.runSerially()
  	.success(function() {
		models.Group.findAll().then(
			function(groups) {
				var chainer = new Sequelize.Utils.QueryChainer();
                makeLookup('User', ['a'], function(user) {
                    var a = {
							name_first: user,
							name_last: user,
							email: user,
							group_id: 1,
							password: crypto.createHash('md5').update('a').digest('hex')
						};
						return a;
                }, chainer);
				makeLookup('User', [{
					name_first: 'Simon',
					name_last: 'Elliston Ball',
					email: 'simon@simonellistonball.com',
					group_id: 1,
					password: crypto.createHash('md5').update('a').digest('hex')
				}, 1,2,3,4,5,6,7,8,9,10],
					function(user) {
						if (typeof(user) === 'number') {
							return {
								name_first: Faker.name.firstName(),
								name_last: Faker.name.lastName(),
								email: Faker.internet.email(),
								group_id: randomIdFrom(groups),
								password: crypto.createHash('md5').update('a').digest('hex')
							}
						} else {
							return user;
						}
					}, chainer);
				chainer.runSerially().error(function(error) { console.log('error with users', error) })
			}).then(function() {
				var deps = ['Category', 'Version', 'Os', 'Importance', 'User'];
				chainer = new Sequelize.Utils.QueryChainer();
				_.each(deps, function(i) {
					chainer.add(models[i], 'findAll')
				});

				chainer.runSerially().success(function(results) {
					var items = {}
					for (i in results) {
						items[deps[i]] = results[i];
					}	
					bugChain = new Sequelize.Utils.QueryChainer();
					for(var i = 0; i < 100; i++) {
						randomBug(function() {}, bugChain, items);
					};
					bugChain.run().success(function(results) { }).error(function(error) { console.dir(error) });
				}).error(function(error) {
					console.log('Error making bugs', error);
				});
		});

	}).error(function(error) {
		console.log(error);
	});