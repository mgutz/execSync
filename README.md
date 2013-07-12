# execSync

Executes shell commands synchronously.

Windows requires Python and Visual Studio 2012 (Express) installed for
node to build.

**NOT RECOMMENDED** on production servers.


## Install

    npm install execSync

## Usage

Require it

    var sh = require('execSync');

Execute shell commands. `exec` interlaces stdout and stderr to `result.stdout`.

    var result = sh.exec('echo $USER; echo some_err 1>&2; exit 1');
    console.log('return code ' + result.code);
    console.log('stdout + stderr ' + result.stdout);

## License

Copyright (c) 2012, 2013 Mario Gutierrez mario@mgutz.com

See the file LICENSE for copying permission.
