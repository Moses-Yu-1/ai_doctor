import type { CardProps } from '@mui/material/Card';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';

// ----------------------------------------------------------------------

type Props = CardProps & {
  tableData?: any;
  headLabel?: any;
  type?: string;
};

export function History({ tableData, headLabel, type }: Props) {
  return (
    <Card>
      <Scrollbar>
        <Table sx={{ minWidth: 680 }}>
          <TableHeadCustom headLabel={headLabel} />

          <TableBody>
            {tableData.map((row: any, index: number) => {
              const isLast5 = index >= tableData.length - 5;

              if (type === '0') return <RowItem key={row.id} row={row} />;
              if (type === '1') return <RowItem key={row.id} row={row} isLast5={isLast5} />;
              return null;
            })}
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

type RowItemProps = {
  row: any;
  isLast5?: boolean;
};

function RowItem({ row, isLast5 }: RowItemProps) {
  return (
    <TableRow style={{ backgroundColor: isLast5 ? '#fafafa' : 'transparent' }}>
      <TableCell>{row.category}</TableCell>

      <TableCell width="75%">{row.content}</TableCell>
    </TableRow>
  );
}
