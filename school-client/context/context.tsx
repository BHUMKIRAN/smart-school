"use client" 
// This tells Next.js that this file runs on the client side
// (because we are using useEffect, useReducer, localStorage)

import { createContext, useEffect, useReducer, ReactNode, useContext } from "react";


// ============================
// 1️⃣ Define Possible Types
// ============================

// Theme can only be 'light' or 'dark'
type Theme = 'light' | 'dark';

// Language can only be 'EN' or 'NP'
type Language = 'EN' | 'NP';


// ============================
// 2️⃣ Define Shape of Global State
// ============================

interface ContextState {
    theme: Theme;        // current theme
    language: Language;  // current language
}


// ============================
// 3️⃣ Define All Possible Actions
// ============================

type Action =
    | { type: 'toggleTheme' } 
    // used to switch between light and dark

    | { type: 'toggleLanguage'; payload: Language } 
    // used to change language manually

    | { type: 'initialize'; payload: ContextState };
    // used to load saved data from localStorage


// ============================
// 4️⃣ Initial Default State
// ============================

const initialState: ContextState = {
    theme: 'light',
    language: 'EN',
};


// ============================
// 5️⃣ Define Context Type
// ============================

interface ContextType {
    state: ContextState;                      // current global state
    dispatch: React.Dispatch<Action>;         // function to update state
}


// ============================
// 6️⃣ Create Context
// ============================

// We provide default values (only used before Provider wraps app)
export const ContextToUse = createContext<ContextType>({
    state: initialState,
    dispatch: () => null,
});


// ============================
// 7️⃣ Reducer Function
// ============================

// Reducer decides how state changes based on action
const ReducerFunctions = (
    state: ContextState, 
    action: Action
): ContextState => {

    switch (action.type) {

        // Toggle between light and dark
        case 'toggleTheme':
            return {
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light',
            };

        // Change language
        case 'toggleLanguage':
            return {
                ...state,
                language: action.payload,
            };

        // Load saved state from localStorage
        case 'initialize':
            return action.payload;

        // Always return state if no case matches
        default:
            return state;
    }
};


// ============================
// 8️⃣ Context Provider Component
// ============================

export const ContextProvider = ({ children }: { children: ReactNode }) => {

    // useReducer manages global state
    const [state, dispatch] = useReducer(ReducerFunctions, initialState);


 useEffect(() => {
  if (state.theme === "dark") {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  } else {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
  }
}, [state.theme]);


    // ============================
    // 1️⃣1️⃣ Provide State to Whole App
    // ============================

    return (
        <ContextToUse.Provider value={{ state, dispatch }}>
            {children}
        </ContextToUse.Provider>
    );
    
};
export const useSettings = () => useContext(ContextToUse)
