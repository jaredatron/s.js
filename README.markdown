# S.js

**Dry up those selectors**

## S.js provides…

  S returns an object that represents a css selector. Sort of like jQuery except S is to CSS selectors 
  as jQuery is to DOM nodes.

### Examples

This:

    $(document).delegate('#widget > .close', 'click', function(event){
      $(this).closest('#widget').hide();
    });

Can now be written like this:

    var
      WIDGET = S('#widget'),
      CLOSE  = WIDGET('> .close');

    CLOSE.click(function(close, event){
      close.closest(WIDGET).hide();
    });

## Author

  S.js was written by Jared Grippe [jared@jaredgrippe.me](http://jaredgrippe.me)