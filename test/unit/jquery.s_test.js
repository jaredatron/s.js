!function() {

  var FUNCTIONS_THAT_TAKE_A_SELECTOR = ['find', 'filter', 'closest'];

  module("S");

  test("S", function() {
    
    // get
    expect( S('html').get()             ).toReferenceTheSameHtmlElementsAs( $('html') );
    expect( S('html, head').get()       ).toReferenceTheSameHtmlElementsAs( $('html, head') );
    expect( S('html, head, body').get() ).toReferenceTheSameHtmlElementsAs( $('html, head, body') );

    expect( $('html').toSelector()             ).toBeTheSameSelectorAs( S('html') );
    expect( $('html, head').toSelector()       ).toBeTheSameSelectorAs( S('html, head') );
    expect( $('html, head, body').toSelector() ).toBeTheSameSelectorAs( S('html, head, body') );

  });

}();
