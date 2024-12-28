import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useLocalStorage, useDisclosure } from '@mantine/hooks';
import { Container, Text, Textarea, Button, Flex, Modal } from '@mantine/core';

import { l } from '../../../modules/language';
import * as notifications from '../../../modules/notification';

function Home() {
  const [opened, { open, close }] = useDisclosure(false);

  const [list, setList] = useLocalStorage<string[]>({
    key: 'list',
    defaultValue: [],
  });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      list: '',
    },
  });

  function onSubmit({ list }: { list: string }) {
    // Convert list to comma and line separate array
    const items = list
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) =>
        item
          .split(',')
          .map((i) => i.trim())
          .filter(Boolean)
      )
      .flat();

    // Make list unique
    const uniqueItems = Array.from(new Set(items));

    // Save list
    setList(uniqueItems);

    // Notification
    notifications.show({
      title: l('page.home.notification.save'),
      message: '',
    });
  }

  useEffect(() => {
    form.setFieldValue('list', list.join('\n'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  function clearForm() {
    setList([]);
  }

  return (
    <Container>
      <Modal
        yOffset="30vh"
        opened={opened}
        onClose={close}
        aria-label="Clear list modal"
        title={l('page.home.modal.title')}
      >
        <Text>{l('page.home.modal.text')}</Text>
        <Flex
          mb="md"
          justify="space-between"
          gap={{ base: 0, md: 'md' }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Button
            mt="md"
            color="red"
            type="submit"
            variant="filled"
            onClick={() => {
              clearForm();
              close();
            }}
            aria-label="Clear list modal button"
          >
            {l('page.home.modal.yes')}
          </Button>
          <Button
            mt="md"
            color="blue"
            onClick={close}
            variant="outline"
            aria-label="Close modal button"
          >
            {l('page.home.modal.no')}
          </Button>
        </Flex>
      </Modal>
      <Text size="xl" fw={700} mb="md">
        {l('page.home.title')}
      </Text>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Textarea
          autosize
          minRows={10}
          maxRows={20}
          key={form.key('list')}
          aria-label="List input field"
          {...form.getInputProps('list')}
          label={l('page.home.subtitle')}
          placeholder={l('page.home.textArea.placeholder')}
        />
        <Flex
          mb="md"
          justify="space-between"
          gap={{ base: 0, md: 'md' }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Button
            mt="md"
            color="blue"
            type="submit"
            variant="filled"
            flex={{ md: 1 }}
            aria-label="Save list button"
          >
            {l('page.home.button.save')}
          </Button>
          <Button
            mt="md"
            color="red"
            onClick={open}
            variant="outline"
            aria-label="Clear list button"
          >
            {l('page.home.button.clear')}
          </Button>
        </Flex>
      </form>
    </Container>
  );
}

export default Home;
