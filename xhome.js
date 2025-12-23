$(document).ready(function() {
  
  // the worst- align the social media links 
  var maxHeight = -1;  
  $('.jsMatchHeight').each(function() {
    maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
  });
  $('.jsMatchHeight').each(function() {
    $(this).height(maxHeight);
  });
  
  // the second worst- align the social media headers
  var maxHeighth3 = -1;  
  $('.jsMatchHeight h3').each(function() {
    maxHeighth3 = maxHeighth3 > $(this).height() ? maxHeighth3 : $(this).height();
  });
  $('.jsMatchHeight h3').each(function() {
    $(this).height(maxHeighth3);
  });
   
});