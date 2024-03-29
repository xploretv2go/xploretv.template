<?php
$filepath_a1 = explode("wp-content", __FILE__)[0] . "wp/wp-load.php";
$filepath_regular = explode("wp-content", __FILE__)[0] . "wp-load.php";
if (file_exists($filepath_a1)) {
  require_once($filepath_a1);
} else if (file_exists($filepath_regular)) {
  require_once($filepath_regular);
} else {
  echo 'File can not be loaded in ' . __FILE__ . ' in line ' . __LINE__;
  die();
}

/**
 * Search for a pattern in a string and replace it with the home URL of the website.
 *
 * @param string  $url
 * @param string  $search_pattern   Defaults is '#homeurl#'
 * @return string
 */
function parseLink($url, $search_pattern = '#homeurl#') {
  $replace = get_home_url();
  if (strpos($url, $search_pattern) !== false) {
    $url = str_replace($search_pattern, $replace, $url);
  }
  return $url;
}

require_once('section_a.php');
require_once('section_b.php');
require_once('section_c.php');
require_once('section_d.php');
require_once('section_e.php');
require_once('section_f.php');
require_once('section_g.php');
require_once('section_h.php');
require_once('section_j.php');
require_once('section_k.php');
require_once('section_l.php');
require_once('section_m.php');
require_once('section_o.php');
