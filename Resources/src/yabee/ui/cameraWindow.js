Ti.API.log("load cameraWindow.js");

var Base = require("src/base");

function CameraWindow(){
	Ti.API.log("CameraWindow()");

	var PreviewWindow = require("src/yabee/ui/previewWindow");

	var self = Base.ui.createWindow({
		// backgroundColor: "#66f"
	});

	var view = Base.ui.createView();
	
	var commentImage = Ti.UI.createImageView({
		image: '/img/comment.png',
		top: 50,
		left: 20,
	    zIndex: 1001
	});
	view.add(commentImage);
	
	var takePictureButton = Base.ui.createButton({
	    bottom: 4,
	    backgroundImage: "/img/photo.png",
	    onClick: function(e){
			try{
			    Ti.Media.takePicture();		
			}catch(e){
				Ti.API.info("click takePictureButton");
				var pWin = PreviewWindow();
				pWin.open();
			}
		}
	});
	view.add(takePictureButton);
	
	Ti.API.info("Initialize Camera");
	Titanium.Media.showCamera({
	    success: function(event){
	    	Ti.API.info("Ti.Media.takePicture() success");
	
	        Ti.Media.hideCamera();
			var pWin = PreviewWindow({image: event.media});
			pWin.open();
	    },
	    cancel: function(){
	    },
	    error: function(error){
	    	Ti.API.info("Media.showCamera error");
	        // エラー発生時のアラート表示
	        var a = Titanium.UI.createAlertDialog({title:'Camera'});
	        if (error.code == Titanium.Media.NO_CAMERA){
	            a.setMessage('Please run this test on device');
	            a.addEventListener("click", function(e){
	            	// win.fireEvent("takePicture", {image: null});
	            })
	            
	        	var imageView = Ti.UI.createImageView({
					image: "/img/samplePicture.jpg",
					zIndex: -10
				});
	            self.add(imageView);
	            self.add(view);
	        }
	        else{
	            a.setMessage('Unexpected error: ' + error.code);
	        }
	        a.show();
	    },
	    // http://d.hatena.ne.jp/kusakari/20110330/1301477909
	    // transform: Ti.UI.create2DMatrix().scale(1),
	    // カスタムオーバーレイViewを指定する
	    overlay: view,
	    // 標準のカメラ撮影用コントロールを表示しない
	    showControls: false,
	    // カメラ撮影モード
	    mediaTypes: Ti.Media.MEDIA_TYPE_PHOTO,
	    // 撮影後に自動的にファインダーを閉じない
	    autohide: false,
	    // touchEnabled: false
	});
	
	return self;
}

module.exports = CameraWindow;


