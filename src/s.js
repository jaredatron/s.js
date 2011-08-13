!function(global, jQuery, undefined) {
  
  var
    WRAPPING_WHITESPACE = /^\s*|\s*$/g,
    COMMA = /\s*,\s*/g;

  function S(value){
    return Selector(value);
  }

  function Selector(value, parent) {
    if (value === undefined) value = '';
    if (typeof value.toString === 'function') value = value.toString();
    value = strip(value);
    var selector = function(value){
      return Selector(value, arguments.callee);
    };
    selector.valueOf = function(){ return value; };
    selector.end = parent;
    selector.toString = toString;
    return selector;
  }

  function toString() {
    var
      self      = this,
      selectors = self.valueOf().split(COMMA);

    return selectors.map(function(selector, parent_selectors){
      selector = strip(selector);
      if (self.end){
        if (selector.indexOf('&') === -1) selector = '& '+selector;
        parent_selectors = self.end.toString().split(COMMA);
        return parent_selectors.map(function(parent_selector){
          return selector.replace(/&/g, parent_selector);
        }).join(', ');
      }
      return selector;
    }).join(', ');
  }

  global.S = S;
  global.Selector = Selector;


  // Helpers
  
  function strip(text){ 
    return text
      .replace(WRAPPING_WHITESPACE, '')
      .replace(COMMA, ', ')
    ;
  }

}(this, jQuery);
