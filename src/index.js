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
	                
	                var wpjson =  JSON.parse(returnData)
	                
	                var urlPattern = /<source\s+[^>]*?src=("|')([^"']+)\1/g
	                		   var uid = 'vd'+wpjson[0].id;
	                		   var titleText = JSON.parse(JSON.stringify(wpjson[0].title))
                  		       var excerpt = JSON.parse(JSON.stringify(wpjson[0].excerpt))
                  		       var content = JSON.parse(JSON.stringify(wpjson[0].content))
                  		       var url = JSON.parse(JSON.stringify(wpjson[0].link))
                  		       var updateDate = wpjson[0].date_gmt+".0Z"
		                	   var mp3 =  urlPattern.exec(content.rendered)
		                	   if (mp3!==null) { 
		                	   	  mp3 = mp3 [2]
		                	   } 
	                		    
	               var sendjson ={
  
                                "uid": uid,
                                "updateDate": updateDate,
                                "titleText": titleText.rendered,
                                "mainText": excerpt.rendered,
                                "streamUrl":mp3,
                                "redirectionUrl": url
     
                    }
    
	                
	               
	                
	                const response = {
                            	statusCode: 200,
                        	    headers: {
                    	          'Access-Control-Allow-Origin': '*', 
                	             },
							    body: JSON.stringify(sendjson)
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