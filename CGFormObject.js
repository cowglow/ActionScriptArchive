///////////////////////////////////////////////////////
// CGFormObject (Constructor Function)
// Philip Saa (psaa@cowglow.com)
// May 17, 2003
///////////////////////////////////////////////////////

_global.CGFormObject = function(){
	this.Initialize();
}

/***********************************************
 - Need to complete CGClass definition
 - CGFormObject.prototype = new CGClass();
***********************************************/
///////////////////////////////////////////////////////
CGFormObject.prototype.Initialize = function(){
	// Public Properties
	this._action = "";			// default value is null
	this._method = "GET";		// default value is "GET" - [GET, POST]
	
	// Private Properties
	this.DataInput = new Array();
	this.DataValidationHandler = new String("");
}

///////////////////////////////////////////////////////
// Public Methods
///////////////////////////////////////////////////////
CGFormObject.prototype.AddInput = function(textField, type, maxlength){
	if (arguments.length < 1){ return; }
	
	var InputObject = new Object();
		InputObject.textField = textField;
		InputObject.type = (type != undefined) ? type : "text";					// available types[text, number, email, url]
		InputObject.maxlength = (maxlength != undefined) ? maxlength : 0;		// default value is 0 [unlimited]
		
	this.DataInput.push(InputObject);
}

CGFormObject.prototype.Validate = function(){
	return true;
}

CGFormObject.prototype.Submit = function(){
	// Collect Data
	var DataTransfer = new LoadVars();
	var InputData = this._getInputData();
	
	// Validate
	var iScore = 0;
	var max = InputData.length;
	for (var iInt = 0; iInt < max; iInt++){
		if (this._validate(InputData[iInt].value, InputData[iInt].type)){
			iScore += 1;
			DataTransfer[InputData[iInt].textField._name] = InputData[iInt].value;
		} else {
			iScore += 0;
			InputData[iInt].textField.text = "Invalid Data!";
			InputData[iInt].textField.textColor = 0x000000;
			InputData[iInt].textField.onSetFocus = function(oldFocus){
				this.text = "";
				this.textColor = "0xFF0000";
			}
		}
	}
	
	// Send Data
	if (iScore == max){
		var sAction = this.action;
		var sMethod = this.method;
		DataTransfer["process"] = "submit"
		DataTransfer.sendAndLoad(sAction, this, sMethod);
		trace("killa")
		this.onSubmit();
	}
}

CGFormObject.prototype.Reset = function(){
	var max = this.DataInput.length;
	for (var iInt = 0; iInt < max; iInt++){
		this.DataInput[iInt].textField.text = "";
		this.DataInput[iInt].textField.borderColor = "0x000000"
	}
}

///////////////////////////////////////////////////////
// Private Methods
///////////////////////////////////////////////////////
CGFormObject.prototype._getInputData = function(){
	var InputData = new Array();
	var max = this.DataInput.length;
	for (var iInt = 0; iInt < max; iInt++){
		var InputObj = this.DataInput[iInt];
		var InputInstance = eval(this.DataInput[iInt].textField);
			InputData.push({textField:InputObj.textField, value:InputInstance.text, type:InputObj.type, maxlength:InputObj.maxlength})
	}
	return InputData;
}

CGFormObject.prototype._validate = function(value, type){
	var bValid = false;
	
	if (type == "text"){
		bValid += (value.length > 0) ? true : false;
	}
	if (type == "number"){
		bValid += (isNaN(parseInt(value))) ? true : false;
	}
	if (type == "email"){
		bValid += (this._validateEmail(value)) ? true : false;
	}
	if (type == "url"){
		bValid += (this._validateUrl(value)) ? true : false;
	}
	
	return bValid;
}

CGFormObject.prototype._validateEmail = function(value){
	var bValid = false;
	var test1 = (value.indexOf("@") > 0);
	var test2 = ((value.indexOf("@") +2) < value.lastIndexOf("."));
	var test3 = (value.lastIndexOf(".") < (value.length -2));
	
	bValid = (test1 & test2 && test3) ? true : false;
	return bValid
}

CGFormObject.prototype._validateUrl = function(value){
	var bValid = false;
	var test1 = (value.indexOf("http://") == 0);
	var test2 = (value.lastIndexOf(".") < (value.length -2));
	
	bValid = (test1 && test2) ? true : false;
	return bValid
}

CGFormObject.prototype._getAction = function(){ return this._action; }
CGFormObject.prototype._setAction = function(sValue){ this._action = sValue; }

CGFormObject.prototype._getMethod = function(){ return this._method; }
CGFormObject.prototype._setMethod = function(sValue){ this._method = sValue; }


///////////////////////////////////////////////////////
// Properties
///////////////////////////////////////////////////////
CGFormObject.prototype.addProperty("action", this._getAction, this._setAction);
CGFormObject.prototype.addProperty("method", this._getMethod, this._setMethod);

///////////////////////////////////////////////////////
// Usage
///////////////////////////////////////////////////////
// 
// 
///////////////////////////////////////////////////////
