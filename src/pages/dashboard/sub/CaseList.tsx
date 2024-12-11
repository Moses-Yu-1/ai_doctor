import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';

import { Scrollbar } from 'src/components/scrollbar';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: {
    id: number;
    title: string;
    coverUrl: string;
    description: string;
    postedAt: string;
  }[];
};

export function CaseList({ title, subheader, list, ...other }: Props) {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const query = queryParams.get('key_string');

  return (
    <Card {...other}>
      <Scrollbar>
        <Box sx={{ minWidth: 640 }}>
          {list.map((item) => (
            <Item
              key={item.id}
              item={item}
              onClick={() => navigate(`/group/${item.id}${query ? `?key_string=${query}` : ''}`)}
            />
          ))}
        </Box>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ItemProps = BoxProps & {
  item: Props['list'][number];
};

function Item({ item, sx, ...other }: ItemProps) {
  return (
    <Box
      sx={{
        py: 2,
        px: 3,
        gap: 2,
        display: 'flex',
        alignItems: 'center',
        borderBottom: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
        cursor: 'pointer', // Add this line
        ...sx,
      }}
      {...other}
    >
      <Avatar
        variant="rounded"
        alt={item.title}
        src={item.coverUrl}
        sx={{ width: 48, height: 48, flexShrink: 0 }}
      />

      <ListItemText
        primary={item.title}
        secondary={item.description}
        primaryTypographyProps={{ noWrap: true, typography: 'subtitle2' }}
        secondaryTypographyProps={{ mt: 0.5, noWrap: true, component: 'span' }}
      />

      <Box sx={{ flexShrink: 0, color: 'text.disabled', typography: 'caption' }}>
        {item.postedAt}
      </Box>
    </Box>
  );
}
