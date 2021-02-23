<?php
// Section C - 2 Column Text an Image
function content_element_section_c($all_data, $section_index) {
    ?>
    <!-- section_c -->
    <section id="section_<?= $section_index ?>" class="a1xploretv-g bg-white">
        <div class="a1xploretv-g-container h-100">
          <div class="d-flex align-items-center text-center h-100 <?php if (empty($all_data['button-href'])) { ?>focusable<?php } ?>">
                <?php if ($all_data['image-left-or-right'] == 'right') { ?>
                  <div class="a1xploretv-g-left">
                    <div class="h1 h-bold"><?= $all_data['headline'] ?></div>
                    <p>
                      <?= nl2br($all_data['copy']) ?>
                    </p>

                    <?php if ($all_data['button-label']) { ?>
                      <p>
                        <a href="<?= parseLink($all_data['button-href']) ?>" class="button a1xploretv-icon arrowright focusable"><?= $all_data['button-label'] ?></a>
                      </p>
                    <?php } ?>

                    <?php if ($all_data['mobile_app'] == 'yes') { ?>
                      <p class="mt-5 mb-4">Finden Sie unsere App </p>
                      <div class="d-flex justify-content-center">
                          <a href="https://play.google.com/" class="mr-3">
                              <img src="/wp-content/themes/<?php echo get_template(); ?>/images/google-play-smarthome.png" alt="Google Play" />
                          </a>
                          <a href="https://www.apple.com/app-store/"  class="">
                              <img src="/wp-content/themes/<?php echo get_template(); ?>/images/apple-app-smarthome.png" alt="Apple Store" />
                          </a>
                      </div>
                    <?php } ?>
                  </div>
                  <div class="a1xploretv-g-right">
                      <img src="<?= $all_data['image']['url'] ?>" alt="<?= $all_data['image']['alt'] ?>">
                  </div>
                <?php } else { ?>
                  <div class="a1xploretv-g-left order-2">
                    <div class="h1 h-bold"><?= $all_data['headline'] ?></div>
                    <p>
                      <?= nl2br($all_data['copy']) ?>
                    </p>

                    <?php if ($all_data['button-label']) { ?>
                      <p>
                        <a href="<?= parseLink($all_data['button-href']) ?>" class="button a1xploretv-icon arrowright focusable"><?= $all_data['button-label'] ?></a>
                      </p>
                    <?php } ?>

                    <?php if ($all_data['mobile_app'] == 'yes') { ?>
                      <p class="mt-5 mb-4">Finden Sie unsere App </p>
                      <div class="d-flex justify-content-center">
                          <a href="https://play.google.com/" class="mr-3">
                              <img src="/wp-content/themes/<?php echo get_template(); ?>/images/google-play-smarthome.png" alt="Google Play" />
                          </a>
                          <a href="https://www.apple.com/app-store/"  class="">
                              <img src="/wp-content/themes/<?php echo get_template(); ?>/images/apple-app-smarthome.png" alt="Apple Store" />
                          </a>
                      </div>
                    <?php } ?>
                  </div>
                  <div class="a1xploretv-g-right order-1">
                      <img src="<?= $all_data['image']['url'] ?>" alt="<?= $all_data['image']['alt'] ?>">
                  </div>
                <?php } ?>
            </div>
        </div>
    </section>

    <script>
        window.addEventListener('load', function() {
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

    <?php
}
