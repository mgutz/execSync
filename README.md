__THIS PROJECT IS NO LONGER MAINTAINED. Please seek other alternatives.__

* the project cannot be updated on npm due to camelCased title
* i no longer do Windows
* both iojs and node.js v0.12 have execSync function
* older node users can try sync-exec from npm (suggested by one of the commentors)

# execSync

Executes shell commands synchronously.

__WARNING__ For dev machine shell scripting only. **DO NOT USE** for
production servers.

## Install

__Windows__ requires Python and Visual Studio 2012 (Express) installed for
node to build. See [node-gyp installation](https://github.com/TooTallNate/node-gyp#installation).
Pre-built binaries for node v0.8 and node v0.10 are packaged. They should work and if not try manually
building.

    npm install execSync

Sometimes a manual build is necessary on Windows even with all the tools in place, replace Visual Studio version
with '2010' or '2012' based on the version installed.

    npm install node-gyp -g
    node-gyp rebuild --msvs_version=2012

## Usage

Require it

    var sh = require('execSync');

`Run` does not capture output.

    var code = sh.run('echo $USER; echo some_err 1>&2; exit 1');
    console.log('return code ' + code);

Use the less efficient `exec` if you need output. `exec` is just redirection
trickery around `run`.

    var result = sh.exec('echo $USER; echo some_err 1>&2; exit 1');
    console.log('return code ' + result.code);
    console.log('stdout + stderr ' + result.stdout);

## Notes

In *nix and OSX version commands are run via `sh -c YOUR_COMMAND`

In __Windows__ commands are run via `cmd /C YOUR_COMMAND`

## License

Copyright (c) 2012, 2013 Mario Gutierrez mario@mgutz.com

See the file LICENSE for copying permission.
