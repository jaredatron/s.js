# S.js

  S.js is a CSS Selector API that brings the simplicity of SCSS to JavaScript:

  Complicated selectors are a snap:

    // this:
    S('header a:active, footer a:active, header a:hover, footer a:hover');

    // can also be said like this:
    S('header,footer')('a')('&:active,&:hover');

  Nesting selectors and declaring behaviors in JavaScript is now as easy as it is in SCSS

    // JavaScript
    S('header, footer')
      ('.button')
        .focus(function(){ /*…*/ })
        .click(function(){ /*…*/ })
      .end
    .end;

    // SCSS
    header, footer {
      .button {
        color: grey;
        font-weight: bold;
      }
    }

## S.js and jQuery

  S.js can be thought of being a layer on top of jQuery in the same way jQuery lives on top of the DOM.

    S('body');             //-> the "body" selector
    S('body').get();       //-> a jQuery collection containing the <body> DOM node
    S('body').get().get(); //-> an array containing the <body> DOM node

  The following lines are all equivalent:

    $('body');       //-> jQuery[<body>]
    S('body').get(); //-> jQuery[<body>]
    $(S('body'));    //-> jQuery[<body>]

  S.js wraps jQuery's event delegation (live) enabling even more terse selector behavior declaration.

    // jQuery
    $('a').live('click', function(){ /*…*/ });
    // S.js
    S('a').click(function(){ /*…*/ });

  S.js objects are functions but can be passed around like strings:

    var
      WIDGET = S('#widget'),
      CLOSE  = WIDGET('> .close');

    WIDGET == '#widget' //-> true;

    CLOSE.click(function(close, event){
      close.closest(WIDGET).hide();
    });


### Author

  S.js was written by Jared Grippe [jared@jaredgrippe.me](http://jaredgrippe.me)
