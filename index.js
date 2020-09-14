const core = require('@actions/core');
const exec = require('@actions/exec')
const os = require('os');

try {
  main()
} catch (error) {
  core.setFailed(error.message);
}

async function installXcodegen() {
  const xcodegenDir = os.homedir() + '/action-xcodegen/'
  const zipFile = xcodegenDir + 'xcodegen.zip'
  const version = core.getInput('version')
  await exec.exec('curl', [
    '--silent',
    '--create-dirs',
    '--location',
    '--output',
    zipFile,
    `https://github.com/yonaskolb/XcodeGen/releases/download/${version}/xcodegen.zip`
  ])
  await exec.exec('unzip', ['-q', '-o', zipFile], { cwd: xcodegenDir })
  await exec.exec('rm', [zipFile])
  await exec.exec('xcodegen/install.sh', null, { cwd: xcodegenDir })
  await exec.exec('rm -rf', [xcodegenDir])
}

async function runXcodegen() {
  const input = {
    cachePath:  core.getInput('cache-path'),
    noEnv:      core.getInput('no-env'),
    onlyPlists: core.getInput('only-plists'),
    project:    core.getInput('project'),
    quiet:      core.getInput('quiet'),
    spec:       core.getInput('spec'),
    useCache:   core.getInput('use-cache')
  }

  let options = []

  if (input.cachePath) {
    options += ['--cache-path ' + input.cachePath]
  }

  if (input.noEnv) {
    options += ['--no-env']
  }

  if (input.onlyPlists) {
    options += ['--only-plists']
  }

  if (input.project) {
    options += ['--project ' + input.project]
  }

  if (input.quiet) {
    options += ['--quiet']
  }

  if (input.spec) {
    options += ['--spec ' + input.spec]
  }

  if (input.useCache) {
    options += ['--use-cache']
  }

  await exec.exec('xcodegen', options)
}
 
async function main() {
  await installXcodegen()
  await runXcodegen()  
}
