///////////////////////////////////////////////////////
// Cowglow Co.
// Client Side JavaScript Shared Functions
//
// Philip Saa - psaa@cowglow.com
// thanks to sasha@war.ru
///////////////////////////////////////////////////////


///////////////////////////////////////////////////////
// Global Variables
///////////////////////////////////////////////////////
var isNS = navigator.appName.indexOf("Netscape") != -1
var isIE = navigator.appName.indexOf("Microsoft") != -1
var onMC = navigator.appVersion.indexOf("Macintosh") != -1

///////////////////////////////////////////////////////
// Request Object and Submethods
///////////////////////////////////////////////////////
var Request = new Object()
	Request.QueryString = function(arg){
		if (location.search){
			sQuery = location.search.substring(1,location.search.length)
			sQuery = sQuery.split("&")
			for (x=0; x<sQuery.length; x++){
				curQuery = sQuery[x].split("=")
				if(curQuery[0] == arg){
					return unescape(curQuery[1])
					break
				}
			}
		} else {
			return null
		}
	}

///////////////////////////////////////////////////////
// Misc Functions
///////////////////////////////////////////////////////
function GetValue(var1, var2){
	var sOutput = (var1 == null || var1 == "undefined") ? var2 : var1;
	return sOutput;
}

///////////////////////////////////////////////////////
// Popup Window Functions
///////////////////////////////////////////////////////
var g_popup_window;

function popup_bring_to_front() {
	window.focus();
}

function popup_close_self() {
	if (opener) {
		opener.location.reload(1);
	}
	window.close();
}

function popup_window() {
	// This funciton accepts 1 to 3 parameters, url, width, height, the last 2 are optional and default to 990 and 740
	
	var strURL, strParam;
	var intWidth  = 990;
	var intHeight = 740;
	var intI;
	
	var aryProperty = new Array("strURL", "intWidth", "intHeight");
	for (intI = 0; intI < arguments.length; intI ++) {
		eval(aryProperty[intI] + '= arguments[' + intI + ']');
	}
	
	var intTop = Number(screen.height - intHeight) * 0.5
	var intLeft = Number(screen.width - intWidth) * 0.5
	
	if (popup_window_exist()) {
		g_popup_window.focus();
	}
	
	strParam = "top=" + intTop + ",left=" + intLeft + ",location=0,menubar=0,resizable=0,status=0,titlebar=0,toolbar=0,directories=0,scrollbars=0,width="+intWidth+",height="+ intHeight;
	g_popup_window = window.open(strURL, "popup_window", strParam, false);
	
}

function popup_window_exist() {
	if (g_popup_window && g_popup_window.open && !g_popup_window.closed) {
		return true;
	} else {
		return false;
	}
}

///////////////////////////////////////////////////////
// Cookie Functions
///////////////////////////////////////////////////////
var WholeCookie = document.cookie;
var today = new Date();
var expiration = new Date(today.getTime() + 365 * 24 * 60 * 60 * 1000);  // 365 days from today

function getCookie(CookieName) {
	var WholeCookie = document.cookie;
			
	var index = WholeCookie.indexOf(CookieName + "=");
	if (index == -1) return "";
		index = WholeCookie.indexOf("=", index) + 1;
		var endstr = WholeCookie.indexOf(";", index);
		if (endstr == -1) endstr = WholeCookie.length;
		var IndividualCookie = unescape(WholeCookie.substring(index, endstr));
		// check for empty cookie. Various browsers handle empty cookies differently.
	if (IndividualCookie == null || IndividualCookie == "null" ||
		IndividualCookie == "" || IndividualCookie.indexOf("undefined") >= 0 ||
		IndividualCookie.lastIndexOf("=") == IndividualCookie.length - 1) {
		IndividualCookie = ""
	}
	return IndividualCookie
}
			
// writes a permanent cookie (expires=) with global scope (path=/)
// depends on today and expiration variables set above
function setCookie(CookieName, PropertyString) {
	document.cookie = CookieName + "=" + PropertyString + "; path=/; expires=" +
	expiration.toGMTString();
	WholeCookie = document.cookie;  // keep the internal cookie string in sync
}

function ClearCookie(name) {
	document.cookie = name + "=" + "; expires=Tue, 01-Jan-80 00:00:01 GMT; path=/";
}

///////////////////////////////////////////////////////
// Custom Functions
///////////////////////////////////////////////////////
self.focus()
