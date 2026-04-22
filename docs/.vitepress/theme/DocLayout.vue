<script setup>
import DefaultTheme from 'vitepress/theme'
import PasswordGate from './PasswordGate.vue'
import { useData } from 'vitepress'
import { computed } from 'vue'

const { Layout } = DefaultTheme
const { frontmatter, page } = useData()

const isProtected = computed(() => !!frontmatter.value.protected)

const lastUpdated = computed(() => {
  if (!page.value.lastUpdated) return null
  return new Date(page.value.lastUpdated).toLocaleString('da-DK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
})

const hasInfo = computed(() => frontmatter.value.authors?.length || lastUpdated.value)
</script>

<template>
  <Layout>
    <template #doc-before>
      <PasswordGate v-if="isProtected" />
      <div v-else-if="hasInfo" class="author-info">
        <span v-if="frontmatter.authors?.length">
          <strong>{{ frontmatter.authors.length > 1 ? 'Authors' : 'Author' }}:</strong>
          {{ frontmatter.authors.join(', ') }}
        </span>
        <span v-if="frontmatter.authors?.length && lastUpdated" class="author-info-sep"> | </span>
        <span v-if="lastUpdated">
          <strong>Last updated:</strong> {{ lastUpdated }}
        </span>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.author-info {
  padding: 8px 16px;
  margin-bottom: 16px;
  border-left: 3px solid var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
}

.author-info-sep {
  color: var(--vp-c-divider);
}
</style>
