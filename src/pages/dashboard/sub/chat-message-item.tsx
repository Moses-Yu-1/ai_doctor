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
  me: boolean;
};

export function ChatMessageItem({ message, me }: Props) {
  const renderBody = (
    <Stack
      sx={{
        p: 1.5,
        minWidth: 48,
        maxWidth: 320,
        borderRadius: 1,
        typography: 'body2',
        bgcolor: 'background.neutral',
        ...(me ? { color: 'grey.800', bgcolor: 'primary.lighter' } : {}),
      }}
    >
      {message}
    </Stack>
  );

  return (
    <Stack direction="row" justifyContent={me ? 'flex-end' : 'unset'} sx={{ mb: 1 }}>
      {!me && (
        <Avatar
          src="{https://api-dev-minimal-v610.pages.dev/assets/images/avatar/avatar-1.webp}"
          sx={{ width: 32, height: 32, mr: 2 }}
        />
      )}

      <Stack alignItems={me ? 'flex-end' : 'flex-start'}>
        {me ? 'me' : 'AI Doctor'}
        <Stack
          direction="row"
          alignItems="center"
          sx={{ position: 'relative', '&:hover': { '& .message-actions': { opacity: 1 } } }}
        >
          {renderBody}
          {/* {renderActions} */}
        </Stack>
      </Stack>
    </Stack>
  );
}
