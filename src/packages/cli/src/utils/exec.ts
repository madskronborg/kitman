import { $ } from 'zx'

export async function isProgramInstalled(program: string) {
  try {
    await $`which ${program}`
  }
  catch {
    return false
  }

  return true
}
