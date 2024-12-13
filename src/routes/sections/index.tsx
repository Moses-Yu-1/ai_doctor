import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { AuthGuard } from 'src/auth/guard';

import { CONFIG } from 'src/config-global';

import { DashboardLayout } from 'src/layouts/dashboard';
import { lazy, Suspense, useEffect, useState } from 'react';
import { LoadingScreen } from 'src/components/loading-screen';

// import { authRoutes } from './auth';
import { ApiData } from 'src/types/apiData';
import { mainRoutes } from './main';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/one'));
const PageFour = lazy(() => import('src/pages/dashboard/four'));

// ----------------------------------------------------------------------

type Props = {
  query: string | null;
};

export function Router({ query }: Props) {
  const [apiData, setApiData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // console.log("query from Router: ", query); // Log the query string

  useEffect(() => {
    // 데이터 요청을 위한 API 호출
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/${query}`, {
          headers: {
            'ngrok-skip-browser-warning': '1',
          },
        });
        // console.log("response from fetchData: ", response); // Log the response object
        // console.log("response status: ", response.status); // Log the response status
        // console.log("response headers: ", response.headers); // Log the response headers

        if (!response.ok) {
          throw new Error(`Data fetching failed with status: ${response}`);
        }
        // console.log(await response.text());
        const result = await response.json();
        // console.log("result from fetchData: ", result); // Log the entire result object
        // console.log("result keys: ", Object.keys(result)); // Log the keys of the result object

        // Check if result.user_id exists before accessing it
        if (result && result.user_id) {
          // console.log("result.user_id: ", result.user_id);
        } else {
          console.error('user_id is not present in the result');
        }

        setApiData(result); // Save the fetched data to state
      } catch (err) {
        if (err instanceof TypeError) {
          setError('Network error or CORS issue');
          // console.error('Network error or CORS issue:', err);
        } else {
          setError(err.message); // Handle other errors
          // console.error('Error fetching data:', err);
        }
      } finally {
        setLoading(false); // End loading
      }
    };

    if (query) {
      fetchData(); // Fetch data when the component mounts
    } else {
      setLoading(false);
    }
  }, [query]); // key 값이 바뀔 때마다 데이터를 새로 요청

  console.log('apiData from Router: ', apiData); // Log the apiData object

  const routes = useRoutes([
    {
      path: `/`,
      element: (
        <DashboardLayout
          query={query}
          cases={apiData?.medical_info?.cases || []}
          user={apiData ? { ...apiData } : { name: 'No name', general_info: {} }}
        >
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: apiData ? <IndexPage query={query} apiData={apiData} /> : <LoadingScreen />,
          index: true,
        },
        {
          path: `group/:id`,
          element: <PageFour query={query} apiData={apiData} />,
        },
      ],
    },
  ]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return routes;
}
