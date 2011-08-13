!function(global, jQuery, undefined) {

  function S(value){
    return Selector(value);
  }

  function Selector(value, parent) {
    if (value === undefined) value = '';
    var selector = function(value){
      return Selector(value, arguments.callee);
    };
    selector.valueOf = function(){ return value; };
    selector.end = parent;
    selector.toString = toString;
    return selector;
  }

  function toString() {
    var selector = this.valueOf();

    if (this.end){
      if (selector.indexOf('&') === -1) selector = '& '+selector;
      selector = selector.replace(/&/g, this.end.toString())
    }

    return selector;
  }

  global.S = S;
  global.Selector = Selector;

}(this, jQuery);
