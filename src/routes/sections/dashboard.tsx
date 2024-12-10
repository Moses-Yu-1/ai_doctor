import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

import { apiData, ApiData } from 'src/data/apiData';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/one'));
const PageFour = lazy(() => import('src/pages/dashboard/four'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout
    cases={apiData.medical_info.cases}
    user={{ name: apiData.name, general_info: apiData.general_info }}
  >
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
      <ApiData />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage apiData={apiData} />, index: true },
      {
        path: 'group/:id',
        children: [
          {
            element: <PageFour apiData={apiData} />,
            index: true,
          },
        ],
      },
    ],
  },
];
