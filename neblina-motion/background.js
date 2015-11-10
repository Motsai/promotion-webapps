chrome.app.runtime.onLaunched.addListener(function() {
  
  
  chrome.app.window.create('main.html', {
    'innerBounds': {
      'width': 400,
      'height': 1000,
      'minWidth': 620,
      'minHeight': 274,
      'left': 100,
      'top': 100
    }
  });
/*
  
  chrome.app.window.create('testing.html', {
    'innerBounds':{ 'width' : 400, 'height': 400 }
  });
  */
});
