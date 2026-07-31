Interface icons live in the inline <svg> sprite at the top of index.html.

They are inline rather than separate files for two reasons: an SVG loaded
through <img> cannot inherit currentColor, so it would render black instead of
gold; and inlining removes a dozen network requests.

Event icons are mirrored as editable files in ../events/.
