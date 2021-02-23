<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage XploreTV_SmartHome
 * @since XploreTV Smart Home 1.0
 */

get_header();
?>

<main role="main">
    <?php
    $content_elements = get_field('content_elements', get_the_ID());
    if ( isset( $content_elements ) ) {
        $section_index = 0;
        foreach ( $content_elements as $single_element ) {
            // Fallback
            if ($single_element['acf_fc_layout'] == 'section_h') {
                $single_element['acf_fc_layout'] = 'section_g';
            }
            $call_f_name = "content_element_" . $single_element['acf_fc_layout'];
            $call_f_name( $single_element, $section_index );
            $section_index++;
        }
    }
    ?>
</main><!-- #site-content -->

<?php
get_footer();
