import { defineCommand } from 'citty'
import create from './create'

const subCommands = {
  create,
}

export default defineCommand({
  meta: {
    name: 'server',
    description: 'Create & manage the kitman server',
  },
  subCommands,
})
