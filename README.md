# `xcodegen` GitHub Action

A GitHub Action Wrapper for the delightful [`xcodegen`][xcodegen] CLI tool.

## Inputs

These correspond to the [`xcodegen generate` options][options]

* `cache-path`:
  Where the cache file will be loaded from and save to. Defaults to ~/.xcodegen/cache/{SPEC_PATH_HASH}
* `no-env`:
  Disable environment variable expansions
* `only-plists`:
  Generate only plist files
* `project`:
The path to the directory where the project should be generated. Defaults to the directory the spec is in. The  filename is defined in the project spec
* `quiet`:
  Suppress all informational and success output
* `spec`:
  The path to the project spec file. Defaults to project.yml
* `use-cache`:
  Use a cache for the xcodegen spec. This will prevent unnecessarily generating the project if nothing has changed


## Example usage

```yaml
uses: xavierLowmiller/xcodegen-action@1.0.0
with:
  spec: project.yaml
  quiet: true
```

[xcodegen]: https://github.com/yonaskolb/XcodeGen
[options]: https://github.com/yonaskolb/XcodeGen#usage
