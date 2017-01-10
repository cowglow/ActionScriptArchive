////////////////////////////////////////////////
// XMLtoObject (XML Object Extention)
// Gary Burgess (gary@heavy-rotation.net)
// May 08, 2003
// 
// CGXMLObject (Constructor Function)
// Philip Saa (psaa@cowglow.com)
// May 17, 2003
////////////////////////////////////////////////
XML.prototype.toObject = function ()
{
	var $xparse = function (n)
	{
		var o = new String (n.firstChild.nodeValue), s, i, t
		for (s = (o == "null") ? n.firstChild : n.childNodes[1]; s != null; s = s.nextSibling)
		{
			t = s.childNodes.length > 0 ? arguments.callee (s) : new String (s.nodeValue)
			for (i in s.attributes) t[i] = s.attributes[i]
			
			if (o[s.nodeName] != undefined)
			{
				if (!(o[s.nodeName] instanceof Array)) o[s.nodeName] = [o[s.nodeName]]
				o[s.nodeName].push (t)
			}
			else o[s.nodeName] = t
		}
		return o
	}
	return $xparse (this)
}

////////////////////////////////////////////////
_global.CGXMLObject = function(xmlDoc){
	this.objXML = new XML();
	this.objXML.ignoreWhite = true;
	this.objXML.master = this;
	this.objXML.onLoad = function(success){
		if (success){
			this.master.all = this.toObject();
			this.master.onLoad();
		}
		delete this;
	}
	this.objXML.load(xmlDoc);
}

///////////////////////////////////////////////////////
// Usage
///////////////////////////////////////////////////////
// 
// myXMLObject = new CGXMLObject(xmlDoc.xml);
// 
// myXMLObject.onLoad = (){
//	// Some logic here.
// }
// 
///////////////////////////////////////////////////////
