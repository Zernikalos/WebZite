window.document.addEventListener('DOMContentLoaded', function() {
  var contents = document.querySelectorAll('.sourceset-dependent-content');
  for (var i = 0; i < contents.length; i++) {
    console.log(contents[i]);
  }
});