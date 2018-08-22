/**
 * Collection Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the collection page 
 * template.
 *
 * @namespace collecton
 */
theme.collection = (function() {

	var selectors = {
			filter: '[data-collection-filter]',
			tagsToggle: '[data-tags-toggle]',
			sorterToggle: '[data-sorter-toggle]',
			tags: '[data-tags-list]',
			sorterItems: '[data-sorter-list]'
	};


	var $filter = $(selectors.filter); 


	Shopify.queryParams = {}; 

	Shopify.queryParams.parentCollection = location;
	
	console.log(sessionStorage.getItem('parentCollection')); 

	//
	// Initializes the filtering component behavior for a collection 
	//
	var initFilters = function() {

		$(selectors.tags).hide(); 

		$tags = $(selectors.tags); 

		$(selectors.tagsToggle).on('click', function() {
			if($tags.css('display') === 'block') {
				$tags.slideUp("slow");
				$(selectors.sorterToggle).css('opacity', 1); 
			} else {
				$tags.slideDown("slow"); 
				$(this).css('opacity', 1); 
				$(selectors.sorterToggle).css('opacity', .5); 
			}
		});

		// if(location.search.length) {

		// 	for(var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
		// 		aKeyValue = aCouples[i].split('='); 
		// 		if(aKeyValue.length > 1) {
		// 			Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]); 
		// 		}
		// 	}		

		// 	$('[data-current-filter]').text($('[data-select=' + Shopify.queryParams.q + ']').text()); 	
		// }


		$('[href="#show-all"]').attr('href', '/collections/' + sessionStorage.getItem('parentCollection')); 

		$('[href="#filter"]').on('click', function(event) {
			event.preventDefault(); 
			 var tag = $(this).data('filter');
			location = ('/collections/' +  tag).replace(/\+/g, '%20');  
		}); 
	}; 


	//
	// Initializes the filtering component behavior for a collection 
	//
	var initSorters = function() {

		var $sorterItems = $(selectors.sorterItems);
		$sorterItems.hide(); 

		$(selectors.sorterToggle).on('click', function() {
			if($sorterItems.css('display') === 'block') {
				$sorterItems.slideUp("slow"); 
				$(selectors.tagsToggle).css('opacity', 1); 
			} else {
				$sorterItems.slideDown("slow"); 
				$(this).css('opacity', 1); 
				$(selectors.tagsToggle).css('opacity', .5); 
			}
		});


		if(location.search.length) {

			for(var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {

				aKeyValue = aCouples[i].split('='); 

				if(aKeyValue.length > 1) {
					Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]); 
				}
			}		

			$('[data-current-sort]').text($('[data-select=' + Shopify.queryParams.sort_by + ']').text()); 

		}

		$('[href="#sort"]').on('click', function(event) {
					event.preventDefault();
			 		Shopify.queryParams.sort_by = $(this).data('select'); 
			 		location.search = jQuery.param(Shopify.queryParams).replace(/\+/g, '%20'); 
		})

	}; 


	if($(selectors.filter).length > 0) {
		initFilters(); 
		initSorters();
	}


})();