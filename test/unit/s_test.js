!function() {

  module("S");

  test("S", function() {
    expect(function(){ S().toString();   }).toThrow('Selector cannot be empty');
    expect(function(){ S('').toString(); }).toThrow('Selector cannot be empty');
    expect( S('html')).toEqual('html');

    // chaining
    expect( S('html body')                  ).toEqual('html body');
    expect( S('html body')('section')       ).toEqual('html body section');
    expect( S('html body')('section')('h1') ).toEqual('html body section h1');

    // &
    expect( S('a')('&:visible')).toEqual('a:visible');

    // ,
    expect( S('html')('div,span')        ).toEqual('html div, html span');
    expect( S('head,body')('div')        ).toEqual('head div, body div');
    expect( S('head,body')('div,span')   ).toEqual('head div, body div, head span, body span');
    expect( S('html')('div,span')('a,b') ).toEqual('html div a, html span a, html div b, html span b');

    // white space
    expect( S('  html  ')                      ).toEqual('html');
    expect( S('  html  ')('  head  ,  body  ') ).toEqual('html head, html body');
    expect(function(){ S('a,b,').toString(); }).toThrow('Selectors can\'t end in commas. "a,b,"');


    // S takes an S object
    expect( S(S('html'))).toEqual('html');

  });


}();


function EXAMPLE() {
  var
    SHROUD      = S('#shroud'),
    MODAL       = SHROUD('> .modal'),
    CONTAINER   = MODAL('> .container'),
    BOX         = CONTAINER('> .box'),
    CLOSE_MODAL = BOX('*[data-close_modal]');
  // var
  //   SHROUD      = '#shroud',
  //   MODAL       = SHROUD + ' > .modal',
  //   CONTAINER   = MODAL + ' > .container',
  //   BOX         = CONTAINER + ' > .box',
  //   CLOSE_MODAL = BOX + ' *[data-close_modal]';

  BOX.click(function(box, event){
    event.stopPropagation();
  });

  // $(document).delegate(BOX, 'click', function(event){
  //   var box = $(this);
  //   event.stopPropagation();
  // })

  MODAL('&:not([data-locked])').click(function(modal, event){
    Page.hideModal(modal);
  });

  BOX.click(function(box, event){
    Page.hideModal(box.closest(MODAL));
  });

  $(function(){
    SHROUD.get().hide();
    MODAL.get().hide();
  });
};