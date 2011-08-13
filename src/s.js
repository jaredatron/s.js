!function(global, jQuery, undefined) {

  var
    EMTPY = /^\s*$/,
    WRAPPING_WHITESPACE = /^\s*|\s*$/g,
    COMMA = /\s*,\s*/g,
    TRAILING_COMMA = /,\s*$/;

  function S(value){
    return Selector(value);
  }
  S.toSelector = S.toString = S.valueOf = function(){ return ''; }
  S.end = S;

  function Selector(value, parent) {
    // if (value === undefined || EMTPY.test(value)) throw 'Selector cannot be empty';
    if (value === undefined) value = '';
    if (typeof value.toString === 'function') value = value.toString();
    validateSelector(value);
    value = strip(value);
    var selector = function(value){
      return arguments.length ? Selector(value, selector) : selector;
    };
    selector.value = value;
    selector.end = parent ? parent : S;
    extend(selector, Selector.prototype);
    return selector;
  }

  Selector.prototype.isSelector = true;
  Selector.prototype.toSelector = function(){
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
  Selector.prototype.toString = Selector.prototype.toSelector;
  Selector.prototype.valueOf  = Selector.prototype.toSelector;

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

  function extend(object, extension){
    for (var p in extension) object[p] = extension[p];
  }


}(this, jQuery);
