
var __index__ = 1000;
var getNextIndex = function(){
	return __index__++;
};

module.exports = {
	createWindow: function(params){
		params.backgroundColor = params.backgroundColor || "#000";
		return Ti.UI.createWindow({
			backgroundColor: params.backgroundColor
		});
	},
	createView: function(params){
		return Ti.UI.createView({
		});
	},
	createButton: function(params){
		params.width = params.width || 150;
		params.height = params.height || 44;
		params.zIndex = params.zIndex || getNextIndex();
		var b = Ti.UI.createButton(params);
		if(params.onClick){
			b.addEventListener("click", params.onClick);
		}
		return b;
	},
};
