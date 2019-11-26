# scratch-desktop

Scratch 3.0 as a standalone desktop application

## Developer Instructions

### Prepare `scratch-gui`

This step is temporary: eventually, the `scratch-desktop` branch of the Scratch GUI repository will be merged with
that repository's main development line. For now, though, there's a separate branch:

1. Clone the `scratch-gui` repository if you haven't already.
2. Switch to the `scratch-desktop` branch with `git checkout scratch-desktop`
3. Build with `BUILD_MODE=dist` and `STATIC_PATH=static`:
   - macOS, WSL, or Cygwin: run `BUILD_MODE=dist STATIC_PATH=static npm run build` or
     `BUILD_MODE=dist STATIC_PATH=static npm run watch`
     - Running `npm run build-gui` in `scratch-desktop` is a shortcut for this when using `npm link`.
   - CMD: run `set BUILD_MODE=dist` once and `set STATIC_PATH=static` once, then `npm run build` or `npm run watch`
     any number of times in the same
     window.
   - PowerShell: run `$env:BUILD_MODE = "dist"` once and `$env:STATIC_PATH = "static"` once, then `npm run build` or
     `npm run watch` any number of times in the same window.

If you have run `npm link scratch-gui` (or equivalent) in the `scratch-desktop` working directory, you may be able to
accomplish the above by running `npm run build-gui` in the `scratch-desktop` directory instead of using the manual
steps listed above.

### Prepare media library assets

In the `scratch-desktop` directory, run `npm run fetch`. Re-run this any time you update `scratch-gui` or make any
other changes which might affect the media libraries.

### Run in development mode

`npm start`

### Make a packaged build

`npm run dist`

Node that on macOS this will require installing various certificates.

#### Signing the NSIS installer (Windows, non-store)

*This section is relevant only to members of the Scratch Team.*

By default all Windows installers are unsigned. An APPX package for the Microsoft Store shouldn't be signed: it will
be signed automatically as part of the store submission process. On the other hand, the non-Store NSIS installer
should be signed.

To generate a signed NSIS installer:

1. Acquire our latest digital signing certificate and save it on your computer as a `p12` file.
2. Set `WIN_CSC_LINK` to the path to your certificate file. For maximum compatibility I use forward slashes.
   - CMD: `set WIN_CSC_LINK=C:/Users/You/Somewhere/Certificate.p12`
   - PowerShell: `$env:WIN_CSC_LINK = "C:/Users/You/Somewhere/Certificate.p12"`
3. Set `WIN_CSC_KEY_PASSWORD` to the password string associated with your P12 file.
   - CMD: `set WIN_CSC_KEY_PASSWORD=superSecret`
   - PowerShell: `$env:WIN_CSC_KEY_PASSWORD = "superSecret"`
4. Build the NSIS installer only: building the APPX installer will fail if these environment variables are set.
   - `npm run dist -- -w nsis`

### Make a semi-packaged build

This will simulate a packaged build without actually packaging it: instead the files will be copied to a subdirectory
of `dist`.

`npm run dist:dir`

### Debugging

You can debug the renderer process by opening the Chromium development console. This should be the same keyboard
shortcut as Chrome on your platform. This won't work on a packaged build.

You can debug the main process the same way as any Node.js process. I like to use Visual Studio Code with a
configuration like this:

```jsonc
    "launch": {
        "version": "0.2.0",
        "configurations": [
            {
                "name": "Desktop",
                "type": "node",
                "request": "launch",
                "cwd": "${workspaceFolder:scratch-desktop}",
                "runtimeExecutable": "npm",
                "autoAttachChildProcesses": true,
                "runtimeArgs": ["start", "--"],
                "protocol": "inspector",
                "skipFiles": [
                    // it seems like skipFiles only reliably works with 1 entry :(
                    //"<node_internals>/**",
                    "${workspaceFolder:scratch-desktop}/node_modules/electron/dist/resources/*.asar/**"
                ],
                "sourceMaps": true,
                "timeout": 30000,
                "outputCapture": "std"
            }
        ]
    },
```
