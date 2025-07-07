import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      colors: {
        // Base UI
        "bg-primary": "#F4F7F6", // Main background (lighter gray)
        "bg-secondary": "#E9ECEF", // Secondary background (cards, sidebars)
        "bg-header": "#FFFFFF", // Specific color for the header background
        "text-primary": "#333333", // Main text
        "text-secondary": "#666666", // Secondary text, labels
        "border-divider": "#DDDDDD", // Borders

        // Accent & Interaction
        "accent-primary": "#007BFF", // Main interactive color (buttons, links)
        "text-header": "#333333", // Text color specifically for the header

        // Semantic
        success: "#4CAF50",
        danger: "#F44336",
        warning: "#FF9800",
        info: "#2196F3",
      },
      // Other theme extensions go here (fonts, spacing, etc.)
    },
  },
  plugins: [react(), tailwindcss()],
});
