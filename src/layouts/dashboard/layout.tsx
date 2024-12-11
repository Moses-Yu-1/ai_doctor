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
  query: string | null;
};

export function DashboardLayout({ sx, children, header, data, user, cases, query }: DashboardLayoutProps) {
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const query = queryParams.get('query');
  
  const group_list: { [key: string]: string } = { root: `/group` };
  Object.keys(cases).forEach((i) => {
    if (query) group_list[i] = `/group/${i}/?key_string=${query}`;
    else group_list[i] = `/group/${i}`;
  });
  const paths = {
    dashboard: {
      root: `/?key_string=${query}`,
      two: `/two/?key_string=${query}`,
      three: `/three/?key_string=${query}`,
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
  console.log("children_list: ", children_list);
  
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

  // console.log("user logging from DashboardLayout: ", user);
  console.log("cases: ", cases);
  
  return (
    <LayoutSection
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
