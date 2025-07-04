import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    stylistic: {
      commaDangle: 'never',
      braceStyle: '1tbs'
    }
  }
})
