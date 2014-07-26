var page = require('webpage').create();
page.open('http://localhost:3000/simpleDashboard.html', function() {
  setTimeout( function() {
	page.render('out.pdf');
  	}, 5000);
phantom.exit();
});
