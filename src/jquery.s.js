!function(jQuery, undefined){

  var
    FUNCTIONS_THAT_TAKE_A_SELECTOR = ['find', 'filter', 'closest'];

  Selector.prototype.get = function(){
    return jQuery(this.toSelector());
  }

  jQuery.prototype.toSelector = function(){
    return S(this.selector);
  }

  FUNCTIONS_THAT_TAKE_A_SELECTOR.forEach(function(name){
    var $super = jQuery.prototype[name];
    jQuery.prototype[name] = function(selector){
      if (typeof selector === 'function' && 'toSelector' in selector)
        arguments[0] = selector.toSelector();
      return $super.apply(this, arguments);
    }
  })

}(jQuery);
