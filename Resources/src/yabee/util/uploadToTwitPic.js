function UploadToTwitPic(apiKey, twitterApi){
	this.post = function(parameter, image, successCall, errorCall) {
		var text = parameter.status;
		var xhr = Ti.Network.createHTTPClient();
		var verifyURL = 'https://api.twitter.com/1/account/verify_credentials.json';
		var params = {
			url: verifyURL,
			method: 'GET'
		};
		var header = twitterApi.oAuthAdapter.createOAuthHeader(params);
		
		xhr.onload = function(){
			var res = JSON.parse(this.responseText);
			text = ( text || '' ) + ' ' + res.url;
			parameter.status = text;
			
			// post tweet with image url
			twitterApi.statuses_update({
			    onSuccess: successCall,
			    onError: errorCall,
			    parameters: parameter
			});
		};
		xhr.onerror = function(error){
			errorCall();
		};
		
		xhr.open('POST','http://api.twitpic.com/2/upload.json');
		xhr.setRequestHeader('X-Verify-Credentials-Authorization', header);
		xhr.setRequestHeader('X-Auth-Service-Provider', verifyURL);
		
		xhr.send({
			key: apiKey,
			message: text,
			media: image
		});
	}

	return this;
}

module.exports = UploadToTwitPic;