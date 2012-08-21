# JSReload

This project contains several scripts that help with automatically reloading a tab in Safari whenever a file changes:

1. `tools/watchdir.js` watches all .html and .css files in a directory and reloads the first tab in the first window when one of them changes.
2. `grunt.js` watches all .asc files in its directory. If one of them changes, it converts it to HTML via the `asciidoc` command and then reloads Safari.

Prerequisites:

- Node.js
- [Grunt](http://gruntjs.com/) (only needed for option #2)
- Mac OS X (reloading Safari is done via AppleScript)
