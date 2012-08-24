# JSReload

This project contains several scripts that help with automatically reloading a tab in a browser whenever a file changes:

1. `tools/watchdir.js` watches all webdev files (.html, .css, .js) in a directory and reloads the first tab of the frontmost browser window when one of them changes.
2. `tools/watchfile.js` opens a file in a web browser, watches it and reloads the first tab of the frontmost browser window if it changes.
3. `grunt.js` is a Grunt build script. You put it inside a project directory. Its `watch` task is invoked as follows.

        grunt watch
        
   This task watches all .asc files in the project directory. If one of them changes, it is converted to HTML via the `asciidoc` command. Afterwards, the first tab of the frontmost browser window is reloaded.

All scripts depend on `node_modules/jsreload`. Safari is currently used by the scripts, but that can easily be changed to Chrome by replacing

    jsreload.runReloadSafari(...);
    
with

    jsreload.runReloadChrome(...);

## Requirements

- Supported browsers: Safari, Chrome
- Mac OS X (reloading a browser currently depends on AppleScript)
- Node.js
  - Package: underscore (trivial to install via npm)
- [Grunt](http://gruntjs.com/) (only needed for option #2)
