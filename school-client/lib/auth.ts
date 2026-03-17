export function logout() {
  try {
    localStorage.removeItem("smart-school-user");
  } catch {
    // ignore (e.g. SSR or storage blocked)
  }
}

