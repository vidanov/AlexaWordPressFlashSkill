/*
Author: Alexey Vidanov vidanov.com
Version: 1.1

You need REST API in WordPress (Jetpack Plugin)
You can use the excerpt field for TTS in Alexa
or put MP3 in the content part to play
*/

'use strict';
exports.handler  = (event, context, callback) => {
    var protocol = 'http';
    if (process.env.port == 443) {
        protocol='https';
    }
	var https = require(protocol);
	var options = {
		host: process.env.site,  //sample.com
		port: process.env.port, // 443 and 80 both are possible, if you use other ports 
								// please change the code above for the correct protocol  if (process.env.port == 443) {
		path: process.env.path, // wp-json/wp/v2/posts?per_page=1&category=
		method: 'GET'
	};
	try {
		var req = https.request(options, res => {
        	res.setEncoding('utf8');
			var returnData = "";
			res.on('data', chunk => {
					returnData = returnData + chunk;
			})
		
			res.on('end', chunk => {
				var wpjson =  JSON.parse(returnData)
				console.log( wpjson)
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
					headers: {'Access-Control-Allow-Origin': '*', 'Content-Type':'application/json', 'charset':'utf-8'},
				    isBase64Encoded:true,
					body: JSON.stringify(sendjson)
				}
				callback(null, response);
			});
	
		});
     	req.end(); 
	} 
	catch(e)
		{
        	console.log('Exception: '+e);
			callback(false);
        }
}