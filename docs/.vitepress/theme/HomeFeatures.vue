<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as projectDates } from './projectDates.data.js'

const { frontmatter } = useData()

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

const features = computed(() => {
  return (frontmatter.value.features || []).map(f => ({
    ...f,
    lastEdited: formatDate(projectDates[f.link]),
  }))
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
