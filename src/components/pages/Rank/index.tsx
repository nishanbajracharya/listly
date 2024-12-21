import { Link } from 'wouter';
import { useLocalStorage } from '@mantine/hooks';
import { Container, Text, Table, Group } from '@mantine/core';

import { l } from '../../../modules/language';

function Rank() {
  const [list] = useLocalStorage<string[]>({
    key: 'list',
    defaultValue: [],
  });

  return (
    <Container>
      <Text size="xl" fw={700} mb="md">
        {l('page.rank.title')}
      </Text>

      {list && Array.isArray(list) && list.length > 0 ? (
        <Table striped stickyHeader highlightOnHover stickyHeaderOffset={60}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={60}>{l('page.rank.table.rank')}</Table.Th>
              <Table.Th>{l('page.rank.table.title')}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {list.map((item, index) => (
              <Table.Tr key={index}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{item}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      ) : (
        <Group>
          <Text>{l('page.rank.empty')}</Text>
          <Link href="/">{l('page.rank.home')}</Link>
        </Group>
      )}
    </Container>
  );
}

export default Rank;
