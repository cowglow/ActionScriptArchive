///////////////////////////////////////////////////////
// Cowglow Co.
// Common Flash Functions
//
// Philip Saa - psaa@cowglow.com
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
// FSCommands
///////////////////////////////////////////////////////
fscommand("fullscreen", false);
fscommand("allowscale", false);
fscommand("showmenu", false);

///////////////////////////////////////////////////////
// EventBroadcaster
///////////////////////////////////////////////////////
_global.EventBroadcaster = new Object()
EventBroadcaster.initialize = function(obj){
	obj._listeners = new Array();
	obj.broadcastMessage = this._broadcastMessage;
	obj.addListener = this._addListener;
	obj.removeListener = this._removeListener;
}

EventBroadcaster._broadcastMessage = function(){
	var eventName = arguments.shift();
	var list = this._listeners;
	var max = list.length;
	for (var i=0; i<max; i++){
		list[i][eventName].apply(list[i], arguments);
	}
}

EventBroadcaster._addListener = function(obj){
	this.removeListener(obj);
	this._listeners.push(obj);
	return (true);
}

EventBroadcaster._removeListener = function(obj){
	var list = this._listeners;
	var i = list.length;
	while (i--){
		if (list[i] == obj){
			list.splice(i, 1);
			return (true);
		}
	}
	return (true);
}

///////////////////////////////////////////////////////
// Misc. Functions
///////////////////////////////////////////////////////
_global.GetValue = function(sArg1, sArg2){
	var sArgValue;
	
	if (sArg1 != undefined){
		if (sArg1.length != 0 or sArg1 <> ""){
			sArgValue = sArg1;
		} else {
			sArgValue = sArg2;
		}
	} else {
		sArgValue = sArg2;
	}
	return sArgValue;
}

_global.sJunk = function(){
	var myData = new Date().getMilliseconds();
	return myData
}
