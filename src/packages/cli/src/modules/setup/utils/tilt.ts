import process from 'node:process'
import { cancel, tasks } from '@clack/prompts'
import consola from 'consola'
import { $ } from 'zx'
import { isProgramInstalled } from '@/utils'

async function install() {
  consola.info('Checking Tilt dependencies')

  const missingDependencies: string[] = []

  await tasks([
    {
      title: 'Checking docker',
      async task(message) {
        const isInstalled = await isProgramInstalled('docker')

        if (!isInstalled) {
          missingDependencies.push('Docker is not installed. Please install docker: https://docs.docker.com/engine/install')
          return
        }

        return message('Docker is installed')
      },
    },
    {
      title: 'Checking kubectl',
      async task(message) {
        const isInstalled = await isProgramInstalled('kubectl')

        if (!isInstalled) {
          missingDependencies.push('Kubectl is not installed. Please install kubectl: https://kubernetes.io/docs/tasks/tools/')
          return
        }

        return message('Kubectl is installed')
      },
    },
    {
      title: 'Checking kind',
      async task(message) {
        const isInstalled = await isProgramInstalled('kind')

        if (!isInstalled) {
          missingDependencies.push('Kind is not installed. please install kind: https://kind.sigs.k8s.io/docs/user/quick-start/#installing-with-a-package-manager')
          return
        }

        return message('Kind is installed')
      },
    },
  ])

  if (missingDependencies.length) {
    cancel(missingDependencies.join('\n'))
    process.exit()
  }

  consola.success('Tilt dependencies are installed.')
  consola.info('Installing tilt...')

  try {
    await $({ stdio: 'inherit' })`sudo curl -fsSL https://raw.githubusercontent.com/tilt-dev/tilt/master/scripts/install.sh | bash`
  }
  catch {
    cancel('Failed to install Tilt.')
    process.exit()
  }
}

export default {
  install,
}
