<?php
// Section H - Zeroconf Debugger
function content_element_section_h($all_data, $section_index) {
    //$detectUrl = 'https://localhost/a1/xploretv/v1/zeroconf';
    $detectUrl = 'http://zeroconf:15051/a1/xploretv/v1/zeroconf';
    ?>
    <!-- section_h -->
    <section id="section_<?= $section_index ?>" class="xploretv-h">
        <h3>Zeroconf API</h3>
        <p>Showing response from <a href="<?= $detectUrl ?>" class="focusable"><?= $detectUrl ?></a></p>
        <textarea style="width: 100%; height: 50vh; font-size: 13px; background-color: white; color: black !important;" class="focusable" id="zeroconf_debug"></textarea>

        <script>
            window.addEventListener('load', function() {

                const detection_url = '<?= $detectUrl ?>';
                var request = $.ajax({
                    url: detection_url,
                    method: "GET"
                });

                request.done(function( msg ) {
                    $('#zeroconf_debug').val(JSON.stringify(msg));
                });

                request.fail(function( jqXHR, textStatus ) {
                    $('#zeroconf_debug').val( "Request failed: " + textStatus );
                });

                // Add section to SN
                SpatialNavigation.add('section_<?= $section_index ?>', {
                    selector: '#section_<?= $section_index ?> .focusable',
                    leaveFor: {
                        up: '@section_<?= $section_index - 1 ?>',
                        down: '@section_<?= $section_index + 1 ?>',
                        left: '',
                        right: ''
                    }
                });
            });
        </script>
    </section>
    <?php
}
