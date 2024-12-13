/**
 * Main page component for displaying user-related medical information.
 *
 * @param {Object} props - The properties object.
 * @param {any} [props.apiData] - The API data containing medical information.
 * @param {string | null} props.query - The query string.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * The component displays a summary, history, and list of medical cases.
 * It uses the `SummaryDetailsContent`, `History`, and `CaseList` components to render these sections.
 *
 * The `summary_data` object contains the title and detail of the summary.
 * The `history_data` array contains categorized medical history details.
 * The `case_data` array contains a list of medical cases with their details.
 */
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router';

import type { ApiData, Case, History } from 'src/types/apiData';
import { HistoryTable } from './sub/History';
import { SummaryDetailsContent } from './sub/SummaryDetailsContent';

import { BookingNewest } from './sub/booking-newest';
import { ChatMessageList } from './sub/chat-message-list';
import { ChatMessageNone } from './sub/chat-message-none';
import { CaseList } from './sub/CaseList';

// ----------------------------------------------------------------------

type Props = {
  apiData: ApiData;
  query: string | null;
};

export default function Page({ apiData, query }: Props) {
  const historyData: History = apiData.medical_info?.histories?.[
    apiData.medical_info.histories.length - 1
  ] || {
    id: 0,
    date: '',
    trauma_history: '',
    past_medical_history: '',
    family_history: '',
    medication_history: '',
    social_history: '',
    medical_info_id: 0,
  };
  const cases = apiData?.medical_info?.cases;

  const summary_data = {
    title: 'Summary',
    detail: apiData.summary  };
  const history_data = [...Array(5)].map((_, index) => {
    const category = [
      'Trauma History',
      'Past History',
      'Family History',
      'Medicine History',
      'Social History',
    ][index];
    const content = [
      historyData.trauma_history,
      historyData.past_medical_history,
      historyData.family_history,
      historyData.medication_history,
      historyData.social_history,
    ][index];

    return {
      id: index,
      category,
      content,
    };
  });
  const case_data = cases?.map((caseItem, index: any) => ({
    id: index,
    postedAt: caseItem.date || '',
    title: caseItem.CC || '',
    coverUrl:
      'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/14Fa/image/joib7vCDm4iIP7rNJR2ojev0A20.jpg',
    description: caseItem.summary || '',
  }));

  return (
    <Box
      sx={{
        margin: '72px',
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ mb: '8px' }}>
          Summary
        </Typography>
        <SummaryDetailsContent data={summary_data} height="auto" />
      </Box>

      <Box
        sx={{
          marginTop: '32px',
        }}
      >
        <Typography variant="h4" sx={{ mb: '8px' }}>
          History
        </Typography>
        <HistoryTable
          type="0"
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
          Cases
        </Typography>
        {case_data ? <CaseList title="News" list={case_data} /> : null}
      </Box>
    </Box>
  );
}
