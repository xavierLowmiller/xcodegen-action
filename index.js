const core = require('@actions/core')
const exec = require('@actions/exec')
const os = require('os')

try {
  main()
} catch (error) {
  core.setFailed(error.message);
}

async function installXcodegen() {
  const xcodegenDir = os.homedir() + '/action-xcodegen/'
  const zipFile = xcodegenDir + 'xcodegen.zip'
  const version = core.getInput('version')
  const url = version === 'latest'
    ? 'https://github.com/yonaskolb/XcodeGen/releases/latest/download/xcodegen.zip'
    : `https://github.com/yonaskolb/XcodeGen/releases/download/${version}/xcodegen.zip`
  await exec.exec('curl', [
    '--silent',
    '--create-dirs',
    '--location',
    '--output',
    zipFile,
    url
  ])
  await exec.exec('unzip', ['-q', '-o', zipFile], { cwd: xcodegenDir })
  await exec.exec('rm', [zipFile])
  await exec.exec('chown', ['runner:admin', '/usr/local/share'])
  await exec.exec('xcodegen/install.sh', null, { cwd: xcodegenDir })
  await exec.exec('rm -rf', [xcodegenDir])
}

async function runXcodegen() {
  const input = {
    cachePath:   core.getInput('cache-path'),
    noEnv:       core.getInput('no-env'),
    onlyPlists:  core.getInput('only-plists'),
    project:     core.getInput('project'),
    projectRoot: core.getInput('project-root'),
    quiet:       core.getInput('quiet'),
    spec:        core.getInput('spec'),
    useCache:    core.getInput('use-cache')
  }

  let options = []

  if (input.cachePath) {
    options.push('--cache-path')
    options.push(input.cachePath)
  }

  if (input.noEnv) {
    options.push('--no-env')
  }

  if (input.onlyPlists) {
    options.push('--only-plists')
  }

  if (input.project) {
    options.push('--project')
    options.push(input.project)
  }

  if (input.projectRoot) {
    options.push('--project-root')
    options.push(input.projectRoot)
  }

  if (input.quiet) {
    options.push('--quiet')
  }

  if (input.spec) {
    options.push('--spec')
    options.push(input.spec)
  }

  if (input.useCache) {
    options.push('--use-cache')
  }

  await exec.exec('xcodegen', options)
}
 
async function main() {
  await installXcodegen()
  await runXcodegen()  
}
