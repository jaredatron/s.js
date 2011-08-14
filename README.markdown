# [S.js](http://github.com/deadlyicon/s.js)

  S.js is a CSS Selector API that brings the simplicity of [SASS](http://sass-lang.com/) to JavaScript:

  Complicated selectors are a snap:

    // this:
    S('header a:active, footer a:active, header a:hover, footer a:hover');

    // can also be said like this:
    S('header,footer')('a')('&:active,&:hover');

  Nesting selectors and declaring behaviors in JavaScript is now as easy as Nesting selectors
  and declaring styles in SCSS

    // JavaScript
    S('header, footer')
      ('.button')
        .focus(function(){ /*…*/ })
        .click(function(){ /*…*/ })
      .end()
    .end();

    // SCSS
    header, footer {
      .button {
        color: grey;
        font-weight: bold;
      }
    }

## [S.js](http://github.com/deadlyicon/s.js) and [jQuery](http://www.jquery.com)

### Querying

  S.js can be thought of as being a layer on top of jQuery in the same way jQuery lives on top
  of the DOM.

    S('body');             //-> the "body" selector
    S('body').get();       //-> a jQuery collection containing the <body> DOM node
    S('body').get().get(); //-> an array containing the <body> DOM node

  The following lines are all equivalent:

    $('body');       //-> jQuery[<body>]
    S('body').get(); //-> jQuery[<body>]
    $(S('body'));    //-> jQuery[<body>]

### Events

  S.js wraps jQuery's event delegation (live) enabling even more terse selector behavior
  declaration.

    // jQuery
    $('a').live('click', function(){ /*…*/ });
    // S.js
    S('a').click(function(){ /*…*/ });

  S.js objects are functions but can be passed around like strings:

    var
      widgets = S('.widgets > *'),
      closers = widgets('> .close');

    widgets == '.widgets > *' //-> true;

    closers.click(function(close, event){
      close.closest(widgets).hide();
    });

  Handlers bound via S.js are called in an "improved" way

    S('a').click(function(a, event){
      this  //-> <a> DOM node
      a     //-> $(this)
      event //-> jQuery.Event
    });

## Examples

    S('html')         //-> 'html'
      ('body')        //-> 'html body'
        ('a')         //-> 'html body a'
          ('&:hover)  //-> 'html body a:hover'
        .end()        //-> 'html body a'
        ('div')       //-> 'html body div'
          ('&:hover)  //-> 'html body div:hover'
        .end()        //-> 'html body div'
      .end()          //-> 'html body'
    .end();           //-> 'html'
