// @ts-check
import antfu from '@antfu/eslint-config'
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    tooling: true,
    standalone: false,
    stylistic: true,
  },
  dirs: {
    src: [
      './playground',
    ],
  },
}, await antfu()).append({
  rules: {
    'vue/singleline-html-element-content-newline': 'off',
    'style/indent-binary-ops': 'off',
  },
}, {
  files: ['playground/**'],
  rules: {
    'no-console': 'off',
  },
}, {
  files: ['**/*.yml'],
  rules: {
    '@stylistic/spaced-comment': 'off',
  },
})