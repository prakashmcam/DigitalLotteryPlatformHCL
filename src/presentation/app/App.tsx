import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  Avatar, Button, FluentProvider, Tab, TabList, Text, Toolbar, Tooltip,
} from '@fluentui/react-components';
import {
  HomeRegular, HistoryRegular, TicketDiagonalRegular,
  WeatherMoonRegular, WeatherSunnyRegular, DesktopRegular, SparkleRegular,
} from '@fluentui/react-icons';
import { DrawsPage } from '../pages/DrawsPage';
import { DrawDetailPage } from '../pages/DrawDetailPage';
import { ResultsPage } from '../pages/ResultsPage';
import { TicketsPage } from '../pages/TicketsPage';
import { PreviewStateSwitcher } from '../components/PreviewStateSwitcher';
import { getAppTheme } from './theme';
import { useThemeMode } from './useThemeMode';

function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const { mode, resolvedMode, changeMode } = useThemeMode();
  const nextMode = resolvedMode === 'dark' ? 'light' : 'dark';  const ThemeIcon = resolvedMode === 'dark' ? WeatherMoonRegular : mode === 'system' ? DesktopRegular : WeatherSunnyRegular;
  const pageMotion: Variants = prefersReducedMotion
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 1, y: 0 } }
    : {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeInOut' } },
      exit: { opacity: 0, y: -8, transition: { duration: 0.14 } },
    };

  function selectRoute(value: string) {
    navigate(value);
  }

  return (
    <FluentProvider theme={getAppTheme(resolvedMode)} className="app-root" data-theme={resolvedMode}>
      <div className="app-shell">
        <header className="topbar">
          <Toolbar className="topbar__inner" aria-label="Northstar Lottery">
            <Link className="brand" to="/" aria-label="Northstar Lottery home">
              <span className="brand-mark"><TicketDiagonalRegular /></span>
              <span>Northstar <span className="brand-light">Lottery</span></span>
            </Link>
            <nav className="primary-nav" aria-label="Main navigation">
              <TabList
                selectedValue={location.pathname.startsWith('/draws/') ? '/draws/grand-jackpot' : location.pathname}
                onTabSelect={(_, data) => selectRoute(String(data.value))}
                size="medium"
              >
                <Tab value="/" icon={<HomeRegular />}>Draws</Tab>
                <Tab value="/draws/grand-jackpot" icon={<SparkleRegular />}>Draw detail</Tab>
                <Tab value="/results" icon={<HistoryRegular />}>Results</Tab>
                <Tab value="/tickets" icon={<TicketDiagonalRegular />}>My tickets</Tab>
              </TabList>
            </nav>
            <div className="topbar__actions">
              <span className="demo-chip"><span className="status-dot" /> Demo experience</span>
              <Tooltip content={`Switch to ${nextMode} mode`} relationship="label">
                <Button
                  appearance="subtle"
                  aria-label={`Switch to ${nextMode} mode`}
                  icon={<ThemeIcon />}
                  onClick={() => changeMode(nextMode)}
                />
              </Tooltip>
              <Avatar name="Guest" size={32} color="brand" />
            </div>
          </Toolbar>
        </header>
        <AnimatePresence mode="wait" initial={false}>
          <motion.main className="page" key={location.pathname} variants={pageMotion} initial="initial" animate="animate" exit="exit">
            <Routes location={location}>
              <Route path="/" element={<DrawsPage />} />
              <Route path="/draws/:drawId" element={<DrawDetailPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/tickets" element={<TicketsPage />} />
              <Route path="*" element={<section className="empty-card"><Text>That page isn’t in this demo.</Text><Button appearance="primary" onClick={() => selectRoute('/')}>Explore draws</Button></section>} />
            </Routes>
            <footer className="footer">
              <span>Northstar Lottery · Fictional demo experience</span>
              <span>Sample data only · No purchases or real entries</span>
            </footer>
          </motion.main>
        </AnimatePresence>
        {import.meta.env.DEV && <PreviewStateSwitcher />}
      </div>
    </FluentProvider>
  );
}

export function App() {
  return <BrowserRouter><AppShell /></BrowserRouter>;
}
