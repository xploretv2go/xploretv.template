<?php

// Include settings
require_once('_functions/acf.php');
require_once('_functions/acf_content_elements.php');

/**
 * Register and Enqueue Styles.
 */
function seso_register_styles() {
    $theme_version = wp_get_theme()->get( 'Version' );

    wp_register_style('a1xploretv-css-bootstrap', get_template_directory_uri() . '/lib/css/bootstrap.min.css', array(), $theme_version);
    wp_register_style('a1xploretv-css-slick', get_template_directory_uri() . '/lib/css/slick.css', array(), $theme_version);
    wp_register_style('a1xploretv-style', get_template_directory_uri() . '/assets/css/style.min.css', array(), $theme_version);

    wp_enqueue_style( 'a1xploretv-css-bootstrap');
    wp_enqueue_style( 'a1xploretv-css-slick');
    wp_enqueue_style( 'a1xploretv-style');
}

add_action( 'wp_enqueue_scripts', 'seso_register_styles' );

/**
 * Register and Enqueue Scripts.
 */
function seso_register_scripts() {

	$theme_version = wp_get_theme()->get( 'Version' );

	if ( ( ! is_admin() ) && is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

    wp_register_script('a1xploretv-js-jquery', get_template_directory_uri() . '/lib/js/jquery-3.5.1.min.js', array(), $theme_version, true);
    wp_register_script('a1xploretv-js-bootstrap', get_template_directory_uri() . '/lib/js/bootstrap.min.js', array(), $theme_version, true);
    wp_register_script('a1xploretv-js-slick', get_template_directory_uri() . '/lib/js/slick.min.js', array(), $theme_version, true);
    wp_register_script('a1xploretv-js-validate', get_template_directory_uri() . '/lib/js/jquery.validate.min.js', array(), $theme_version, true);
    wp_register_script('a1xploretv-js-spatial-navigation', get_template_directory_uri() . '/lib/js/spatial_navigation.js', array(), $theme_version, true);
    wp_register_script('a1xploretv-js', get_template_directory_uri() . '/assets/js/script.min.js', array(), $theme_version, true);

    wp_enqueue_script( 'a1xploretv-js-jquery');
    wp_enqueue_script( 'a1xploretv-js-bootstrap');
    wp_enqueue_script( 'a1xploretv-js-slick');
    wp_enqueue_script( 'a1xploretv-js-validate');
    wp_enqueue_script( 'a1xploretv-js-spatial-navigation');
    wp_enqueue_script( 'a1xploretv-js');

    wp_script_add_data( 'a1xploretv-js', 'async', true );
}

/**
 * Encrypt a string based on NONCE_KEY
 */
function seso_encrypt($plaintext) {
	$cipher = 'AES-128-CBC';
	if (in_array($cipher, openssl_get_cipher_methods())) {
		$ivlen = openssl_cipher_iv_length($cipher);
    $iv = openssl_random_pseudo_bytes($ivlen);
		$ciphertext_raw = openssl_encrypt($plaintext, $cipher, NONCE_KEY, $options = OPENSSL_RAW_DATA, $iv);
		$hmac = hash_hmac('sha256', $ciphertext_raw, NONCE_KEY, $as_binary = true);
		$cipertext = base64_encode($iv . $hmac . $ciphertext_raw);
		return $cipertext;
	}
	return false;
}

/**
 * Decrypt a string based on NONCE_KEY
 */
function seso_decrypt($data) {
	$cipher = 'AES-128-CBC';
	if (in_array($cipher, openssl_get_cipher_methods())) {
		$c = base64_decode($data);
		$ivlen = openssl_cipher_iv_length($cipher);
    $iv = substr($c, 0, $ivlen);
		$hmac = substr($c, $ivlen, $sha2len = 32);
		$ciphertext_raw = substr($c, $ivlen + $sha2len);
		$original_plaintext = openssl_decrypt($ciphertext_raw, $cipher, NONCE_KEY, $options = OPENSSL_RAW_DATA, $iv);
		$calcmac = hash_hmac('sha256', $ciphertext_raw, NONCE_KEY, $as_binary = true);
		if (hash_equals($hmac, $calcmac)) {
    	return $original_plaintext;
		}
	}
	return false;
}

add_action( 'wp_enqueue_scripts', 'seso_register_scripts' );

// Add theme option footer content to page template
function add_script_to_footer() {
	echo get_field('footer_content', 'option');
}
add_action('wp_footer', 'add_script_to_footer');

// Add theme option header content to page template
function add_script_to_header() {
	echo get_field('header_content', 'option');
}
add_action('wp_header', 'add_script_to_header');
