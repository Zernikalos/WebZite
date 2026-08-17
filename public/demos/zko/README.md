# ZKO assets (shared)

Place binary `.zko` files here so **Android** (via `android/app` `assets.srcDir`), **web demos** (`web/examples/*.html` → `../../assets/zko/...`), and **iOS** (`apple/ZernikalosDemoApp` folder reference) use the **same** files.

Expected layout (matches demo URLs):

- `gltf/Fox.zko`
- `gltf/soldier2.zko`
- `collada/stormtrooper/stormtrooper.zko`

The Android build only adds this folder to the APK when `assets/zko` exists; if it is missing, add these files before building or running the GL samples.
