import { Box, Typography } from '@mui/material';
import { SummaryDetailsContent } from '../sub/SummaryDetailsContent';
import { History } from '../sub/History';
import { ChatMessageList } from '../sub/chat-message-list';
import { ChatMessageNone } from '../sub/chat-message-none';

// ----------------------------------------------------------------------

type Props = {
  detail?: any;
};

export function FollowUp({ detail }: Props) {
  const summary_data = {
    detail: detail.followup_summary,
  };
  const history_data = [...Array(9)].map((_, index) => {
    const category = [
      'data',
      'doctor opinion',
      'impact on daily life',
      'medication effectiveness',
      'medicine',
      'new symptoms',
      'progress',
      'side effects',
      'symptom changes',
    ][index];
    const content = [
      detail.date,
      detail.doctor_opinion,
      detail.impact_on_daily_life,
      detail.medication_effectiveness,
      detail.medicine,
      detail.new_symptoms,
      detail.progress,
      detail.side_effects,
      detail.symptom_changes,
    ][index];

    return {
      id: index,
      category,
      content,
    };
  });

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flex: '80%' }}>
          <Typography variant="h4" sx={{ mb: '8px' }}>
            {detail.followup_summary}
          </Typography>
        </Box>
        <Box sx={{ flex: '20%', paddingLeft: '16px', textAlign: 'right' }}>
          <Typography variant="h6">{detail.date}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flex: '65%' }}>
          <SummaryDetailsContent data={summary_data} />
        </Box>
        <Box sx={{ flex: '35%', paddingLeft: '16px' }}>
          {detail.chat_log ? (
            <ChatMessageList messages={detail.chat_log.chats} />
          ) : (
            <ChatMessageNone />
          )}
        </Box>
      </Box>

      <Box sx={{ marginTop: '16px' }}>
        <History
          type="0"
          tableData={history_data}
          headLabel={[
            { id: 'category', label: 'Category' },
            { id: 'content', label: 'Content' },
          ]}
        />
      </Box>
    </>
  );
}
