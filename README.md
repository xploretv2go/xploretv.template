# xploretv.template
<h2>What is xploretv.template</h2>

This is a WordPress template for the VEWD browser used on the XploreTV set top box (STB).
It supports several basic template elements like paragraphs, videos, image blocks, questionnaires and alike to get your started with your very first WordPress website with the STB user in mind.

<h2>How does this template work</h2>

This template is optimised for navigating through each section with your remote control.
The keys used are [Up], [Down], [Left], [Right], [OK] and [Back]. The theme uses the on screen keyboard of VEWD for additional functionality.

<h2>Technologies used</h2>

The template is based on third party CSS/Javascript libraries which are included in the template:

<ul>
  <li><a href="https://github.com/luke-chang/js-spatial-navigation">Spatial Navigation</a></li>
  <li><a href="https://getbootstrap.com/">Bootstrap</a></li>
  <li><a href="https://jquery.com/">jQuery</a></li>
  <li><a href="https://jqueryvalidation.org/">jQuery Validation Plugin</a></li>
  <li><a href="https://kenwheeler.github.io/slick/">Slick</a></li>
</ul>

The theme takes advantage of the following third party WordPress plugins. These plugins are strictly mandatory:

<ul>
  <li><a href="https://www.advancedcustomfields.com/">Advanced Custom Fields PRO</a></li>
</ul>

The following WordPress plugins are optional but strongly recommended:

<ul>
  <li><a href="https://de.wordpress.org/plugins/classic-editor/">Classic Editor</a></li>
  <li><a href="https://wordpress.org/plugins/polylang/">Polylang</a></li>
  <li><a href="https://github.com/xploretv2go/xploretv-zeroconf-plugin">xploretv.zeroconf.plugin</a></li>
</ul>

<h2>Installation and Setup</h2>

Please install and activate the following WordPress plugin:
<ul>
  <li>Advanced Custom Fields PRO</li>
</ul>

Install the xploretv WordPress theme by uploading all files to /wp-content/themes/xploretv/ and activate the theme via WordPress backend.

Import all ACF field groups as described here: https://www.advancedcustomfields.com/resources/synchronized-json/

Get ready to create your very first page!

<h2>How to update</h2>

Please make sure to check for ACF field group updates when updating the theme.

![Add ACF element](_docs/images/acf-sync-reminder.png)

<h2>Using and extending the theme</h2>

The theme can be extended to support additional content elements. Please refer to the <a href="_docs/README.md">extended documentation</a> for further information and how to use the theme.

<h2>Smart Home Device Detection - NUKI</h2>

The theme can detect a NUKI Smart Home Device via https://api.nuki.io/discover/bridges. If a device is found, the header element on the page displays a link to a dedicated page /devices/nuki/ where you can put your NUKI specific content. Once a device hwas found a cookie is set for 5 minutes to store the detected device and prevent flooding of the bridge discovery process.

If you need to extend the device detection to support additional Smart Home devices, please extend the header.php file.

For debugging NUKI we recommend to use the following plugin which is optional an extension to this theme: https://github.com/xploretv2go/xploretv-zeroconf-plugin.