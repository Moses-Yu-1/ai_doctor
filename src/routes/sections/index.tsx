import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { AuthGuard } from 'src/auth/guard';

import { CONFIG } from 'src/config-global';
import { apiData } from 'src/_mock/apiData';

import { DashboardLayout } from 'src/layouts/dashboard';
import { lazy, Suspense, useEffect, useState } from 'react';
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

  // const [apiData, setApiData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   // 데이터 요청을 위한 API 호출
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`https://api.example.com/data?key=${query}`);
  //       if (!response.ok) {
  //         throw new Error('Data fetching failed');
  //       }
  //       const result = await response.json();
  //       setApiData(result); // 받아온 데이터 상태에 저장
  //     } catch (err) {
  //       setError(err.message); // 오류 처리
  //     } finally {
  //       setLoading(false); // 로딩 끝
  //     }
  //   };

  //   fetchData(); // 컴포넌트가 마운트될 때 데이터 요청
  // }, [query]); // key 값이 바뀔 때마다 데이터를 새로 요청

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
