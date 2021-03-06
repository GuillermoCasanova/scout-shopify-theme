/**
 * Header Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Header template.
 *
   * @namespace header
 */

theme.Header = (function() {

  var selectors = {
    offCanvasMenu: '[data-off-canvas-menu]',
    menuToggle: '[data-menu-toggle]',
    dropDownToggle: '[data-drop-down-toggle]',
    menuContainer: '[data-menu]',
    cartContainer: '[data-cart]',
    searchToggle: '[data-search-toggle]',
    searchModal: '[data-search-modal]',
    searchInput: '[data-search-input]'
  };

  var offCanvasMenu = $(selectors.offCanvasMenu);
  var searchModal = $(selectors.searchModal); 
  var searchInput = $(selectors.searchInput);
  var menuToggle = $(selectors.menuToggle); 
  var cartContainer = $(selectors.cartContainer);
  var menuContainer = $(selectors.menuContainer);
  var menuIsOpen = false; 
  var openSection = false; 


  var Header = function(container) {

    this.$container = $(container); 
    var $container = (this.$container = $(container));

    this.template = $container.attr('data-template');
    var loadingSection = false; 

    // ajaxCart.init will run from Product.prototype when on the product page
    if (this.template.indexOf('product') === -1) {
      ajaxCart.init({
        formSelector: '.add-to-cart__form',
        cartContainer: '#CartContainer',
        addToCartSelector: '.add-to-cart',
        enableQtySelectors: true,
        moneyFormat: theme.strings.moneyFormat
      });
    };


    function toggleNavigation() {
      offCanvasMenu.toggleClass('is-closed');
      offCanvasMenu.toggleClass('is-open');
      $('body').toggleClass('off-canvas-open'); 
      menuIsOpen = !menuIsOpen;
    }; 

    function toggleMenuIconStyles() {
      menuToggle.toggleClass('is-menu-open');
    }

    function toggleSearchModal() {
      searchModal.toggleClass('is-closed');
      searchModal.toggleClass('is-open');
      $('body').toggleClass('off-canvas-open'); 
      searchInput.focus();
    };

    //
    // Toggles Navigation and menu toggle icon
    //
    $(selectors.menuToggle).on('click', function(event) {
        toggleNavigation();
        toggleMenuIconStyles();
    }); 


    //
    // Code the dropdown menu on small devices 
    //
    $(selectors.dropDownToggle).on('click', function(event) {

      var $target = $(event.target); 
      var id = null; 

      if($target.data('toggle-id')) {
        id = $target.data('toggle-id'); 
      } else {
        id = $target.parent().data('toggle-id'); 
      }

      $('[data-toggle-id=' + id + ']').toggleClass('is-open'); 

      $('[data-drop-down-id]').each(function() {
        if($(this).hasClass('is-open') && $(this).data('drop-down-id') !== id) {
          $(this).removeClass('is-open');
        }
      });

      if($('[data-drop-down-id=' + id + ']').hasClass('is-open')) {
        $('[data-drop-down-id=' + id + ']').removeClass('is-open');
      } else {
        $('[data-drop-down-id=' + id + ']').addClass('is-open');
      }

    }); 


    //
    // Code to toggle search panel
    //
    $(selectors.searchToggle).on('click', function(event) {
      toggleSearchModal(); 
    });

    $('[data-collection]').on('click', function(event) {

      var collection = $(this).data('collection'); 
      
      sessionStorage.setItem('parentCollection', collection); 

    }); 


    //
    // Sets up transtion-delay on all links for stagger animation effect
    //
    var menuItems = $('.header__navigation__link');  

    for(var i = 0; i < menuItems.length; i++) {
      var item = menuItems[i]; 
      $(item).css('transition-delay', (.03 * i) + 's');
    }

  };


  //
  // Open cart global method  
  //
  Header.openCart = function() {
    offCanvasMenu.removeClass('is-closed');
    offCanvasMenu.addClass('is-open');
    cartContainer.addClass('is-showing');   
    openSection = 'cart';
    menuIsOpen = true;  
  }; 

  return Header;

})();




