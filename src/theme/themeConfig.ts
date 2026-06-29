// ... existing code ...

export type ThemeMode = "black" | "light" | "system";

export function getDefaultTheme(): ThemeMode {
  const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
  return savedTheme ?? "black";
}

// ... rest of code ...