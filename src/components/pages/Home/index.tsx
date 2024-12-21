import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useLocalStorage, useDisclosure } from '@mantine/hooks';
import { Container, Text, Textarea, Button, Flex, Modal } from '@mantine/core';

import { language } from '../../../modules/language';

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
        title={language('page.home.modal.title')}
      >
        <Text>{language('page.home.modal.text')}</Text>
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
            onClick={() => {
              clearForm();
              close();
            }}
            variant="filled"
          >
            {language('page.home.modal.yes')}
          </Button>
          <Button variant="outline" color="blue" onClick={close} mt="md">
            {language('page.home.modal.no')}
          </Button>
        </Flex>
      </Modal>
      <Text size="xl" fw={700} mb="md">
        {language('page.home.title')}
      </Text>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Textarea
          autosize
          minRows={10}
          maxRows={20}
          key={form.key('list')}
          {...form.getInputProps('list')}
          label={language('page.home.subtitle')}
          placeholder={language('page.home.textArea.placeholder')}
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
          >
            {language('page.home.button.save')}
          </Button>
          <Button variant="outline" color="red" onClick={open} mt="md">
            {language('page.home.button.clear')}
          </Button>
        </Flex>
      </form>
    </Container>
  );
}

export default Home;
