!function() {

  var
    FUNCTIONS_THAT_TAKE_A_SELECTOR = ["find", "filter", "closest", "delegate"],
    EVENTS = [
      "blur", "focus", "focusin", "focusout", "load", "resize", "scroll", "unload", "click", "dblclick",
      "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave", "change",
      "select", "submit", "keydown", "keypress", "keyup", "error"
    ];

  module("jQuery");

  test("$", function() {

    // get
    expect( S('html').get()             ).toReferenceTheSameHtmlElementsAs( $('html') );
    expect( S('html, head').get()       ).toReferenceTheSameHtmlElementsAs( $('html, head') );
    expect( S('html, head, body').get() ).toReferenceTheSameHtmlElementsAs( $('html, head, body') );

    expect( $('html').toSelector()             ).toBeTheSameSelectorAs( S('html') );
    expect( $('html, head').toSelector()       ).toBeTheSameSelectorAs( S('html, head') );
    expect( $('html, head, body').toSelector() ).toBeTheSameSelectorAs( S('html, head, body') );
  });

  test("events", function(){
    $('<div class="kangaroo">').appendTo('body');
    EVENTS.forEach(function(type){
      var occured, args;
      function handler(){ occured = true; args = arguments; }

      occured = false;
      S('.kangaroo').bind(type, handler).get().trigger(type);
      expect(occured).toEqual(true);
      expect(args[0]).toBeAnInstanceOf(jQuery);
      expect(args[0][0]).toBe($('.kangaroo')[0]);
      expect(args[1]).toBeAnInstanceOf(jQuery.Event);
      expect(args[1].type).toEqual(type);

      occured = false;
      S('.kangaroo').unbind(type, handler).get().trigger(type);
      expect(occured).toEqual(false);
    });
  });

}();
