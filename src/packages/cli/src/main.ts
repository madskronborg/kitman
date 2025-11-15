import process from 'node:process'
import { description, name, version } from '@@/package.json'
import { runMain as _runMain, defineCommand } from 'citty'
import consola from 'consola'
import { isLinux } from 'std-env'
import subCommands from './modules'
import { setupGlobalConsole } from './utils'

const main = defineCommand({
  meta: {
    name,
    description,
    version,
  },
  args: {
    command: {
      type: 'positional',
      description: 'Kitman CLI info',
      required: false,
    },
  },
  subCommands,
  async setup(ctx) {
    if (!isLinux) {
      consola.error('Kitman only supports Linux at this time.')
      process.exit()
    }

    const command = ctx.args._[0]
    setupGlobalConsole({
      dev: command === 'dev',
    })
  },
})

export async function runMain() {
  return _runMain(main)
}
