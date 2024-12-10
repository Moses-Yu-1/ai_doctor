import type { BoxProps } from '@mui/material/Box';

import { useState } from 'react';
import Box from '@mui/material/Box';

import { Carousel, useCarousel } from 'src/components/carousel';
import { SummaryFollowUpContent } from './SummaryFollowUpContent';
import { FollowUp } from '../piece/FollowUp';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  list: {
    id: number;
    date: string;
    progress: string;
    chat_log: string;
    followup_summary: string;
    symptom_changes: string;
    new_symptoms: string;
    medication_effectiveness: string;
    side_effects: string;
    impact_on_daily_life: string;
    doctor_opinion: string;
    medicine: string;
  }[];
};

export function BookingNewest({ list, sx, ...other }: Props) {
  const carousel = useCarousel({
    align: 'start',
    slideSpacing: '24px',
    slidesToShow: { xs: 1, sm: 2, md: 2, lg: 2 },
  });

  const [followUP_idx, setFollowUP_idx] = useState(0);
  const handleClick = (index: any) => {
    setFollowUP_idx(index);
  };

  return (
    <>
      <Box sx={{ background: '#F6F6F6', padding: '16px', borderRadius: '16px' }}>
        <FollowUp detail={list[followUP_idx]} />
      </Box>

      <Box sx={{ py: 2, ...sx }} {...other}>
        <Carousel carousel={carousel}>
          {list.map((item, index) => (
            <Box key={index} sx={{ cursor: 'pointer' }} onClick={() => handleClick(index)}>
              <SummaryFollowUpContent
                data={{
                  title: item.followup_summary,
                  detail: item.followup_summary,
                  date: item.date,
                }}
              />
            </Box>
          ))}
        </Carousel>
      </Box>
    </>
  );
}
