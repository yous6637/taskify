import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';

export const THEME = {
  light: {
    background: 'hsl(0 0% 100%)', // White background
    foreground: 'hsl(0 0% 0%)', // Black text
    card: 'hsl(0 0% 100%)',
    cardForeground: 'hsl(0 0% 0%)',
    popover: 'hsl(0 0% 100%)',
    popoverForeground: 'hsl(0 0% 0%)',
    primary: 'hsl(25 100% 50%)', // Orange accent
    primaryForeground: 'hsl(0 0% 100%)', // White for text on primary
    secondary: 'hsl(34.29, 100%, 91.76%)', // Light orange for secondary
    secondaryForeground: 'hsl(25 100% 50%)', // Orange like primary
    muted: 'hsl(0 0% 96%)',
    mutedForeground: 'hsl(0 0% 45%)', // Muted gray for times
    accent: 'hsl(270 50% 70%)', // Purple from background gradient
    accentForeground: 'hsl(0 0% 100%)',
    destructive: 'hsl(0 84% 60%)',
    border: 'hsl(0 0% 90%)', // Light gray borders
    input: 'hsl(0 0% 90%)',
    ring: 'hsl(25 100% 50%)', // Orange ring
    radius: '0.65rem',
    chart1: 'hsl(270 80% 60%)', // Purple from sky
    chart2: 'hsl(210 80% 50%)', // Blue from sky
    chart3: 'hsl(330 80% 80%)', // Pink from clouds
    chart4: 'hsl(25 100% 60%)', // Orange from accents
    chart5: 'hsl(200 80% 60%)', // Teal/cyan vibe
  },
  dark: {
    background: 'hsl(0 0.02% 3.94%)', // Dark purple-blue from night sky
    foreground: 'hsl(0 0.5% 98.03%)', // Near-white text
    card: 'hsl(0 0.02% 9.06%)',
    cardForeground: 'hsl(0 0.5% 98.03%)',
    popover: 'hsl(0 0.01% 14.94%)',
    popoverForeground: 'hsl(0 0% 98%)',
    primary: 'hsl(25 100% 50%)', // Orange primary
    primaryForeground: 'hsl(0 0% 0%)', // Black for contrast
    secondary: 'hsl(34.29, 100%, 91.76%)', // Darker orange for secondary
    secondaryForeground: 'hsl(25 100% 50%)', // Orange like primary
    muted: 'hsl(270 30% 30%)',
    mutedForeground: 'hsl(270 20% 70%)', // Lighter muted
    accent: 'hsl(270 50% 70%)', // Purple accent
    accentForeground: 'hsl(0 0% 98%)',
    destructive: 'hsl(0 72% 50%)',
    border: 'hsl(270 30% 35%)',
    input: 'hsl(270 30% 35%)',
    ring: 'hsl(25 100% 50%)',
    radius: '0.65rem',
    chart1: 'hsl(270 70% 70%)', // Adjusted lighter purple
    chart2: 'hsl(210 70% 60%)',
    chart3: 'hsl(330 70% 85%)',
    chart4: 'hsl(25 90% 70%)',
    chart5: 'hsl(200 70% 70%)',
  },
};

export const NAV_THEME: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};