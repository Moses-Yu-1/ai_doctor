import { Box, Typography } from '@mui/material';

import { SummaryDetailsContent } from './sub/SummaryDetailsContent';
import { History } from './sub/History';
import { CaseList } from './sub/CaseList';

// ----------------------------------------------------------------------

type Props = {
  apiData?: any;
};

export default function Page({ apiData }: Props) {
  const summary_data = {
    title: 'Occaecati est',
    detail:
      'Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis. Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.',
  };
  const history_data = [...Array(5)].map((_, index) => {
    const category = [
      'Trauma History',
      'Past History',
      'Family History',
      'Medicine History',
      'Social History',
    ][index];
    const content = [
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
  const case_data = [...Array(apiData.medical_info.cases.length)].map((_, index) => ({
    id: index,
    postedAt: apiData.medical_info.cases[index].date,
    title: apiData.medical_info.cases[index].CC,
    coverUrl:
      'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/14Fa/image/joib7vCDm4iIP7rNJR2ojev0A20.jpg',
    description: apiData.medical_info.cases[index].case_summary,
  }));

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
          <History
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
          <CaseList title="News" list={case_data} />
        </Box>
      </Box>
    </>
  );
}
