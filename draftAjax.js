$(document).ready( function() {
    $("#buttonPageOne").click(function() {
      
    })
  }
)

$(document).ready( function() {
    $("#buttonPageTwo").click(function() {
      $("#body").load("testpagetwo.html")
      var css = document.createElement('link');
      css.rel = 'stylesheet';
      css.type = 'text/css';
      css.href = 'testpagetwo.css';
      document.head.appendChild(css);
    })
  }
)

$(document).ready( function() {
    $("#buttonPageThree").click(function() {
      $("#body").load("testpagethree.html")
      var css = document.createElement('link');
      css.rel = 'stylesheet';
      css.type = 'text/css';
      css.href = 'testpagethree.css';
      document.head.appendChild(css);
    })
  }
)

$(document).ready( function() {
    $("#buttonHome").click(function() {
      $("#body").load("test.html")
      var css = document.createElement('link');
      css.rel = 'stylesheet';
      css.type = 'text/css';
      css.href = 'test.css';
      document.head.appendChild(css);
    })
  }
)
