<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const passwordInput = ref('')
const error = ref('')
const unlocked = ref<Record<string, boolean>>({})
const mounted = ref(false)

const SESSION_KEY_PREFIX = 'research-auth-'

const projectKey = computed(() => frontmatter.value.passwordGroup || 'default')
const passwordHash = computed(() => frontmatter.value.passwordHash || '')

const isAuthenticated = computed(() => {
  const key = projectKey.value
  if (unlocked.value[key]) return true
  if (mounted.value && typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(SESSION_KEY_PREFIX + key) === 'true'
  }
  return false
})

function updateBodyClass() {
  if (typeof document === 'undefined') return
  if (!isAuthenticated.value) {
    document.documentElement.classList.add('password-locked')
  } else {
    document.documentElement.classList.remove('password-locked')
  }
}

onMounted(() => {
  mounted.value = true
  updateBodyClass()
})

watch(isAuthenticated, updateBodyClass)

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('password-locked')
  }
})

// Reset input and error when navigating to a different protected page
watch(projectKey, () => {
  passwordInput.value = ''
  error.value = ''
})

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

async function handleSubmit() {
  if (!passwordInput.value || !passwordHash.value) return
  const inputHash = await sha256(passwordInput.value)
  if (inputHash === passwordHash.value) {
    const key = projectKey.value
    unlocked.value = { ...unlocked.value, [key]: true }
    error.value = ''
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(SESSION_KEY_PREFIX + key, 'true')
    }
  } else {
    error.value = 'Incorrect password'
  }
}
</script>

<template>
  <div v-if="!isAuthenticated" class="password-gate-wrapper">
    <div class="password-gate">
      <div class="password-gate-box">
        <h2>Protected content</h2>
        <p>This project requires a password to view.</p>
        <form @submit.prevent="handleSubmit">
          <input
            v-model="passwordInput"
            type="password"
            placeholder="Enter password"
            class="password-input"
            autofocus
          />
          <button type="submit" class="password-submit">Unlock</button>
        </form>
        <p v-if="error" class="password-error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<style>
/* Hide doc content below the gate */
.password-gate-wrapper ~ * {
  display: none !important;
}

/* Hide sidebar and outline when locked */
.password-locked .VPSidebar {
  display: none !important;
}

.password-locked .VPDocAside {
  display: none !important;
}

/* Make the doc area full-width when sidebar/aside are hidden */
.password-locked .VPDoc.has-aside .content-container {
  max-width: 100% !important;
}

.password-locked .VPDoc .aside {
  display: none !important;
}
</style>

<style scoped>
.password-gate {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  padding: 2rem;
}

.password-gate-box {
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.password-gate-box h2 {
  margin-bottom: 0.5rem;
}

.password-gate-box p {
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}

.password-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 1rem;
  margin-bottom: 0.75rem;
  outline: none;
}

.password-input:focus {
  border-color: var(--vp-c-brand-1);
}

.password-submit {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 6px;
  background: var(--vp-c-brand-1);
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
}

.password-submit:hover {
  opacity: 0.9;
}

.password-error {
  color: var(--vp-c-danger-1, #e44930);
  margin-top: 0.75rem;
  margin-bottom: 0;
  font-size: 0.9em;
}
</style>
