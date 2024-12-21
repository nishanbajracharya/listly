import { ModalTitle, createTheme } from '@mantine/core';

const theme = createTheme({
  components: {
    ModalTitle: ModalTitle.extend({
      defaultProps: {
        fw: 700,
      },
    }),
  },
});

export default theme;
