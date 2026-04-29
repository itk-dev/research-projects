<script setup>
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as projectDates } from './projectDates.data.js'

const { frontmatter } = useData()

const sortOptions = [
  { value: 'edited-desc', label: 'Last edited ↓' },
  { value: 'edited-asc', label: 'Last edited ↑' },
  { value: 'alpha-asc', label: 'Alphabetically ↓' },
  { value: 'alpha-desc', label: 'Alphabetically ↑' },
]

const sort = ref('edited-desc')

function formatDate(isoString) {
  if (!isoString) return null
  return new Date(isoString).toLocaleString('da-DK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function stripTags(html) {
  return (html || '').replace(/<[^>]*>/g, '')
}

const features = computed(() => {
  const items = (frontmatter.value.features || []).map(f => {
    const iso = projectDates[f.link] || null
    return {
      ...f,
      lastEditedIso: iso,
      lastEdited: formatDate(iso),
    }
  })

  const sorted = [...items]
  switch (sort.value) {
    case 'edited-desc':
    case 'edited-asc': {
      const dir = sort.value === 'edited-desc' ? -1 : 1
      sorted.sort((a, b) => {
        // Items without a timestamp always sort last.
        if (!a.lastEditedIso && !b.lastEditedIso) return 0
        if (!a.lastEditedIso) return 1
        if (!b.lastEditedIso) return -1
        return dir * a.lastEditedIso.localeCompare(b.lastEditedIso)
      })
      break
    }
    case 'alpha-asc':
    case 'alpha-desc': {
      const dir = sort.value === 'alpha-asc' ? 1 : -1
      sorted.sort((a, b) =>
        dir * stripTags(a.title).localeCompare(stripTags(b.title), 'da')
      )
      break
    }
  }
  return sorted
})

const grid = computed(() => {
  const length = features.value.length
  if (!length) return
  if (length === 2) return 'grid-2'
  if (length === 3) return 'grid-3'
  if (length % 3 === 0) return 'grid-6'
  if (length > 3) return 'grid-4'
})
</script>

<template>
  <div v-if="features.length" class="VPFeatures custom-features">
    <div class="container">
      <div class="sort-bar">
        <label class="sort-label" for="features-sort">Sort by</label>
        <select id="features-sort" v-model="sort" class="sort-select">
          <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>
      <div class="items">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="item"
          :class="[grid]"
        >
          <a
            class="VPFeature link"
            :href="withBase(feature.link)"
          >
            <article class="box">
              <h2 class="title" v-html="feature.title"></h2>
              <p v-if="feature.details" class="details" v-html="feature.details"></p>
              <p v-if="feature.lastEdited" class="last-edited">
                Last edited: {{ feature.lastEdited }}
              </p>
              <div v-if="feature.linkText" class="link-text">
                <p class="link-text-value">
                  {{ feature.linkText }} <span class="vpi-arrow-right link-text-icon" />
                </p>
              </div>
            </article>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPFeatures {
  position: relative;
  padding: 0 24px;
}

@media (min-width: 640px) {
  .VPFeatures {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .VPFeatures {
    padding: 0 64px;
  }
}

.container {
  margin: 0 auto;
  max-width: 1152px;
}

.sort-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 0 8px 12px;
}

.sort-label {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.sort-select {
  appearance: none;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 13px;
  padding: 6px 28px 6px 10px;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='gray' d='M4 6l4 4 4-4z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 8px center;
  cursor: pointer;
  transition: border-color 0.25s;
}

.sort-select:hover,
.sort-select:focus {
  border-color: var(--vp-c-brand-1);
  outline: none;
}

.items {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.item {
  padding: 8px;
  width: 100%;
}

@media (min-width: 640px) {
  .item.grid-2,
  .item.grid-4,
  .item.grid-6 {
    width: calc(100% / 2);
  }
}

@media (min-width: 768px) {
  .item.grid-2,
  .item.grid-4 {
    width: calc(100% / 2);
  }

  .item.grid-3,
  .item.grid-6 {
    width: calc(100% / 3);
  }
}

@media (min-width: 960px) {
  .item.grid-4 {
    width: calc(100% / 4);
  }
}

.VPFeature {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s;
  text-decoration: none;
  color: inherit;
}

.VPFeature.link:hover {
  border-color: var(--vp-c-brand-1);
}

.box {
  display: flex;
  flex-direction: column;
  padding: 24px;
  height: 100%;
}

.title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
}

.details {
  flex-grow: 1;
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.last-edited {
  padding-top: 8px;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.link-text {
  padding-top: 8px;
}

.link-text-value {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

.link-text-icon {
  margin-left: 6px;
}
</style>
