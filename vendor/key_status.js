var jq=jQuery.noConflict();
jq(function() {
  window.keydown = {};
  
  function keyName(event) {
    return jQuery.hotkeys.specialKeys[event.which] ||
      String.fromCharCode(event.which).toLowerCase();
  }
  
  jq(document).bind("keydown", function(event) {
    keydown[keyName(event)] = true;
  });
  
  jq(document).bind("keyup", function(event) {
    keydown[keyName(event)] = false;
  });
});
