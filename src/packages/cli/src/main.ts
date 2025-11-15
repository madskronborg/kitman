import {defineCommand, runMain as _runMain} from "citty"
import {name, description, version} from "../package.json"
import { setupGlobalConsole } from "./utils"
import {log} from "@clack/prompts"

const main = defineCommand({
  meta: {
    name,
    description,
    version
  },
  args: {
    command: {
      type: "positional",
      description: "Kitman CLI info",
      required: false
    }
  },
  async setup(ctx) {
    const command = ctx.args._[0]
    setupGlobalConsole({
      dev: command === "dev"
    })

    log()
  }
})

export async function runMain() {
  return _runMain(main)
}