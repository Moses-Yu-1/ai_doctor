/**
 * Page component displays detailed information about a specific medical case.
 *
 * @param {Object} props - The properties object.
 * @param {any} [props.apiData] - The API data containing medical information.
 * @param {string | null} props.query - The query string.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * The component uses the `useParams` hook to get the case ID from the URL parameters.
 * It then extracts the relevant case data from the `apiData` prop and displays it.
 *
 * The component is structured into several sections:
 * - A header displaying the chief complaint and the date of the case.
 * - A summary section displaying the summary details and chat messages.
 * - A history section displaying various medical history details.
 * - A follow-up section displaying follow-up appointments if any.
 *
 * The `summary_data` object contains the title and detail of the case summary.
 * The `history_data` array contains categorized medical history details.
 *
 * The component conditionally renders the chat messages and follow-up sections based on the availability of data.
 */
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router';

import { LoadingScreen } from 'src/components/loading-screen';
import { SummaryDetailsContent } from './sub/SummaryDetailsContent';
import { HistoryTable } from './sub/History';

import { BookingNewest } from './sub/booking-newest';
import { ChatMessageList } from './sub/chat-message-list';
import { ChatMessageNone } from './sub/chat-message-none';

// ----------------------------------------------------------------------

type Props = {
  apiData?: any;
  query: string | null;
};

export default function Page({ apiData, query }: Props) {
  const idx = Number(useParams().id);
  const caseData = apiData.medical_info.cases[idx];
  const historyData = apiData.medical_info.histories[apiData.medical_info.histories.length - 1];

  if (!caseData) {
    return <LoadingScreen />;
  }
  const summary_data = {
    title: 'Summary',
    detail: caseData.summary ? caseData.summary : 'No summary available',
  };
  const history_data = [...Array(12)]
    .map((_, index) => {
      const category = [
        'Cheif Complaint',
        'On set',
        'Location',
        'Duration',
        'Characteristic',
        'Aggravating/Worsening Factors',
        'Associated Symptoms',
        'Trauma History',
        'Past History',
        'Family History',
        'Medicine History',
        'Social History',
      ][index];
      const content = [
        caseData.CC,
        caseData.O,
        caseData.L,
        caseData.D,
        caseData.C,
        caseData.F,
        caseData.A,

        historyData.trauma_history,
        historyData.past_medical_history,
        historyData.family_history,
        historyData.medication_history,
        historyData.social_history,
      ][index];

      return {
        id: index, // Ensure unique key
        category,
        content,
      };
    })
    .filter((item) => item.content !== null);

  return (
    <Box
      sx={{
        margin: '72px',
        // marginBottom: '0',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flex: '65%' }}>
          <Typography variant="h2" sx={{ mb: '32px' }}>
            {caseData.CC}
          </Typography>
        </Box>
        <Box sx={{ flex: '35%', px: '8px' }}>
          <Typography variant="h6" sx={{ mb: '16px', textAlign: 'right' }}>
            {caseData.date}
          </Typography>
        </Box>
      </Box>

      <Box>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flex: '65%' }}>
            <SummaryDetailsContent data={summary_data} />
          </Box>
          <Box sx={{ flex: '35%', paddingLeft: '16px' }}>
            {caseData.chat_log ? (
              <ChatMessageList messages={caseData.chat_log.chats} />
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
        <HistoryTable
          type="1"
          tableData={history_data}
          headLabel={[
            { id: 'category', label: 'Category' },
            { id: 'content', label: 'Content' },
          ]}
        />
      </Box>

      {caseData.followups.length === 0 ? null : (
        <Box
          sx={{
            marginTop: '32px',
          }}
        >
          <Typography variant="h4" sx={{ mb: '8px' }}>
            Follow Up
          </Typography>

          <BookingNewest list={caseData.followups} />
        </Box>
      )}
    </Box>
  );
}
