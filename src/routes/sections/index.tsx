import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { AuthGuard } from 'src/auth/guard';

import { CONFIG } from 'src/config-global';

import { DashboardLayout } from 'src/layouts/dashboard';
import { lazy, Suspense, useEffect, useState } from 'react';
import { LoadingScreen } from 'src/components/loading-screen';

// import { authRoutes } from './auth';
import { mainRoutes } from './main';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/one'));
const PageFour = lazy(() => import('src/pages/dashboard/four'));

// ----------------------------------------------------------------------

type Props = {
  query: string | null;
};
type ApiData = {
  user_id: number | null;
  number: string | null;
  name: string | null;
  general_info: {
    id: number | null;
    age: string | null;
    job: string | null;
    gender: string | null;
    country: string | null;
    user_id: number;
  } | null;
  medical_info: {
    id: number | null;
    user_id: number;
    lab_tests:
      | {
          id: number | null;
          bp: string | null;
          date: string | null;
          pulse: string | null;
          weight: string | null;
          breathing: string | null;
          blood_sugar: string | null;
          temperature: string | null;
          medical_info_id: number;
        }[]
      | null;
    histories:
      | {
          id: number | null;
          date: string | null;
          family_history: string | null;
          social_history: string | null;
          trauma_history: string | null;
          medication_history: string | null;
          past_medical_history: string | null;
          medical_info_id: number;
        }[]
      | null;
    cases:
      | {
          id: number | null;
          followups:
            | {
                id: number | null;
                date: string | null;
                medicine: string | null;
                progress: string | null;
                new_symptoms: string | null;
                side_effects: string | null;
                doctor_opinion: string | null;
                symptom_changes: string | null;
                followup_summary: string | null;
                impact_on_daily_life: string | null;
                medication_effectiveness: string | null;
                case_id: number;
                chat_log: {
                  id: number | null;
                  date: string | null;
                  chats:
                    | {
                        id: number | null;
                        date: string | null;
                        type: string | null;
                        data: string | null;
                      }[]
                    | null;
                  summary: string | null;
                  case_id: number | null;
                  followup_id: number | null;
                } | null;
              }[]
            | null;
          chat_log: {
            id: number | null;
            date: string | null;
            chats:
              | {
                  id: number | null;
                  date: string | null;
                  type: string | null;
                  data: string | null;
                }[]
              | null;
            summary: string | null;
            case_id: number | null;
            followup_id: number | null;
          } | null;
          A: string | null;
          C: string | null;
          summary: string | null;
          D: string | null;
          F: string | null;
          L: string | null;
          O: string | null;
          CC: string | null;
          date: string | null;
          medical_info_id: number;
        }[]
      | null;
  } | null;
};

export function Router({ query }: Props) {
  const [apiData, setApiData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 데이터 요청을 위한 API 호출
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5050/user/${query}`);
        if (!response.ok) {
          throw new Error(`Data fetching failed with status: ${response.status}`);
        }
        const result = await response.json();
        // console.log("result from fetchData: ", result); // Log the entire result object
        
        // Check if result.user_id exists before accessing it
        if (result && result.user_id) {
          // console.log("result.user_id: ", result.user_id);
        } else {
          console.error("user_id is not present in the result");
        }

        setApiData(result); // Save the fetched data to state
      } catch (err) {
        if (err instanceof TypeError) {
          setError('Network error or CORS issue');
        } else {
          setError(err.message); // Handle other errors
          console.log(err);
          
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

  // console.log("apiData from Router: ", apiData); // Log the apiData object

  const routes = useRoutes([
    {
      path: `/`,
      element: (
        <DashboardLayout
          query={query}
          cases={apiData?.medical_info?.cases || []}
          user={apiData ? { ...apiData } : {name: "No name", general_info: {}}}
        >
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage query={query} apiData={apiData} />, index: true },
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
