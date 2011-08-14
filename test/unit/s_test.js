!function() {

  module("S");

  test("S", function() {
    var body = S('body');

    // S
    expect( S         ).toEqual('');
    expect( S()       ).toEqual('')
    expect( S('')     ).toEqual('')
    expect( S('html') ).toEqual('html');

    // end
    expect( S                              ).toEqual('');
    expect( S.end                          ).toEqual('');
    expect( S('html').end                  ).toEqual('');
    expect( S('html')('body').end          ).toEqual('html');
    expect( S('html')('body')('div').end   ).toEqual('html body');
    expect( S('html').end()                ).toEqual('');
    expect( S('html')('body').end()        ).toEqual('html');
    expect( S('html')('body')('div').end() ).toEqual('html body');

    // self returning
    expect( body() ).toBe(body);

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
