!function() {

  module("S");

  test("S is a string", function() {
    expect( S         ).toEqual('');
    expect( S()       ).toEqual('');
    expect( S('')     ).toEqual('');
    expect( S('html') ).toEqual('html');
  });

  test(".end", function() {
    expect( S                              ).toEqual('');
    expect( S.end                          ).toEqual('');
    expect( S('html').end                  ).toEqual('');
    expect( S('html')('body').end          ).toEqual('html');
    expect( S('html')('body')('div').end   ).toEqual('html body');
    expect( S('html').end()                ).toEqual('');
    expect( S('html')('body').end()        ).toEqual('html');
    expect( S('html')('body')('div').end() ).toEqual('html body');
  });

  test("self returning", function() {
    var body = S('body');
    expect( S      ).toBe(S);
    expect( body() ).toBe(body);
  });

  test("chaining", function() {
    expect( S('html body')                  ).toEqual('html body');
    expect( S('html body')('section')       ).toEqual('html body section');
    expect( S('html body')('section')('h1') ).toEqual('html body section h1');
  });

  test("&", function() {
    expect( S('a')('&:visible')).toEqual('a:visible');
  });

  test(",", function() {
    expect( S('html')('div,span')        ).toEqual('html div, html span');
    expect( S('head,body')('div')        ).toEqual('head div, body div');
    expect( S('head,body')('div,span')   ).toEqual('head div, body div, head span, body span');
    expect( S('html')('div,span')('a,b') ).toEqual('html div a, html span a, html div b, html span b');
  });

  test("white space", function() {
    expect( S('  html  ')                      ).toEqual('html');
    expect( S('  html  ')('  head  ,  body  ') ).toEqual('html head, html body');
    expect(function(){ S('a,b,').toString(); }).toThrow('Selectors can\'t end in commas. "a,b,"');
  });

  test("S takes an S", function() {
    expect( S(S('html'))).toEqual('html');
  });


}();
