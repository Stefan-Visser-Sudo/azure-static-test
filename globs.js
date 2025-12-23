$(document).ready(function() {

  // Build a link in the footer to the "next" page based on the WP CMS managed nav
  $('.current_page_item').next("li").find("a").clone().appendTo("footer.main").wrap('<div class="nav-next" />');
  
  
  // for non-mobile devices...
  enquire.register("screen and (min-width:767px)", {

    match : function() {
        // Animate "next page" arrow opacity slightly on hover
        $('.no-touch .btn-scroll').hover(function(){
      		$(this).filter(':not(:animated)').animate({opacity: 1},{queue:false,duration:250});
      	}, function(){
      		$(this).filter(':not(:animated)').animate({opacity: 0.9},{queue:false,duration:250});
      	});
        	
      	// Fix the awesome background images for a "parallax" effect
      	$('.no-touch #home .awesome, .no-touch #about .module .awesome, .no-touch #consulting .module .awesome, .no-touch #meta .module .awesome').css('background-attachment', 'fixed');
  	
    }

  }).listen();


  // Position each banner to the center of its parent module
  var headerHeight = $('header').height();
  $('.banner').each(function() {
    var bannerHeight = $(this).height();
    //$(this).css({ marginTop: (-(bannerHeight/2) + (headerHeight/2)) + 'px' });
    
    // try animating in for a smoother feeling?
    $(this).filter(':not(:animated)').animate({marginTop: (-(bannerHeight/2) + (headerHeight/2)) + 'px'}, 1000, 'easeOutExpo');
    
  });


  // Recalculate module heights based on screen size
  var isiPhone = navigator.userAgent.toLowerCase().indexOf("iphone");
  
  function setModuleHeight(){
    var viewportHeight = $(window).height();
    if(isiPhone > -1)
    {
      // add 60px to viewport height to account for chrome
      viewportHeight += 60;
    } 

    $('.module').each(function() {
      // set the module height to the size of the viewport
      // $(this).css('height', viewportHeight);
      
      // try animating resize for a smoother feeling?
      $(this).filter(':not(:animated)').animate({height: viewportHeight}, 100);
      
    });
    
  }


  // When you get to the page...
  setModuleHeight();
  
  // As you resize the page...
  $(window).resize(function() {
    setModuleHeight();
  });

  // Chris Coyier's smooth scrolling to achor links [MODIFIED]: 
  function filterPath(string) {
  return string
    .replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'');
  }
  var locationPath = filterPath(location.pathname);
  var scrollElem = scrollableElement('html', 'body');
 
 
  $('a[href*=#]').on("click", function (event) {
  
    event.preventDefault();
  
    var thisPath = filterPath(this.pathname) || locationPath;
    if (  locationPath == thisPath
    && (location.hostname == this.hostname || !this.hostname)
    && this.hash.replace(/#/,'') ) {
      var $target = $(this.hash), target = this.hash;
      if (target) {
        var targetOffset = $target.offset().top; 
        console.log(targetOffset);
        if($(scrollElem).length > 0){
          $(scrollElem).filter(':not(:animated)').animate({scrollTop: targetOffset}, 1000, 'easeOutExpo', function() {
            location.hash = target;
          });
        }
        else{
          location.hash = target;
        }
        
      }
    }
  });

 
  // use the first element that is "scrollable"
  function scrollableElement(els) {
    for (var i = 0, argLength = arguments.length; i <argLength; i++) {
      var el = arguments[i],
          $scrollElement = $(el);
      if ($scrollElement.scrollTop()> 0) {
        return el;
      } else {
        $scrollElement.scrollTop(1);
        var isScrollable = $scrollElement.scrollTop()> 0;
        $scrollElement.scrollTop(0);
        if (isScrollable) {
          return el;
        }
      }
    }
    return [];
  }
  
  // Blog items
  $("a.expand-archives").click(function(e){
    e.preventDefault();
    var parentDropdown = $(this).closest(".archives-dropdown");
    var navWrapper = $(this).next("nav");
    
    if(parentDropdown.hasClass("open")){
      navWrapper.slideToggle(100, function(){
        parentDropdown.toggleClass("open");
      });
    }else{
      parentDropdown.toggleClass("open");
      navWrapper.slideToggle(100);
    }
  });
  
  $('.archives-dropdown li').each(function(index) {
      if($(this).text() == $(".the-timeframe").text()){
        $('.archives-dropdown li').removeClass("current");
        $(this).addClass("current");
      }
  });
  
  if($(".comment")){
    $(".comment:last").addClass("last-comment");
  }
  
  // toggle menu button for iPhone
  $('#jsMobileNav').click(function() {
    $(this).toggleClass("active");
    $('nav.menu-main-navigation-container').slideToggle('fast', function() {
      // Animation complete.
    });
  });


  // where there's a tweet, there's a way...
  if ($.isFunction($.fn.tweet)){    
    $("#jsTweetText").tweet({
  	   username: "wammoth",
  	   join_text: false,
  	   avatar_size: 32,
  	   count: 1,
  	   template: "{text}",
  	   loading_text: "loading tweet..."
  	 });
   }
   
});
