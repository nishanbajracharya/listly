import { Link } from 'wouter';
import { useLocalStorage } from '@mantine/hooks';
import {
  Text,
  Table,
  Group,
  Button,
  Tooltip,
  Container,
  ActionIcon,
} from '@mantine/core';
import { IoCopy } from 'react-icons/io5';

import { l } from '../../../modules/language';

function Rank() {
  const [list] = useLocalStorage<string[]>({
    key: 'list',
    defaultValue: [],
  });

  function copyToClipboard() {
    navigator.clipboard.writeText(list.join('\n'));
  }

  return (
    <Container>
      <Text size="xl" fw={700} mb="md">
        {l('page.rank.title')}
      </Text>

      {list && Array.isArray(list) && list.length > 0 ? (
        <>
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
          <Group mt="lg" justify="flex-end">
            <Tooltip label={l('page.rank.copy')}>
              <ActionIcon variant="default" onClick={copyToClipboard}>
                <IoCopy size={15} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </>
      ) : (
        <Group>
          <Text>{l('page.rank.empty')}</Text>
          <Link href="/" asChild>
            <Button variant="filled" color="blue" fullWidth>
              {l('page.rank.home')}
            </Button>
          </Link>
        </Group>
      )}
    </Container>
  );
}

export default Rank;
