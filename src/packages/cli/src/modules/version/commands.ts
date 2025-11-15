import { version } from '@@/package.json'
import { defineCommand } from 'citty'
import consola from 'consola'
import { platform } from 'std-env'

export default defineCommand({
  meta: {
    name: 'version',
    description: 'Get Kitman environment information',
  },
  async run() {
    const lines = [
      `Version: ${version}`,
      `OS/Arch: ${platform}`,
    ]

    consola.info(lines.join('\n'))
  },
})
