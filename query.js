jQuery(document).ready(function () {
  swatchImage();
  if (jQuery(".pewc-group-content-wrapper").length) {
    var blind_lable = '<ul class="blinds_lable"><li class="width">Width</li><li class="height">Height</li></ul>';
    jQuery(blind_lable).insertBefore(".pewc-group-wrap.first-group .pewc-group-content-wrapper ul");
    jQuery("#pewc-grand-total-label").html("Approx. Cost");
  }

  jQuery("select.pewc-form-field").change(function () {
    console.log("Option Changed");
    if (jQuery(".single_add_to_cart_button").attr('disabled')) {
      console.log("Button disabled");
      jQuery("button.single_add_to_cart_button").hide();
      jQuery(".pewc-total-field-wrapper").hide();
      jQuery("div.addtocart_customquote").html("<a href='https://staging.spotblinds.com/custom-quote/' class='no_margin single_add_to_cart_button button'>Contact Us For Custom Quote</a>");
    } else {
      console.log("Price available");
      jQuery(".pewc-total-field-wrapper").show();
      jQuery("button.single_add_to_cart_button").show();
      jQuery("a.single_add_to_cart_button").hide();
    }
  });
  jQuery("li.variable-item").click(function () {
    var selected_color = jQuery(this).attr("title");
    jQuery("input[name=selected_color]").val(selected_color);
  });
  jQuery(".pewc-item[data-field-label='color'] .pewc-radio-image-wrapper").click(function () {
    var selected_color = jQuery(".pewc-item[data-field-label='color'] .pewc-radio-image-wrapper.checked input[type=radio]").val();
    console.log(selected_color);
    jQuery("input[name=selected_color]").val(selected_color);
  });
  sticky_cart();
});
function sticky_cart() {
  if (jQuery('body').hasClass('single-product')) {
    var appendText = '<div class="fixed-box"><div class="inner-box"><div class="inner-content"><h2 class="prd-title"></h2><span class="prd-price"></span><a href="#" class="btn-add-cart">Add to cart</a></div></div></div>';
    jQuery('.nectar-prod-wrap').prepend(appendText)
    jQuery('h2.prd-title').text(jQuery('.product_title').text());
    jQuery('span.prd-price').html(jQuery('#pewc-grand-total .woocommerce-Price-amount bdi').html());
    jQuery('body').on('click', function () {
      setTimeout(function () {
        //console.log('changed',jQuery('#pewc-grand-total .woocommerce-Price-amount bdi').html());
        jQuery('span.prd-price').html(jQuery('#pewc-grand-total .woocommerce-Price-amount bdi').html());
      }, 600);

    });
    jQuery('.nectar-prod-wrap').on('click', 'a.btn-add-cart', function (e) {
      e.preventDefault();
      jQuery('button.my-cart').trigger('click');
    });

    jQuery(window).scroll(function () {
      jQuery('span.prd-price').html(jQuery('#pewc-grand-total .woocommerce-Price-amount bdi').html());
      var sticky = jQuery('.fixed-box'),
        scroll = jQuery(window).scrollTop();

      if (scroll >= 600) sticky.addClass('fixed-sticky');
      else sticky.removeClass('fixed-sticky');
    });
    var galleryHeight = jQuery('.single-product-main-image').height();
    var offestTop = jQuery('.single-product-main-image').offset().top;
    var offestleft = jQuery('.single-product-main-image').offset().left;
    // var offsetBottom = jQuery('.after-product-summary-clear').offset().top - galleryHeight;
    jQuery(window).scroll(function () {
      var sticky1 = jQuery('.single-product-main-image'),
        scroll = jQuery(window).scrollTop();
      var bottomScroll = jQuery('.wc-tabs-wrapper').offset().top - 500;

      if (scroll >= offestTop && scroll <= bottomScroll) {
        sticky1.addClass('fixed-sticky1').css('left', offestleft);
      }
      else sticky1.removeClass('fixed-sticky1').css('left', 'auto');

    });
  }
}
function swatchImage() {
  jQuery('body .pewc-columns-4 .pewc-radio-image-wrapper').on('click', function () {
    var imgSrc = jQuery(this).find(' label img').attr('data-src');
    jQuery('.woocommerce div.product div.images .woocommerce-product-gallery__image:first-child a').html('<img src="' + imgSrc + '">');
    jQuery('.woocommerce div.product div.images .woocommerce-product-gallery__wrapper .zoomImg').attr('src', imgSrc);
    // jQuery('.woocommerce div.product div.images .woocommerce-product-gallery__image img').attr('src', imgSrc);
  });
}