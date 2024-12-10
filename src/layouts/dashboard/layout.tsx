// import { paths } from 'src/routes/paths';

import { useLocation } from 'react-router';

import type { NavSectionProps } from 'src/components/nav-section';
import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useTheme } from '@mui/material/styles';

import { _contacts, _notifications } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';
import { CONFIG } from 'src/config-global';
import { SvgColor } from 'src/components/svg-color';

import { Main } from './main';
import { layoutClasses } from '../classes';
import { NavVertical } from './nav-vertical';
import { _account } from '../config-nav-account';
import { _workspaces } from '../config-nav-workspace';
import { LayoutSection } from '../core/layout-section';
import { useNavColorVars } from './styles';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------
const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);
const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
  data?: {
    nav?: NavSectionProps['data'];
  };
  user?: any;
  cases?: any;
};

export function DashboardLayout({ sx, children, header, data, user, cases }: DashboardLayoutProps) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const group_list: { [key: string]: string } = { root: `${ROOTS.DASHBOARD}/group` };
  Object.keys(cases).forEach((i) => {
    if (query) group_list[i] = `${ROOTS.DASHBOARD}/group/${i}?query=${query}`;
    else group_list[i] = `${ROOTS.DASHBOARD}/group/${i}`;
  });
  const paths = {
    faqs: '/faqs',
    minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
    // AUTH
    auth: {
      amplify: {
        signIn: `${ROOTS.AUTH}/amplify/sign-in`,
        verify: `${ROOTS.AUTH}/amplify/verify`,
        signUp: `${ROOTS.AUTH}/amplify/sign-up`,
        updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
        resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
      },
      jwt: {
        signIn: `${ROOTS.AUTH}/jwt/sign-in`,
        signUp: `${ROOTS.AUTH}/jwt/sign-up`,
      },
      firebase: {
        signIn: `${ROOTS.AUTH}/firebase/sign-in`,
        verify: `${ROOTS.AUTH}/firebase/verify`,
        signUp: `${ROOTS.AUTH}/firebase/sign-up`,
        resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
      },
      auth0: {
        signIn: `${ROOTS.AUTH}/auth0/sign-in`,
      },
      supabase: {
        signIn: `${ROOTS.AUTH}/supabase/sign-in`,
        verify: `${ROOTS.AUTH}/supabase/verify`,
        signUp: `${ROOTS.AUTH}/supabase/sign-up`,
        updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
        resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
      },
    },
    // DASHBOARD
    dashboard: {
      root: `${ROOTS.DASHBOARD}?query=${query}`,
      two: `${ROOTS.DASHBOARD}/two`,
      three: `${ROOTS.DASHBOARD}/three`,
      group: group_list,
    },
  };

  const children_list: { title: string; path: string }[] = [];
  Object.keys(cases).forEach((i) => {
    children_list.push({
      title: `${Number(i) + 1}. ${cases[i].CC}`,
      path: `${paths.dashboard.group[i]}`,
    });
  });
  const dashboardNavData = [
    {
      subheader: 'Main',
      items: [
        {
          title: 'Main',
          path: paths.dashboard.root,
          icon: ICONS.dashboard,
        },
      ],
    },
    {
      subheader: 'Cases',
      items: [
        {
          title: 'cases',
          path: paths.dashboard.group.root,
          icon: ICONS.user,
          children: children_list,
        },
      ],
    },
  ];

  const theme = useTheme();

  const settings = useSettingsContext();

  const navColorVars = useNavColorVars(theme, settings);

  const layoutQuery: Breakpoint = 'lg';

  const navData = data?.nav ?? dashboardNavData;

  const isNavMini = settings.navLayout === 'mini';
  const isNavHorizontal = settings.navLayout === 'horizontal';

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      // headerSection={
      //   <HeaderSection
      //     layoutQuery={layoutQuery}
      //     disableElevation={isNavVertical}
      //     slotProps={{
      //       toolbar: {
      //         sx: {
      //           ...(isNavHorizontal && {
      //             bgcolor: 'var(--layout-nav-bg)',
      //             [`& .${iconButtonClasses.root}`]: {
      //               color: 'var(--layout-nav-text-secondary-color)',
      //             },
      //             [theme.breakpoints.up(layoutQuery)]: {
      //               height: 'var(--layout-nav-horizontal-height)',
      //             },
      //           }),
      //         },
      //       },
      //       container: {
      //         maxWidth: false,
      //         sx: {
      //           ...(isNavVertical && { px: { [layoutQuery]: 5 } }),
      //         },
      //       },
      //     }}
      //     sx={header?.sx}
      //     slots={{
      //       topArea: (
      //         <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
      //           This is an info Alert.
      //         </Alert>
      //       ),
      //       bottomArea: isNavHorizontal ? (
      //         <NavHorizontal
      //           data={navData}
      //           layoutQuery={layoutQuery}
      //           cssVars={navColorVars.section}
      //         />
      //       ) : null,
      //       leftArea: (
      //         <>
      //           {/* -- Nav mobile -- */}
      //           <MenuButton
      //             onClick={mobileNavOpen.onTrue}
      //             sx={{
      //               mr: 1,
      //               ml: -1,
      //               [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
      //             }}
      //           />
      //           <NavMobile
      //             data={navData}
      //             open={mobileNavOpen.value}
      //             onClose={mobileNavOpen.onFalse}
      //             cssVars={navColorVars.section}
      //           />
      //           {/* -- Logo -- */}
      //           {isNavHorizontal && (
      //             <Logo
      //               sx={{
      //                 display: 'none',
      //                 [theme.breakpoints.up(layoutQuery)]: { display: 'inline-flex' },
      //               }}
      //             />
      //           )}
      //           {/* -- Divider -- */}
      //           {isNavHorizontal && (
      //             <StyledDivider
      //               sx={{ [theme.breakpoints.up(layoutQuery)]: { display: 'flex' } }}
      //             />
      //           )}
      //           {/* -- Workspace popover -- */}
      //           <WorkspacesPopover
      //             data={_workspaces}
      //             sx={{ color: 'var(--layout-nav-text-primary-color)' }}
      //           />
      //         </>
      //       ),
      //       rightArea: (
      //         <Box display="flex" alignItems="center" gap={{ xs: 0, sm: 0.75 }}>
      //           {/* -- Searchbar -- */}
      //           <Searchbar data={navData} />
      //           {/* -- Language popover -- */}
      //           <LanguagePopover
      //             data={[
      //               { value: 'en', label: 'English', countryCode: 'GB' },
      //               { value: 'fr', label: 'French', countryCode: 'FR' },
      //               { value: 'vi', label: 'Vietnamese', countryCode: 'VN' },
      //               { value: 'cn', label: 'Chinese', countryCode: 'CN' },
      //               { value: 'ar', label: 'Arabic', countryCode: 'SA' },
      //             ]}
      //           />
      //           {/* -- Notifications popover -- */}
      //           <NotificationsDrawer data={_notifications} />
      //           {/* -- Contacts popover -- */}
      //           <ContactsPopover data={_contacts} />
      //           {/* -- Settings button -- */}
      //           <SettingsButton />
      //           {/* -- Account drawer -- */}
      //           <AccountDrawer data={_account} />
      //         </Box>
      //       ),
      //     }}
      //   />
      // }
      /** **************************************
       * Sidebar
       *************************************** */
      sidebarSection={
        isNavHorizontal ? null : (
          <NavVertical
            user={user}
            data={navData}
            isNavMini={isNavMini}
            layoutQuery={layoutQuery}
            cssVars={navColorVars.section}
            onToggleNav={() =>
              settings.onUpdateField(
                'navLayout',
                settings.navLayout === 'vertical' ? 'mini' : 'vertical'
              )
            }
          />
        )
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        ...navColorVars.layout,
        '--layout-transition-easing': 'linear',
        '--layout-transition-duration': '120ms',
        '--layout-nav-mini-width': '88px',
        '--layout-nav-vertical-width': '300px',
        '--layout-nav-horizontal-height': '64px',
        '--layout-dashboard-content-pt': theme.spacing(1),
        '--layout-dashboard-content-pb': theme.spacing(8),
        '--layout-dashboard-content-px': theme.spacing(5),
      }}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: {
            transition: theme.transitions.create(['padding-left'], {
              easing: 'var(--layout-transition-easing)',
              duration: 'var(--layout-transition-duration)',
            }),
            pl: isNavMini ? 'var(--layout-nav-mini-width)' : 'var(--layout-nav-vertical-width)',
          },
        },
        ...sx,
      }}
    >
      <Main isNavHorizontal={isNavHorizontal}>{children}</Main>
    </LayoutSection>
  );
}
