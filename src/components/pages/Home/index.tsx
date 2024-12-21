import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useLocalStorage } from '@mantine/hooks';
import { Container, Text, Textarea, Button, Flex } from '@mantine/core';

import { language } from '../../../modules/language';

function Home() {
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
      <Text size="xl" fw={700} mb="md">
        {language('page.home.title')}
      </Text>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Textarea
          autosize
          minRows={10}
          maxRows={20}
          key={form.key('list')}
          placeholder="Place Items Here"
          {...form.getInputProps('list')}
          label={language('page.home.subtitle')}
        />
        <Flex
          mb="md"
          justify="space-between"
          gap={{ base: 0, md: 'md' }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Button
            mt="md"
            type="submit"
            color="blue"
            variant="filled"
            flex={{ md: 1 }}
          >
            Save
          </Button>
          <Button variant="outline" color="red" onClick={clearForm} mt="md">
            Clear
          </Button>
        </Flex>
      </form>
    </Container>
  );
}

export default Home;
