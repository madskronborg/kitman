import { intro } from '@clack/prompts'
import { defineCommand } from 'citty'

export default defineCommand({
  meta: {
    name: 'create',
    description: 'Create the server deployment',
  },

  run() {
    intro('')
  },
})
