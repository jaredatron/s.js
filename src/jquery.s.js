!function(jQuery, DOCUMENT, undefined){

  var
    FUNCTIONS_THAT_TAKE_A_SELECTOR = ["find", "filter", "closest", "delegate", "undelegate"],
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

    wrapEventHandler(fn);

    DOCUMENT.delegate(this, types, data, fn.sjs_wrapper);
    return this;
  };

  S.prototype.unbind = function(types, fn){
    DOCUMENT.undelegate(this, types, fn.sjs_wrapper || fn);
    return this;
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

  function wrapEventHandler(fn){
    fn.sjs_wrapper = fn.sjs_wrapper || function(){
      arguments = Array.prototype.slice.apply(arguments);
      arguments.unshift(jQuery(this));
      fn.apply(this, arguments);
    }
  }

}(jQuery, jQuery(document));
