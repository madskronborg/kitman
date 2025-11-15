import { intro, outro, text } from '@clack/prompts'
import { defineCommand } from 'citty'
import { colors } from 'consola/utils'
import { z } from 'zod'
import { tilt } from '../utils'

export default defineCommand({
  meta: {
    name: 'setup',
    description: 'Setup your Kitman environment',
  },

  async run() {
    intro('Setting up your Kitman environment')

    await text({
      message: 'Enter the url to your Kitman instance',
      placeholder: 'https://kitman.dev',
      initialValue: 'https://kitman.dev',
      defaultValue: 'https://kitman.dev',
      validate(value) {
        const result = z.url({
          protocol: /^https?$/,
          hostname: z.regexes.domain,
        }).safeParse(value)

        if (result.success)
          return undefined

        return z.prettifyError(result.error)
      },
    })

    await tilt.install()

    outro(`Kitman is setup. Run ${colors.green('kitman dev')} to spin up your local environment.`)
  },
})
