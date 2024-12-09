import { Scrollbar } from 'src/components/scrollbar';
import { Box } from '@mui/material';

import { ChatMessageItem } from './chat-message-item';
import { useMessagesScroll } from './hooks/use-messages-scroll';

// ----------------------------------------------------------------------

type Props = {
  messages: any;
};

export function ChatMessageList({ messages = [] }: Props) {
  const { messagesEndRef } = useMessagesScroll(messages);

  return (
    <>
      <Box
        sx={{
          // border: '1px solid black',
          borderRadius: '16px',
          background: 'white',
          boxShadow: '0 0 2px 0 rgba(145 158 171 / 0.2), 0 12px 24px -4px rgba(145 158 171 / 0.12)',
        }}
      >
        <Scrollbar
          ref={messagesEndRef}
          sx={{
            // pl: 1,
            // px: 3,
            // pt: 5,
            // pb: 3,
            padding: '24px 24px 24px 12px',
            flex: '1 1 auto',
            height: '420px',
            maxHeight: '420px',
          }}
        >
          {messages.map((message: any) => (
            <ChatMessageItem key={message.id} message={message.text} me={message.me} />
          ))}
        </Scrollbar>
      </Box>
    </>
  );
}
