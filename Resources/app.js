
var Base = require("src/base");

// requireは各ファイルのmodule.exports変数を呼び出す
var CameraWindow = require("src/yabee/ui/cameraWindow"),
	cWin = new CameraWindow();
cWin.open();

Ti.App.addEventListener("resume", function(){
	Ti.API.info("App resume!");
	var cWin = new CameraWindow();
	cWin.open();
})

