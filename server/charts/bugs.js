var Sequelize = require('Sequelize'),
	db = new Sequelize('BugTracker', 'root', null, { logging: console.log, dialect: 'mysql' }),
	_ = require('lodash');

var buildWrapperForExt = function(res, mapper) {
	return function(results) {
		res.json({
    		success: true,
    		results: mapper ? results.map(mapper) : results
	    });
	}
}

var queryToRes = function(sql,res,mapper) {
	db.query(sql, null, {raw: true})
		.then(buildWrapperForExt(res, mapper), function(err) { console.log(err); });
}

var bugsByCategory = function(req,res) {
	queryToRes('select c.name as category, count(b.id) as bugs, ifnull(o.open,0) as open \
		from categories c \
		left join bugs b on b.category_id = c.id \
		left join (select category_id, count(id) as open from bugs where date_completed is null) as o on o.category_id = c.id \
		group by c.name', res);


		
}

var bugsByCategoryByDay = function(req,res) {
	var sql = 'select c.name as category, weekday(b.createdAt) weekday, count(b.id) as bugs \
		from categories c \
		left join bugs b on b.category_id = c.id \
		group by c.name, weekday(b.createdAt)';

	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	db.query(sql, null, {raw: true})
		.then(function(results) {
			// pivot the results
			var output = {}
			results.forEach(function(el) {
				k = el.weekday;
				output[k] = output[k] || {};
				output[k]['weekday'] = days[k];
				output[k][el.category] = el.bugs;
			});
			return _.values(output);
		})
		.then(buildWrapperForExt(res, null), function(err) { console.log(err); });
}

var bugTimelineSQL = 'select date(a.createdAt) as created, count(a.id) bugs, count(b.id) as open \
from bugs a \
left join bugs b on b.id = a.id and b.date_completed is null \
group by date(a.createdAt) \
order by date(a.createdAt)';

var bugsByTime = function(req,res) {
	queryToRes(bugTimelineSQL, res);
}

var bugsCumulativeByTime = function(req,res) {
	var total = { bugs: 0, open: 0};
	queryToRes(bugTimelineSQL, res, function(i) {
		total.bugs += i.bugs;
		total.open += i.open;
		i.bugs_total = total.bugs;
		i.open_total = total.open;
		return i;
	});
}

var bugsProgress = function(req,res) {
	queryToRes('select 100 * (1 - count(o.id)/count(b.id)) as complete from bugs b left join bugs o on o.id = b.id and o.date_completed is null', res);
}

module.exports = { 
	bugsByCategory: bugsByCategory,
	bugsByTime: bugsByTime,
	bugsCumulativeByTime: bugsCumulativeByTime,
	bugsProgress: bugsProgress,
	bugsByCategoryByDay: bugsByCategoryByDay
}
