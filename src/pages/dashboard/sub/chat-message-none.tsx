import type { IChatMessage, IChatParticipant } from 'src/types/chat';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { fToNow } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';

import { useMockedUser } from 'src/auth/hooks';

import { getMessage } from './utils/get-message';

// ----------------------------------------------------------------------

type Props = {
  message: string;
  // me: boolean;
  type: string;
};

export function ChatMessageNone() {
  return (
    <>
      <Box
        sx={{
          // border: '1px solid black',
          borderRadius: '16px',
          background: 'white',
          boxShadow: '0 0 2px 0 rgba(145 158 171 / 0.2), 0 12px 24px -4px rgba(145 158 171 / 0.12)',
          height: '420px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" sx={{ mb: '8px' }}>
          no data
        </Typography>
      </Box>
    </>
  );
}
