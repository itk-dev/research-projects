import DefaultTheme from 'vitepress/theme'
import DocLayout from './DocLayout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: DocLayout,
}
