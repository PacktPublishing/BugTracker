exports.db2json = function(res) {
    return function(results) {
    	if (results.count) {
    		res.json({
    			success: true,
    			total: results.count,
    			results: results.rows
    		});
    	} else {

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
}