var models = require('../models.js');

// flatten the bugs into the bits we want for this report
var userName = function(user) {
  if (user == null) return '';
  return user.name_first + ' ' + user.name_last
}

var processBug = function(result) {
  console.dir(result);
  return {
    summary: result.summary,
    assigned_to: userName(result.assignedTo),
    reported_by: userName(result.reportedBy),
    date_assigned: result.date_assigned,
    date_completed: result.date_completed,
    category: result.category.name,
    estimate: result.estimate
  }
}

exports.index = function(req,res) {
  models.Bug.findAll({
    include: [ 
      models.Category, 
      models.Importance,
      { model: models.User, as: 'assignedTo' },
      { model: models.User, as: 'reportedBy' } 
    ]
  })
    .success(function(results) {
      res.json({ 
        success: true,
        results: results.map(processBug)
      })
    });
}