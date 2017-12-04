'use strict';

var BREAKPOINTS = {
  lg: 1280,
  md: 992,
  sm: 768,
  xs: 320
};

// checking if element for page
//-----------------------------------------------------------------------------------
function isOnPage(selector) {
	return ($(selector).length) ? $(selector) : false;
};

// fixed svg show
//-----------------------------------------------------------------------------
function formClear($form) {
	if ($form.prop("tagName") == 'FORM') {
		$form.get(0).reset();
		$form.validate().resetForm();
	} else {
		$form.find('input, textarea').each(function(){
			var $_field = $(this);

			$_field.val('')
						 .removeClass('error')
						 .next('.error').remove();
		});
	}
};

function isFormValid($form) {
	var isValid = true;

	if ($form.prop("tagName") == 'FORM') {
		isValid = $form.validate().checkForm();
	} else {
		$form.find('input, textarea').each(function(){
			var val = $(this).closest('form').validate();

			if (!val.element($(this))) {
				isValid = false;
				return false;
			}
		});
	}

	return isValid;
};

function getCurrentBreakpoint() {
	var currentPoint;

	for (var key in BREAKPOINTS) {
		if (breakpoints[key] <= window.innerWidth) {
			currentPoint = key;
			return currentPoint;
		}
	}
};

function changeDataValidError($input, isValid){
	if (isValid) {
		$input.removeAttr('data-valid-error');
	} else {
		$input.attr('data-valid-error', 'error');
	}

	$input.valid();
};

// fixed svg show
//-----------------------------------------------------------------------------
svg4everybody();

// placeholder
//-----------------------------------------------------------------------------------
$(function() {
	$('input[placeholder], textarea[placeholder]').placeholder();
});


//slick slider
//--------------------------------------------------------------------------------
function slickSlideInit(){
	var leftArrow = '<div class=" el-left-arrow"><div class="arrow-left icon"></div></div>';
	var rightArrow ='<div class=" el-right-arrow"><div class="arrow-right icon"></div></div>';
	$('.js-portfolio-slider').slick({
		dots: false,
		infinite: true,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 1,
		prevArrow: leftArrow,
		nextArrow: rightArrow,
		responsive: [
		  {
			breakpoint: 1280,
			settings: {
				slidesToShow: 3
			}
		  },
		  {
			breakpoint: 992,
			settings: {
				slidesToShow: 2
			}
		  },
		  {
			breakpoint: 767,
			settings: {
				slidesToShow: 1
			}
		  }
		  // You can unslick at a given breakpoint now by adding:
		  // settings: "unslick"
		  // instead of a settings object
		]
	  });
};

function setWidthTextSection(){
	var textSection =document.querySelectorAll('.js-section-text');
	textSection.forEach(function(section){
		section.style.width = section.dataset.width;
	})
}

var sameHeight = function(elem){
	var containerArray =  Array.from(document.querySelectorAll(elem));
	var height = 0;
	containerArray.reduce(function(current, next){
		current.offsetHeight > next.offsetHeight ? 
			height < current.offsetHeight ?  height =  current.offsetHeight : height 
			: 
			height < next.offsetHeight ?  height =  next.offsetHeight : height;
			return next;
	})

	containerArray.forEach(function(element) {
		 element.style.height = height+'px';
	 });
}

//info popup open

var infoPopupOpen = function(){
	var hoverflag= true;
	var timeoutFunction;

	$(document).on('mouseenter','.el-regular-list li', function(e){		
			if(window.innerWidth>1023){
				$(this).find('.el-popup').hasClass('is_visible') ? $('.el-popup').removeClass('is_visible') : false;
					clearTimeout(timeoutFunction);
					// e.stopPropagation();
					$(this).find('.el-popup').addClass('is_visible');
					hoverflag = false;
			}
	});
	$(document).on('mouseleave','.el-regular-list li', function(){
			if(hoverflag){
					$('.el-popup').removeClass('is_visible');
			}else{
					timeoutFunction = setTimeout(function(){
							var curretflag = hoverflag;
							hoverflag = true;
							$('.el-popup').removeClass('is_visible');
					},1000);
			}
	});
	$(document).on('mouseenter','.el-popup', function(){
			hoverflag = true;
			clearTimeout(timeoutFunction);
	});
	$(document).on('mouseleave','.el-popup', function(){
			hoverflag = true;
			$('.el-popup').removeClass('is_visible');
	});

};
//info popup open

//scrol to set section
	var goTo = function(element){
		var currentElemArrey = document.querySelectorAll(element);
		currentElemArrey.forEach(function(item) {
			item.addEventListener('click', function(e){
				e.preventDefault();
				var targetitem = document.querySelector('.'+this.dataset.target);
				var targetPosition = targetitem.offsetTop;
				$('body,html').stop().animate({scrollTop:targetPosition},800);
			})
		}, this);
	}
//

//mobile menu toggle
var mobileMenuToggle = function(){
	$('.js-slide-down-menu').slideUp();
	$('.js-menu-button').on('click', function(e){
		e.stopPropagation();
		$('.js-slide-down-menu').slideToggle();
	})
	document.addEventListener('scroll',function(){
		$('.js-slide-down-menu').slideUp();
	})
	document.addEventListener('click',function(){
		$('.js-slide-down-menu').slideUp();
	})
	$('.js-slide-down-menu').on('click',function(e){
		e.stopPropagation();
	})
} 

var adaptationFlag = null;
if(window.innerWidth < 1024){
	adaptationFlag = true;
}else{
	adaptationFlag = false;
}

var adaptationScripts = function(){
	if(window.innerWidth < 1024 && adaptationFlag){
		adaptationFlag = false;
		if(document.querySelector('.el-regular-section')){
			var sectionEllementArray = Array.from(document.querySelectorAll('.el-regular-section'));
			sectionEllementArray.forEach(function(element) {
				if(element.querySelector('.el-section-img-column') && element.querySelector('.el-section-content-column')){
					var image_column = element.querySelector('.el-section-img-column');
					var content_column = element.querySelector('.el-section-content-column');
					var container = element.querySelector('.container');
					container.insertBefore(image_column, content_column); 
				}				
			}, this);
		}		
	}else if(window.innerWidth > 1024 && !adaptationFlag){
		adaptationFlag = true;
		if(document.querySelector('.el-regular-section')){
			var sectionEllementArray = Array.from(document.querySelectorAll('.el-regular-section'));
			sectionEllementArray.forEach(function(element) {
				if(element.querySelector('.el-section-img-column') && element.querySelector('.el-section-content-column') && element.className.match(/md-right/gi)){
					var image_column = element.querySelector('.el-section-img-column');
					var content_column = element.querySelector('.el-section-content-column');
					var container = element.querySelector('.container');
					container.insertBefore(content_column, image_column ); 
				}				
			}, this);
		}		
	}
}

var openItemList = function(triger, content){	
	if($(content).length && window.innerWidth< 1023){	
		$(content).slideUp();
		$(triger).on('click', function(){
			// $(content).slideUp();
			if($(this).find(content).length && window.innerWidth< 1023){
				$(this).find(content).slideToggle();
				$(this).closest('li').toggleClass('is_open');
			} else if(!$(this).find(content).length && window.innerWidth< 1023){
				$(this).next(content).slideToggle();
			}			
		})
	}
}

$(document).ready(function(){
	goTo('.js-scroll-button');
	slickSlideInit();
	setWidthTextSection();
	sameHeight('.js-same-height');
	infoPopupOpen();
	mobileMenuToggle();
	adaptationScripts();
	openItemList('.js-regular-list li','.js-sliding-content');
	openItemList('.el-footer-column h3','.el-footer-column ul');
});

$(window).resize(function(){
	adaptationScripts();
	if(window.innerWidth > 1023){
		$('.el-footer-column ul').slideDown();
	} else{
		$('.el-footer-column ul').slideUp();
	}
});

// custom jQuery validation
// add to validate form class 'js-validate'
// add to fields attr 'name'
//-----------------------------------------------------------------------------------
var validator = {
  init: function () {
    $('form').each(function () {
      var $form = $(this);
      var config = {
        errorElement : 'b',
        errorClass   : 'error',
        focusInvalid : false,
        focusCleanup : true,
        ignore: ":hidden:not(.enable-valid)",
        errorPlacement: function (error, element) {
          validator.setError($(element), error);
        },
        highlight: function (element, errorClass, validClass) {
          var $el     = validator.defineElement($(element));
          var $elWrap = $el.closest('.el-form-field');

          if ($el) $el.removeClass(validClass).addClass(errorClass);
          if ($elWrap.length) $elWrap.removeClass(validClass).addClass(errorClass);
        },
        unhighlight: function (element, errorClass, validClass) {
          var $el     = validator.defineElement($(element));
          var $elWrap = $el.closest('.el-form-field');

          if ($el) $el.removeClass(errorClass).addClass(validClass);
          if ($elWrap.length) $elWrap.removeClass(errorClass).addClass(validClass);
        }
      };
      if ($form.hasClass('js-validate')) {
        $form.validate(config);
      }
    });
  },
  setError: function ($el, message) {
    $el = this.defineElement($el);
    if ($el) this.domWorker.error($el, message);
  },
  defineElement: function ($el) {
    return $el;
  },
  domWorker: {
    error: function ($el, message) {
      var $elWrap = $el.closest('.el-form-field');
      $el.addClass('error');
      if ($elWrap.length) $elWrap.addClass('error');
      $el.after(message);
    }
  }
};

validator.init();

// validate by data attribute
//-----------------------------------------------------------------------------------
(function(){
  // add to validate field data-valid="test"
  //-----------------------------------------------------------------------------------
  var rules = {
    'user_password': {
      minlength: 6
    },
    'user_password_repeat': {
      minlength: 6,
      equalTo: '#user_password',
      messages: {
        equalTo: "Passwords doesn't same"
      }
    }
  };

  for (var ruleName in rules) {
    $('[data-valid=' + ruleName + ']').each(function(){
      $(this).rules('add', rules[ruleName]);
    });
  };
}());

// global messages
//-----------------------------------------------------------------------------------
$.validator.messages.minlength = 'At least {0} characters';

// custom rules
//-----------------------------------------------------------------------------------
$.validator.addMethod("email", function(value) {
  if (value == '') return true;
  var regexp = /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return regexp.test(value);
});

$.validator.addMethod("letters", function(value, element) {
  return this.optional(element) || /^[^1-9!@#\$%\^&\*\(\)\[\]:;,.?=+_<>`~\\\/"]+$/i.test(value);
});

$.validator.addMethod("digits", function(value, element) {
  return this.optional(element) || /^(\+?\d+)?\s*(\(\d+\))?[\s-]*([\d-]*)$/i.test(value);
});

$.validator.addMethod('dataValidError', function(value, element) {
  var $el = validator.defineElement($(element));

  return this.optional(element) || !$el.attr('data-valid-error');
});
