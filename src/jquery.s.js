!function(jQuery, DOCUMENT, undefined){

  var
    HANDLERS = [],
    HANDLER_WRAPPERS = [],
    FUNCTIONS_THAT_TAKE_A_SELECTOR = ["find", "filter", "closest", "delegate"],
    EVENTS = [
      "blur", "focus", "focusin", "focusout", "load", "resize", "scroll", "unload", "click", "dblclick",
      "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave", "change",
      "select", "submit", "keydown", "keypress", "keyup", "error"
    ];

  jQuery.prototype.toSelector = function(){
    return S(this.selector);
  };

  S.prototype.get = function(){
    return jQuery(this.toSelector());
  };

  S.prototype.bind = function(types, data, fn){
    var index, wrapper;

    if (typeof data === 'function') fn = data; data = undefined;

    index = HANDLERS.indexOf(fn);

    if (index === -1){
      HANDLERS.push(fn);
      index = HANDLERS.indexOf(fn);
      wrapper = HANDLER_WRAPPERS[index] = function(){
        arguments = Array.prototype.slice.apply(arguments);
        arguments.unshift($(this));
        fn.apply(this, arguments);
      }
    }else{
      wrapper = HANDLER_WRAPPERS[index];
    }

    DOCUMENT.delegate(this, types, data, wrapper);
    return this;
  };

  S.prototype.unbind = function(types, fn){
    throw 'make unbind work';
  };

  EVENTS.forEach(function(name) {
    S.prototype[name] = function(data, fn) { return this.bind(name, data, fn); };
  });

  FUNCTIONS_THAT_TAKE_A_SELECTOR.forEach(function(name){
    var $super = jQuery.prototype[name];
    jQuery.prototype[name] = function(selector){
      if (typeof selector === 'function' && 'toSelector' in selector)
        arguments[0] = selector.toSelector();
      return $super.apply(this, arguments);
    };
  });

}(jQuery, jQuery(document));
