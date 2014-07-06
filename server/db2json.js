exports.db2json = function(res) {
    return function(results) {
    	if (!results.map) {
    		res.json({
	    		success: true,
	    		results: [results.mapAttributes()]
	      	});
		} else {
	    	res.json({
	    		success: true,
	    		results: results.map(function(record) {
	        		return record.mapAttributes();
	      		})
	    	});
	    }
    }
}