// global variable definitions
com = window.com || {};
com.marklogic = window.com.marklogic || {};
com.marklogic.widgets = window.com.marklogic.widgets || {};

com.marklogic.widgets.cooccurence = function(container) {
  this.container = container;
  
  this.title = "Co-occurence";
  
  this.values = null;
  
  this.options = null;
  
  this._refresh();
};

com.marklogic.widgets.cooccurence.prototype.setOptions = function(options) {
  this.options = options;
};

com.marklogic.widgets.cooccurence.prototype.updateValues = function(values) {
  this.values = values;
  
  this._refresh();
};

com.marklogic.widgets.cooccurence.prototype._refresh = function() {
  // Sample: {"values-response":{"name":"actor-genre", "tuple":[
  // {"frequency":8, "distinct-value":[{"type":"xs:string", "_value":"Jim Carrey"},{"type":"xs:string", "_value":"Comedy"}]},
  // {"frequency":1, "distinct-value":[{"type":"xs:string", "_value":"Sean Astin"},{"type":"xs:string", "_value":"Adventure"}]},
  // {"frequency":4, "distinct-value":[{"type":"xs:string", "_value":"Sean Astin"},{"type":"xs:string", "_value":"Comedy"}]},
  // {"frequency":4, "distinct-value":[{"type":"xs:string", "_value":"Sean Astin"},{"type":"xs:string", "_value":"Fantasy"}]}  ], 
  // "metrics":{"values-resolution-time":"PT0.153351S", "total-time":"PT0.174207S"}}}
  if (null == this.values || undefined == typeof this.values) {
    return; // draw nothing
  }
  var str = "<div class='cooccurence-title'>" + this.title + "</div>";
  if (undefined != this.values["values-response"] && undefined != this.values["values-response"].tuple) {
    var tuples = this.values["values-response"].tuple;
    for (var i = 0;i < tuples.length;i++) {
      str += "<div class='cooccurence-values'>";
      var t = tuples[i];
      for (var v = 0;v < t["distinct-value"].length;v++) {
        var val = t["distinct-value"][v];
        str += "<span class='cooccurence-value'>" + val["_value"] + "</span>";
        if (v != t["distinct-value"].length - 1) {
          str += ", ";
        }
      }
      // now show frequency
      str += " <span class='cooccurence-count'>(" + t.frequency + ")</span></div>";
    }
  }
  document.getElementById(this.container).innerHTML = str;
};