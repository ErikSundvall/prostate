The PDF form, and the image png-files screnshotted from it in the /background
subdirectory, represents radiology (MRT) evaluation part of a prostate cancer
summary that is used in a multidisciplinary pretreatment conference. The image
#file:swedish-combined-image.png shows the images combined in better resolution,
but with Swedish text. Now we want to make a vector graphics based
Javascript/html/svg widget, or combination of several widgets, that can show the
prostate "maps" in the PNGs, but rather as SVG images that we can manipulate and
colour dynamically based on selections. We want to be able to highlight the
different zones in different colours dependiong on where lesions are found. The
zones shall be systematically named according to the three-dimentional
"coordinate" system seen in the images. Name pattern examples are `1Cv` or `1Cd`
where coordinate dimensions are:

- 1 to 4 is a left to right division where 1 is rightmost and 4 is leftmost.
- A = base (uppermost), B = mid, C = apex (lowest)
- v = ventral (front), d = dorsal (back)

The swedish guidline for using this is available at
https://kunskapsbanken.cancercentrum.se/diagnoser/prostatacancer/vardprogram/mall-for-lokalisering-av-fynd-vid-mr-prostata/
