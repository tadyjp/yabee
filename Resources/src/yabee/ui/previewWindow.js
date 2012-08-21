Ti.API.log("load previewWindow.js");

var Config = require("src/yabee/config");
var Base = require("src/base");

Ti.include("lib/twitter_api.js");
var twitterApi = new TwitterApi({
    consumerKey: Config.twitter.consumerKey,
    consumerSecret: Config.twitter.consumerSecret
});

var UploadToTwitPic = require("src/yabee/util/uploadToTwitPic"),
	twitPic = new UploadToTwitPic(Config.twitpic.apiKey, twitterApi);

function PreviewWindow(params){	
	params = params || {};

	twitterApi.init();

	Ti.API.log("previewWindow()");
	var self = Base.ui.createWindow({
		// backgroundColor: "#6f6"
	});
	
	var imageWithCommentView = Ti.UI.createView();
	var imageView = Ti.UI.createImageView({
		image: params.image || "/img/samplePicture.jpg",
		width: self.width,
		height: self.height
	});
	imageWithCommentView.add(imageView);
	var commentImage = Ti.UI.createImageView({
		image: '/img/comment.png',
		top: 50,
		left: 20,
	});
	imageWithCommentView.add(commentImage);
	self.add(imageWithCommentView);
	
	var buttonArea = (function createButtonView(){
		var CameraWindow = require("src/yabee/ui/cameraWindow");
		var buttonArea = Titanium.UI.createView({
		    color:'#111',
			width: 320,
			height: 44,
			bottom: 4
		});
		var cancelButton = Base.ui.createButton({
		    left: 7,
		    backgroundImage: "/img/cancel.png",
		    onClick: function(e){
				Ti.API.info("click cancelButton");
				var cWin = new CameraWindow();
				cWin.open();
		    }
		});
		var canTweet = true;
		var tweetButton = Base.ui.createButton({
		    right: 7,
		    backgroundImage: "/img/tweet.png",
		    onClick: function(e){
		    	canTweet = false;
		    	setTimeout(function(){
		    		canTweet = true;
		    	}, 3000);

				// ツイートする
				var time = (new Date()) - 0;
				twitPic.post({
				    	status: '＼やべえ／'  + time
				   },
					imageWithCommentView.toImage(),
					function(res){
				        Ti.API.info(res);
				        alert('Tweet 完了');
						var cWin = new CameraWindow();
						cWin.open();
					},
					function(err){
				        Ti.API.info(err);
				        alert('Tweet エラー');
					}
				);
			}
		});
		buttonArea.add(tweetButton);
		buttonArea.add(cancelButton);
		return buttonArea;
	})();
	self.add(buttonArea);
	
	return self;	
}

module.exports = PreviewWindow;

