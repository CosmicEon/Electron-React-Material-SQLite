# Electron debug tool
require('devtron').install()

# Electron SQLite3 Integration
## Method 1
THIS

npm install -g windows-build-tools

npm install –g node-gyp

PLUS THIS

npm install electron-rebuild && node_modules.bin\electron-rebuild

EQUAL - no more problem on Windows 10

## Method 2
When trying to use the node-sqlite3 module in Electron I got the error:

    Error: Cannot find module '/path/to/my/application/node_modules/sqlite3/lib/binding/electron-v1.4-linux-x64/node_sqlite3.node'

Using Ubuntu 16.04 with Node 7.1.0 and Electron 1.4.12.

I read the following:

* [Similar issue](https://github.com/TryGhost/Ghost/issues/5911)
* [Guide to windows integration](https://gist.github.com/maximilian-ruppert/9de273f72c1ba4aa62d6)
* [Read near the end](https://translate.google.com/translate?hl=en&sl=ja&u=http://qiita.com/noobar/items/0128677c44bb9dde88b2&prev=search)

And managed to solve things by:

Install node-gyp globally

    npm install -g -save node-gyp

Install sqlite3

    npm install --save sqlite3

Navigate into the sqlite3 module folder

    cd node_modules/sqlite3

Install the modules dependencies

    npm install

Prebulish the module

    npm run prepublish

Check which binding exists, In this case `node-v51-linux-x64`

    ls lib/binding/

Start compilation by setting the module path to the correct binding/version 

    node-gyp configure --module_name=node_sqlite3 --module_path=../lib/binding/node-v51-linux-x64

Finish compilation by setting your build to the correct `target` version. You will find the `target` version of your Electron-App in the `version` file in the root folder of your Electron directory.

    node-gyp rebuild --target=1.4.12 --arch=x64 --target_platform=linux --dist-url=https://atom.io/download/atom-shell --module_name=node_sqlite3 --module_path=../lib/binding/node-v51-linux-x64

Rename the binding folder so that it is the same as the module that it could not find in the error

    mv lib/binding/node-v51-linux-x64/ lib/binding/electron-v1.4-linux-x64/

Now you can use sqlite3 in your Electron app.

Further example:

    node-gyp configure --module_name=node_sqlite3 --module_path=../lib/binding/[DIR]
    node-gyp rebuild --target=[ELEC-VER] --arch=[ARCH] --target_platform=[PLATFORM] --dist-url=https://atom.io/download/atom-shell --module_name=node_sqlite3 --module_path=../lib/binding/node-[NODE-VER]-[PLATFORM]-[ARCH]

    Placeholder   Value
    [DIR]         The name of the directory called "Can not find" in the preliminary survey
    [ELEC-VER]    Version of Electron.
    [ARCH]        In the case of 32Bit ia32
                  In the case of 64Bit x64
    [PLATFORM]    In the case of Windows win32
                  In the case of Mac darwin
                  In the case of Linux linux
    [NODE-VER]    ls lib/binding/ => in this case `node-v51-linux-x64`