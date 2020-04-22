const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec')
const os = require('os');
const fs = require('fs');

try {
  const cachePath = core.getInput('cache-path')
  const noEnv = core.getInput('no-env')
  const onlyPlists = core.getInput('only-plists')
  const project = core.getInput('project')
  const quiet = core.getInput('quiet')
  const spec = core.getInput('spec')
  const useCache = core.getInput('use-cache')

  main()
} catch (error) {
  core.setFailed(error.message);
}

async function installXcodegen() {
  const xcodegenDir = os.homedir() + '/action-xcodegen/'
  const zipFile = xcodegenDir + 'xcodegen.zip'
  await exec.exec('curl', [
    '--create-dirs',
    '-L',
    '-o',
    zipFile,
    'https://github.com/yonaskolb/XcodeGen/releases/latest/download/xcodegen.zip'
  ])
  await exec.exec('unzip', ['-o', zipFile], { cwd: xcodegenDir })
  await exec.exec('rm', [zipFile])
  await exec.exec('xcodegen/install.sh', null, { cwd: xcodegenDir })
  await exec.exec('rm -rf', [xcodegenDir])
}
 
async function main() {
  await installXcodegen()
}
