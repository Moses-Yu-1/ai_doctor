import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------
type Props = {
  data: any;
  choice: any;
};

export function SummaryFollowUpContent({ data, choice }: Props) {
  return (
    <Grid container spacing={3}>
      <Grid xs={12}>
        <Card
          sx={{
            p: 3,
            gap: 3,
            display: 'flex',
            flexDirection: 'column',
            height: '200px',
            background: choice[0] === choice[1] ? '#f4f6f8' : 'white',
          }}
        >
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flex: '65%' }}>
                {data?.title && <Typography variant="h6">{data?.title}</Typography>}
              </Box>
              <Box sx={{ flex: '35%', px: '8px' }}>
                <Box
                  sx={{
                    flexShrink: 0,
                    color: 'text.disabled',
                    typography: 'caption',
                    textAlign: 'right',
                  }}
                >
                  {data?.date && data?.date}
                </Box>
              </Box>
            </Box>

            <Stack direction="row" alignItems="center" spacing={1}>
              {data?.detail}
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
