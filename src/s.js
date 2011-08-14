!function(global, jQuery, undefined) {

  var
    EMTPY = /^\s*$/,
    WRAPPING_WHITESPACE = /^\s*|\s*$/g,
    COMMA = /\s*,\s*/g,
    TRAILING_COMMA = /,\s*$/;

  global.S = S;

  function S(value){
    return Selector(value);
  }
  S.toSelector = S.toString = S.valueOf = function(){ return ''; }
  S.end = S;

  S.prototype.isSelector = true;
  S.prototype.toSelector = toSelector;
  S.prototype.toString   = toSelector;
  S.prototype.valueOf    = toSelector;

  function Selector(value, parent) {
    if (value === undefined) value = '';
    if (typeof value.toString === 'function') value = value.toString();
    validateSelector(value);
    value = strip(value);
    var selector = function(value){
      return arguments.length ? Selector(value, selector) : selector;
    };
    selector.value = value;
    selector.end = parent ? parent : S;
    extend(selector, S.prototype);
    return selector;
  }

  function toSelector(){
    var
      self      = this,
      selectors = self.value.split(COMMA);

    validateSelector(self.value);
    // TODO uniq selectors before returning
    return selectors.map(function(selector, parent_selectors){
      selector = strip(selector);
      if (self === self.end || self.end === S) return selector;
      if (selector.indexOf('&') === -1) selector = '& '+selector;

      parent_selectors = self.end.toString().split(COMMA);

      return parent_selectors.map(function(parent_selector){
        return selector.replace(/&/g, parent_selector);
      }).join(', ');

    }).join(', ');
  }


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

  function extend(object, extension){
    for (var p in extension) object[p] = extension[p];
  }


}(this, jQuery);
