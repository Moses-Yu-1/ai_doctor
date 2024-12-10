import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router';

import { SummaryDetailsContent } from './sub/SummaryDetailsContent';
import { History } from './sub/History';

import { BookingNewest } from './sub/booking-newest';
import { ChatMessageList } from './sub/chat-message-list';
import { ChatMessageNone } from './sub/chat-message-none';

// ----------------------------------------------------------------------

type Props = {
  apiData?: any;
};

export default function Page({ apiData }: Props) {
  const idx = Number(useParams().id);

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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flex: '65%' }}>
            <Typography variant="h2" sx={{ mb: '32px' }}>
              {apiData.medical_info.cases[idx].CC}
            </Typography>
          </Box>
          <Box sx={{ flex: '35%', px: '8px' }}>
            <Typography variant="h6" sx={{ mb: '16px', textAlign: 'right' }}>
              {apiData.medical_info.cases[idx].date}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="h4" sx={{ mb: '8px' }}>
            Summary
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flex: '65%' }}>
              <SummaryDetailsContent data={summary_data} />
            </Box>
            <Box sx={{ flex: '35%', px: '8px' }}>
              {apiData.medical_info.cases[idx].chat_log ? (
                <ChatMessageList messages={apiData.medical_info.cases[idx].chat_log.chats} />
              ) : (
                <ChatMessageNone />
              )}
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

        {apiData.medical_info.cases[idx].followups.length === 0 ? null : (
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
        )}
      </Box>
    </>
  );
}
