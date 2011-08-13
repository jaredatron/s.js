!function(global, jQuery, undefined) {

  var
    EMTPY = /^\s*$/,
    WRAPPING_WHITESPACE = /^\s*|\s*$/g,
    COMMA = /\s*,\s*/g,
    TRAILING_COMMA = /,\s*$/;

  function S(value){
    return Selector(value);
  }

  function Selector(value, parent) {
    if (value === undefined || EMTPY.test(value)) throw 'Selector cannot be empty';
    if (typeof value.toString === 'function') value = value.toString();
    validateSelector(value);
    value = strip(value);
    var selector = function(value){
      return Selector(value, arguments.callee);
    };
    selector.value = value;
    selector.end = parent;
    selector.toSelector = selector.toString = selector.valueOf = toSelector;
    return selector;
  }

  function toSelector() {
    var
      self      = this,
      selectors = self.value.split(COMMA);

    validateSelector(self.value);

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

  function validateSelector(selector){
    if (TRAILING_COMMA.test(selector)) throw 'Selectors can\'t end in commas. "'+selector+'"';
  }

  function strip(text){
    return text
      .replace(WRAPPING_WHITESPACE, '')
      .replace(COMMA, ', ')
    ;
  }

}(this, jQuery);
