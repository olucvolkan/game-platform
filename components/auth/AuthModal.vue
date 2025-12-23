<script setup lang="ts">
import type { LoginCredentials, RegisterCredentials } from '~/types'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const { login, register } = useAuth()
const { t } = useLanguage()

const activeTab = ref<'login' | 'register'>('login')
const loading = ref(false)
const errorMessage = ref('')

// Login form
const loginForm = ref<LoginCredentials>({
  email: '',
  password: '',
})

// Register form
const registerForm = ref<RegisterCredentials>({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const closeModal = () => {
  emit('update:modelValue', false)
  // Reset forms and errors
  setTimeout(() => {
    loginForm.value = { email: '', password: '' }
    registerForm.value = { name: '', email: '', password: '', password_confirmation: '' }
    errorMessage.value = ''
    activeTab.value = 'login'
  }, 300)
}

const handleLogin = async () => {
  errorMessage.value = ''
  loading.value = true

  try {
    const result = await login(loginForm.value)

    if (result.success) {
      closeModal()
      // Reload favorites after login
      const { loadFavorites } = useFavorites()
      await loadFavorites()
    } else {
      errorMessage.value = result.error || 'Login failed'
    }
  } finally {
    loading.value = false
  }
}

const handleRegister = async () => {
  errorMessage.value = ''

  // Validate password match
  if (registerForm.value.password !== registerForm.value.password_confirmation) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  loading.value = true

  try {
    const result = await register(registerForm.value)

    if (result.success) {
      closeModal()
      // Reload favorites after registration
      const { loadFavorites } = useFavorites()
      await loadFavorites()
    } else {
      errorMessage.value = result.error || 'Registration failed'
    }
  } finally {
    loading.value = false
  }
}

const switchTab = (tab: 'login' | 'register') => {
  activeTab.value = tab
  errorMessage.value = ''
}

// Handle click outside modal
const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    closeModal()
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
        @click="handleBackdropClick"
      >
        <Transition
          enter-active-class="transition-all duration-200"
          leave-active-class="transition-all duration-200"
          enter-from-class="opacity-0 scale-95"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="modelValue"
            class="w-full max-w-md bg-primary-950 rounded-lg shadow-2xl overflow-hidden"
            @click.stop
          >
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b border-white/10">
              <h2 class="text-2xl font-bold text-white">
                {{ activeTab === 'login' ? t('login') : t('register') }}
              </h2>
              <button
                class="p-2 rounded-lg hover:bg-white/10 transition-colors"
                @click="closeModal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <!-- Tabs -->
            <div class="flex border-b border-white/10">
              <button
                class="flex-1 px-6 py-4 text-sm font-medium transition-colors"
                :class="activeTab === 'login' ? 'text-accent border-b-2 border-accent' : 'text-muted hover:text-white'"
                @click="switchTab('login')"
              >
                {{ t('login') }}
              </button>
              <button
                class="flex-1 px-6 py-4 text-sm font-medium transition-colors"
                :class="activeTab === 'register' ? 'text-accent border-b-2 border-accent' : 'text-muted hover:text-white'"
                @click="switchTab('register')"
              >
                {{ t('register') }}
              </button>
            </div>

            <!-- Error Message -->
            <div
              v-if="errorMessage"
              class="mx-6 mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
            >
              <p class="text-sm text-red-400">{{ errorMessage }}</p>
            </div>

            <!-- Login Form -->
            <form
              v-if="activeTab === 'login'"
              class="p-6 space-y-4"
              @submit.prevent="handleLogin"
            >
              <div>
                <label
                  for="login-email"
                  class="block text-sm font-medium text-muted mb-2"
                >
                  {{ t('email') }}
                </label>
                <input
                  id="login-email"
                  v-model="loginForm.email"
                  type="email"
                  required
                  class="input"
                  :placeholder="t('emailPlaceholder')"
                  :disabled="loading"
                >
              </div>

              <div>
                <label
                  for="login-password"
                  class="block text-sm font-medium text-muted mb-2"
                >
                  {{ t('password') }}
                </label>
                <input
                  id="login-password"
                  v-model="loginForm.password"
                  type="password"
                  required
                  class="input"
                  :placeholder="t('passwordPlaceholder')"
                  :disabled="loading"
                >
              </div>

              <button
                type="submit"
                class="w-full btn btn-primary py-3 font-semibold"
                :disabled="loading"
              >
                <span v-if="!loading">{{ t('login') }}</span>
                <span
                  v-else
                  class="flex items-center justify-center gap-2"
                >
                  <svg
                    class="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    />
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {{ t('loading') }}
                </span>
              </button>
            </form>

            <!-- Register Form -->
            <form
              v-else
              class="p-6 space-y-4"
              @submit.prevent="handleRegister"
            >
              <div>
                <label
                  for="register-name"
                  class="block text-sm font-medium text-muted mb-2"
                >
                  {{ t('name') }}
                </label>
                <input
                  id="register-name"
                  v-model="registerForm.name"
                  type="text"
                  required
                  class="input"
                  :placeholder="t('namePlaceholder')"
                  :disabled="loading"
                >
              </div>

              <div>
                <label
                  for="register-email"
                  class="block text-sm font-medium text-muted mb-2"
                >
                  {{ t('email') }}
                </label>
                <input
                  id="register-email"
                  v-model="registerForm.email"
                  type="email"
                  required
                  class="input"
                  :placeholder="t('emailPlaceholder')"
                  :disabled="loading"
                >
              </div>

              <div>
                <label
                  for="register-password"
                  class="block text-sm font-medium text-muted mb-2"
                >
                  {{ t('password') }}
                </label>
                <input
                  id="register-password"
                  v-model="registerForm.password"
                  type="password"
                  required
                  minlength="8"
                  class="input"
                  :placeholder="t('passwordPlaceholder')"
                  :disabled="loading"
                >
              </div>

              <div>
                <label
                  for="register-password-confirm"
                  class="block text-sm font-medium text-muted mb-2"
                >
                  {{ t('confirmPassword') }}
                </label>
                <input
                  id="register-password-confirm"
                  v-model="registerForm.password_confirmation"
                  type="password"
                  required
                  minlength="8"
                  class="input"
                  :placeholder="t('confirmPasswordPlaceholder')"
                  :disabled="loading"
                >
              </div>

              <button
                type="submit"
                class="w-full btn btn-primary py-3 font-semibold"
                :disabled="loading"
              >
                <span v-if="!loading">{{ t('register') }}</span>
                <span
                  v-else
                  class="flex items-center justify-center gap-2"
                >
                  <svg
                    class="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    />
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {{ t('loading') }}
                </span>
              </button>
            </form>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
