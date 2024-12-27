import { Link } from 'wouter';
import { useEffect, useState } from 'react';
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
import { IoMdShare } from 'react-icons/io';

import { l } from '../../../modules/language';
import { encode, decode } from '../../../modules/encoding';
import * as notifications from '../../../modules/notification';

function Rank() {
  const [list] = useLocalStorage<string[]>({
    key: 'list',
    defaultValue: [],
  });

  const [isShowingSharedLink, setIsShowingSharedLink] = useState(false);
  const [sharedRank, setSharedRank] = useState<string[]>([]);

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  function share() {
    const listData = JSON.stringify({
      data: list.join('\n'),
      source: 'listly'
    });

    const encodedList = encode(listData);

    const url = new URL(window.location.href);

    const link = `${url.origin}${url.pathname}?rank=${encodedList}`;

    copyToClipboard(link);
    notifications.show({
      title: l('page.rank.notification.share'),
      message: link
    });
  }

  useEffect(() => {
    const url = new URL(window.location.href);

    const encodedRank = url.searchParams.get('rank');

    if (encodedRank) {
      const decodedRank = decode(encodedRank);

      try {
        const parsedRank = JSON.parse(decodedRank);

        setIsShowingSharedLink(true);
        setSharedRank(parsedRank.data.split('\n'));
      } catch (_) {
        // noop
      }
    }
  }, []);

  const displayList = isShowingSharedLink ? sharedRank : list;

  return (
    <Container>
      <Text size="xl" fw={700} mb="md">
        {l('page.rank.title')}
      </Text>

      {displayList && Array.isArray(displayList) && displayList.length > 0 ? (
        <>
          <Table striped stickyHeader highlightOnHover stickyHeaderOffset={60}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={60}>{l('page.rank.table.rank')}</Table.Th>
                <Table.Th>{l('page.rank.table.title')}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {displayList.map((item, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{index + 1}</Table.Td>
                  <Table.Td>{item}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          <Group mt="lg" justify="flex-end">
            {!isShowingSharedLink && <Tooltip label={l('page.rank.share')}>
              <ActionIcon variant="default" onClick={share}>
                <IoMdShare size={15} />
              </ActionIcon>
            </Tooltip>}
            <Tooltip label={l('page.rank.copy')}>
              <ActionIcon variant="default" onClick={() => {
                copyToClipboard(displayList.join('\n'))

                notifications.show({
                  title: l('page.rank.notification.copy'),
                  message: ''
                });
              }}>
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
