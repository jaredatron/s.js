!function() {

  module("S");

  test("S", function() {
    expect( S().valueOf() ).toBe('');
    expect( S().toString()).toBe('');

    expect( S('').valueOf() ).toBe('');
    expect( S('').toString()).toBe('');

    expect( S('html').valueOf() ).toBe('html');
    expect( S('html').toString()).toBe('html');

    // chaining
    expect( S('html body').valueOf() ).toBe('html body');
    expect( S('html body').toString()).toBe('html body');

    expect( S('html body')('section').valueOf() ).toBe('section');
    expect( S('html body')('section').toString()).toBe('html body section');

    expect( S('html body')('section')('h1').valueOf() ).toBe('h1');
    expect( S('html body')('section')('h1').toString()).toBe('html body section h1');

    // &
    expect( S('a')('&:visible').valueOf() ).toBe('&:visible');
    expect( S('a')('&:visible').toString()).toBe('a:visible');


    // ,
    expect( S('html')('div,span').valueOf()        ).toBe('div, span');
    expect( S('html')('div,span').toString()       ).toBe('html div, html span');
    expect( S('head,body')('div').valueOf()        ).toBe('div');
    expect( S('head,body')('div').toString()       ).toBe('head div, body div');
    expect( S('head,body')('div,span').valueOf()   ).toBe('div, span');
    expect( S('head,body')('div,span').toString()  ).toBe('head div, body div, head span, body span');
    expect( S('html')('div,span')('a,b').toString()).toBe('html div a, html span a, html div b, html span b');

    // white space
    expect( S('  html  ').valueOf() ).toBe('html');
    expect( S('  html  ').toString()).toBe('html');
    expect( S('  html  ')('  head  ,  body  ').valueOf() ).toBe('head, body');
    expect( S('  html  ')('  head  ,  body  ').toString()).toBe('html head, html body');

    // S takes an S object
    expect( S(S('html')).valueOf() ).toBe('html');
    expect( S(S('html')).toString()).toBe('html');

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