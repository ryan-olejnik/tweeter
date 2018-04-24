$(document).ready(function(){
  $('textarea').on('keyup', function(){
    var charCount = $(this).val().length;
    chars_left = 140-charCount;
    $('#counter').text(chars_left);
    if (chars_left < 0){
      $('#counter').css('color', 'red');
      $('#counter').css('font-weight', 'bold');
    } else {
      $('#counter').css('color', 'black');
      $('#counter').css('font-weight', 'normal');
    }

  });





});

