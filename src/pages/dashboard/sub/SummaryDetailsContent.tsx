import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------
type Props = {
  data: any;
};

export function SummaryDetailsContent({ data }: Props) {
  return (
    <Grid container spacing={3}>
      <Grid xs={12}>
        <Card sx={{ p: 3, gap: 3, display: 'flex', flexDirection: 'column' }}>
          <Stack spacing={2}>
            {data?.title && <Typography variant="h6">{data?.title}</Typography>}

            <Stack direction="row" alignItems="center" spacing={1}>
              {data?.detail}
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
