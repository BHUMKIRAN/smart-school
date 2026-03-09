import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// ============================
// 1️⃣ Define Theme Type & State
// ============================

export type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
}

// ============================
// 2️⃣ Initial State (from localStorage)
// ============================

const initialState: ThemeState = {
  theme: (() => {
    try {
      const saved = localStorage.getItem('theme') as Theme | null
      return saved ?? 'light'
    } catch {
      return 'light'
    }
  })(),
}

// ============================
// 3️⃣ Create Slice
// ============================

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state, action: PayloadAction<{ theme: Theme }>) {
      state.theme = action.payload.theme

      try {
        localStorage.setItem('theme', state.theme)
      } catch {}
    },
    // Optional: set theme directly
    setTheme(state, action: PayloadAction<{ theme: Theme }>) {
      state.theme = action.payload.theme
      try {
        localStorage.setItem('theme', state.theme)
      } catch {}
    },
  },
})

// ============================
// 4️⃣ Export Actions & Reducer
// ============================

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer