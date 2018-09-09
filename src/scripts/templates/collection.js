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
			sorterSelect: '[data-sorter-select]'
	};


	var $filter = $(selectors.filter); 


	Shopify.queryParams = {}; 

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
	}; 


	//
	// Initializes the filtering component behavior for a collection 
	//
	var initSorters = function() {

		var $sorterSelect = $(selectors.sorterSelect);
		var $sorterToggle = $(selectors.sorterToggle); 
		$sorterSelect.hide(); 

		$sorterToggle.on('click', function(event) {

			$sorterToggle.css('display', 'none'); 

			if($sorterSelect.css('display') === 'block') {
				$sorterSelect.hide(); 
				$(selectors.tagsToggle).css('opacity', 1); 
			} else {
				$sorterSelect.show();
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

			$sorterToggle.hide(); 
			$sorterSelect.show(); 
			$sorterSelect.val(Shopify.queryParams.sort_by); 

		}

		$sorterSelect.on('change', function(event) {
		 		Shopify.queryParams.sort_by = $(this).val(); 
		 		location.search = jQuery.param(Shopify.queryParams).replace(/\+/g, '%20'); 
		})

	}; 


	if($(selectors.filter).length > 0) {
		initFilters(); 
		initSorters();
	}

})();
