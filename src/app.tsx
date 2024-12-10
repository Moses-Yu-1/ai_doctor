import 'src/global.css';

// ----------------------------------------------------------------------

import { Router } from 'src/routes/sections';
import { useLocation } from 'react-router';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import { MotionLazy } from 'src/components/animate/motion-lazy';
import { defaultSettings, SettingsProvider } from 'src/components/settings';

import { AuthProvider } from 'src/auth/context/jwt';

import { useEffect } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('key_string');

  return (
    <AuthProvider>
      <SettingsProvider settings={defaultSettings}>
        <ThemeProvider>
          <MotionLazy>
            {/* <ProgressBar /> */}
            {/* <SettingsDrawer /> */}
            <Router query={query} />
          </MotionLazy>
        </ThemeProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}
