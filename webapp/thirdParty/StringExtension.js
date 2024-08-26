 if (!String.prototype.endsWith) {
	  String.prototype.endsWith = function(searchString, position) {
	      var subjectString = this.toString();
	      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
	        position = subjectString.length;
	      }
	      position -= searchString.length;
	      var lastIndex = subjectString.indexOf(searchString, position);
	      return lastIndex !== -1 && lastIndex === position;
	  };
	}

	String.prototype.toFloat = function(decimalLength) {
		var subjectString = this.toString();
		
		if(subjectString == "") {
			return 0;
		}

		if(subjectString.indexOf(',')>-1) {
			subjectString =  subjectString.replace(',','.');
		}
		
		var floatVal = parseFloat(subjectString);

		return parseFloat(floatVal.toFixed(decimalLength||2));
};