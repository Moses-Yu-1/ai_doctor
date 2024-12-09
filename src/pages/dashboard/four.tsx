import { Box, Typography } from '@mui/material';

import { SummaryDetailsContent } from './sub/SummaryDetailsContent';
import { History } from './sub/History';
import { CaseList } from './sub/CaseList';

import { FollowUp } from './piece/FollowUp';
import { BookingNewest } from './sub/booking-newest';
import { ChatMessageList } from './sub/chat-message-list';

// ----------------------------------------------------------------------

type Props = {
  idx?: number;
};

export default function Page({ idx = 0 }: Props) {
  const apiData = {
    user_id: 2,
    number: 'U12345',
    name: 'John Doe',
    general_info: {
      id: 4,
      age: '30',
      job: 'Software Engineer',
      gender: 'Male',
      country: 'USA',
      user_id: 2,
    },
    medical_info: {
      id: 2,
      lab_tests: [
        {
          id: 3,
          bp: '120/80',
          date: '2024-01-01 00:00:00',
          pulse: '72 bpm',
          weight: '70 kg',
          breathing: 'Normal',
          blood_sugar: '110 mg/dL',
          temperature: '36.5 C',
          medical_info_id: 2,
        },
        {
          id: 4,
          bp: '118/79',
          date: '2024-01-15 00:00:00',
          pulse: '70 bpm',
          weight: '69 kg',
          breathing: 'Normal',
          blood_sugar: '100 mg/dL',
          temperature: '36.6 C',
          medical_info_id: 2,
        },
      ],
      histories: [
        {
          id: 2,
          date: '2024-01-01 00:00:00',
          family_history: 'Father: hypertension',
          social_history: 'Non-smoker, occasional alcohol',
          trauma_history: 'None',
          medication_history: 'Vitamin D supplements',
          past_medical_history: 'Childhood asthma',
          medical_info_id: 2,
        },
      ],
      cases: [
        {
          A: null,
          C: 'Throbbing',
          case_summary:
            '111enetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.',
          D: null,
          F: 'Intermittent',
          L: 'Frontal region',
          O: null,
          CC: '1testing NewCase',
          date: '2024-12-08 21:28:54',
          medical_info_id: 2,
          id: 35,
          followups: [
            {
              id: 0,
              date: 'content//date',
              progress: 'content//progress',
              chat_log: 'content//chat_log',
              followup_summary: 'content//followup_summary',
              symptom_changes: 'content//symptom_changes',
              new_symptoms: 'content//new_symptoms',
              medication_effectiveness: 'content//medication_effectiveness',
              side_effects: 'content//side_effects',
              impact_on_daily_life: 'content//impact_on_daily_life',
              doctor_opinion: 'content//doctor_opinion',
              medicine: 'content//medicine',
            },
            {
              id: 111,
              date: '222date',
              progress: '222progress',
              chat_log: '222chat_log',
              followup_summary: '222followup_summary',
              symptom_changes: '222symptom_changes',
              new_symptoms: '222new_symptoms',
              medication_effectiveness: '222medication_effectiveness',
              side_effects: '222side_effects',
              impact_on_daily_life: '222impact_on_daily_life',
              doctor_opinion: '222doctor_opinion',
              medicine: '222medicine',
            },
          ],
          chat_log: null,
        },
        {
          A: null,
          C: 'Throbbing',
          case_summary:
            '222enetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.',
          D: null,
          F: 'Intermittent',
          L: 'Frontal region',
          O: null,
          CC: '2testing NewCase',
          date: '2024-12-08 23:14:44',
          medical_info_id: 2,
          id: 36,
          followups: [],
          chat_log: {
            id: 62,
            date: '2024-02-08 00:00:00',
            chats: [
              {
                id: null,
                date: '2024-12-09 02:51:50.395913',
                type: 'user',
                data: 'I feel better today',
              },
              {
                id: null,
                date: '2024-12-09 02:51:50.395934',
                type: 'ai',
                data: "That's great to hear!",
              },
            ],
            summary: null,
            case_id: 36,
            followup_id: null,
          },
        },
        {
          A: null,
          C: 'Throbbing',
          case_summary:
            '333enetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.',
          D: null,
          F: 'Intermittent',
          L: 'Frontal region',
          O: null,
          CC: '3testing NewCase',
          date: '2024-12-09 14:09:04',
          medical_info_id: 2,
          id: 86,
          followups: [],
          chat_log: null,
        },
      ],
      user_id: 2,
    },
  };

  const summary_data = {
    title: 'Occaecati est',
    detail:
      'Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis. Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.',
  };
  const history_data = [...Array(12)].map((_, index) => {
    const category = [
      'CC',
      'O',
      'L',
      'D',
      'C',
      'F',
      'A',
      'Trauma History',
      'Past History',
      'Family History',
      'Medicine History',
      'Social History',
    ][index];
    const content = [
      apiData.medical_info.cases[idx].CC,
      apiData.medical_info.cases[idx].O,
      apiData.medical_info.cases[idx].L,
      apiData.medical_info.cases[idx].D,
      apiData.medical_info.cases[idx].C,
      apiData.medical_info.cases[idx].F,
      apiData.medical_info.cases[idx].A,

      apiData.medical_info.histories[0].trauma_history,
      apiData.medical_info.histories[0].past_medical_history,
      apiData.medical_info.histories[0].family_history,
      apiData.medical_info.histories[0].medication_history,
      apiData.medical_info.histories[0].social_history,
    ][index];

    return {
      id: index,
      category,
      content,
    };
  });

  return (
    <>
      <Box
        sx={{
          margin: '72px',
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ mb: '8px' }}>
            Summary
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flex: '65%' }}>
              <SummaryDetailsContent data={summary_data} />
            </Box>
            <Box sx={{ flex: '35%', px: '8px' }}>
              <ChatMessageList
                messages={[
                  {
                    id: 0,
                    me: false,
                    text: '어쩌구저쩌구',
                  },
                  {
                    id: 1,
                    me: false,
                    text: '222어쩌구저쩌구',
                  },
                  {
                    id: 2,
                    me: true,
                    text: '33333333333',
                  },
                  {
                    id: 1,
                    me: false,
                    text: '222어쩌구저쩌구',
                  },
                  {
                    id: 2,
                    me: true,
                    text: '33333333333',
                  },
                  {
                    id: 1,
                    me: false,
                    text: '222어쩌구저쩌구',
                  },
                  {
                    id: 2,
                    me: true,
                    text: '33333333333',
                  },
                  {
                    id: 1,
                    me: false,
                    text: '222어쩌구저쩌구',
                  },
                  {
                    id: 2,
                    me: true,
                    text: '33333333333',
                  },
                  {
                    id: 1,
                    me: false,
                    text: '222어쩌구저쩌구',
                  },
                  {
                    id: 2,
                    me: true,
                    text: '33333333333',
                  },
                  {
                    id: 1,
                    me: false,
                    text: '222어쩌구저쩌구',
                  },
                  {
                    id: 2,
                    me: true,
                    text: '33333333333',
                  },
                  {
                    id: 1,
                    me: false,
                    text: '222어쩌구저쩌구',
                  },
                  {
                    id: 2,
                    me: true,
                    text: '33333333333',
                  },
                  {
                    id: 1,
                    me: false,
                    text: '222어쩌구저쩌구',
                  },
                  {
                    id: 2,
                    me: true,
                    text: '33333333333',
                  },
                ]}
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            marginTop: '32px',
          }}
        >
          <Typography variant="h4" sx={{ mb: '8px' }}>
            Case
          </Typography>
          <History
            type="1"
            tableData={history_data}
            headLabel={[
              { id: 'category', label: 'Category' },
              { id: 'content', label: 'Content' },
            ]}
          />
        </Box>

        <Box
          sx={{
            marginTop: '32px',
          }}
        >
          <Typography variant="h4" sx={{ mb: '8px' }}>
            Follow Up
          </Typography>

          <BookingNewest list={apiData.medical_info.cases[idx].followups} />
        </Box>
      </Box>
    </>
  );
}
