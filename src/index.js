'use strict';

exports.handler  = (event, context, callback) => {
            
            	var https = require('https');
    			var options = {
			 	        host: process.env.site,
				        port: process.env.port,
				        path: process.env.path,
				        method: 'GET'
			    };
			    try {
		    	    var req = https.request(options, res => {
        			res.setEncoding('utf8');
		            var returnData = "";
		        	res.on('data', chunk => {
	                returnData = returnData + chunk;
	                  var response = {
                            	statusCode: 200,
                        	    headers: {
                    	          'Access-Control-Allow-Origin': '*', 
                	             },
							    body: returnData
	        	    	        }
							callback(null, response);
		        	}
    	            
        	        );
	
	    	  
      			  });
      			  req.end(); } 
      			  catch(e)
		            {
        		        console.log('Exception: '+e);
		                callback(false);
        		    }
}