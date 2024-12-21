import { ModalTitle, createTheme, Switch } from '@mantine/core';

const theme = createTheme({
  components: {
    ModalTitle: ModalTitle.extend({
      defaultProps: {
        fw: 700,
      },
    }),
    Switch: Switch.extend({
      defaultProps: {
        fw: 700,
      },
    }),
  },
});

export default theme;
