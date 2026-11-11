import { useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

function systemPrefersDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function readMode(): ThemeMode {
  const stored = window.localStorage.getItem('app-theme');
  return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
}

export function useThemeMode() {
  const [mode, setMode] = useState<ThemeMode>(readMode);
  const [systemDark, setSystemDark] = useState(systemPrefersDark);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const update = (event: MediaQueryListEvent) => setSystemDark(event.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  function changeMode(nextMode: ThemeMode) {
    window.localStorage.setItem('app-theme', nextMode);
    setMode(nextMode);
  }

  return {
    mode,
    resolvedMode: mode === 'system' ? (systemDark ? 'dark' : 'light') : mode,
    changeMode,
  };
}
