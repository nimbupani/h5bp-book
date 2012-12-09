<?php
/**
 * Return a themed breadcrumb trail.
 *
 * @param $breadcrumb
 *   An array containing the breadcrumb links.
 * @return
 *   A string containing the breadcrumb output.
 */
function corporateclean_breadcrumb($variables){
  $breadcrumb = $variables['breadcrumb'];
  if (!empty($breadcrumb)) {
    $breadcrumb[] = drupal_get_title();
    return '<div class="breadcrumb">' . implode(' <span class="breadcrumb-separator">/</span> ', $breadcrumb) . '</div>';
  }
}

/**
 * Override or insert variables into the html template.
 */
function corporateclean_process_html(&$vars) {
  // Hook into color.module
  if (module_exists('color')) {
    _color_html_alter($vars);
  }
}

/**
 * Override or insert variables into the page template.
 */
function corporateclean_process_page(&$variables) {
  // Hook into color.module.
  if (module_exists('color')) {
    _color_page_alter($variables);
  }
 
}

function corporateclean_form_alter(&$form, &$form_state, $form_id) {
  if ($form_id == 'search_block_form') {
  
    unset($form['search_block_form']['#title']);
	
    $form['search_block_form']['#title_display'] = 'invisible';
	$form_default = t('Search');
    $form['search_block_form']['#default_value'] = $form_default;
    $form['actions']['submit'] = array('#type' => 'image_button', '#src' => base_path() . path_to_theme() . '/images/search-button.png');

 	$form['search_block_form']['#attributes'] = array('onblur' => "if (this.value == '') {this.value = '{$form_default}';}", 'onfocus' => "if (this.value == '{$form_default}') {this.value = '';}" );
  }
}

/**
 * Add javascript files for jquery slideshow.
 */
if (theme_get_setting('slideshow_js','corporateclean')):

	drupal_add_js(drupal_get_path('theme', 'corporateclean') . '/js/vendor/jquery.cycle.all.min.js');
	
	//Initialize slideshow using theme settings
	$effect=theme_get_setting('slideshow_effect','corporateclean');
	$effect_time=theme_get_setting('slideshow_effect_time','corporateclean')*1000;
	
	//Defined the initial height (300) of slideshow and then the slideshow inherits the height of each slider item dynamically
	drupal_add_js('jQuery(document).ready(function($) {  
	
	$("#slideshow").cycle({
		fx:    "'.$effect.'",
		speed:  "slow",
		timeout: "'.$effect_time.'",
		pager:  "#slider-navigation",
		pagerAnchorBuilder: function(idx, slide) {
			return "#slider-navigation li:eq(" + (idx) + ") a";
		},
		height: 300,
		after: onAfter
	});
	
	function onAfter(curr, next, opts, fwd){
		var $ht = $(this).height();
		$(this).parent().animate({height: $ht});
	}
	
	});',
	array('type' => 'inline', 'scope' => 'header', 'weight' => 5)
	);

endif;

?>