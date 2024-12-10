import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { AuthGuard } from 'src/auth/guard';

import { CONFIG } from 'src/config-global';
import { apiData } from 'src/_mock/apiData';

import { DashboardLayout } from 'src/layouts/dashboard';
import { lazy, Suspense } from 'react';
import { LoadingScreen } from 'src/components/loading-screen';

import { authRoutes } from './auth';
import { mainRoutes } from './main';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/one'));
const PageFour = lazy(() => import('src/pages/dashboard/four'));

// ----------------------------------------------------------------------

type Props = {
  query?: any;
};

export function Router({ query }: Props) {
  console.log(query);

  const layoutContent = (
    <DashboardLayout
      cases={apiData.medical_info.cases}
      user={{ name: apiData.name, general_info: apiData.general_info }}
    >
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  );

  return useRoutes([
    {
      path: '/',
      element: <Navigate to={CONFIG.auth.redirectPath} replace />,
    },

    // Auth
    ...authRoutes,

    // Dashboard
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

    // Main
    ...mainRoutes,

    // No match
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
