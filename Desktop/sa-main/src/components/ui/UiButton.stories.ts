import type { Meta, StoryObj } from '@storybook/vue3-vite';

import UiButton from './UiButton.vue';

const meta = {
  title: 'UI/UiButton',
  component: UiButton,
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    isDisabled: {
      control: 'boolean',
    },
    type: {
      control: 'select',
      options: ['button', 'submit'],
    },
  },
} satisfies Meta<typeof UiButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    layout: 'primary',
    isDisabled: false,
    type: 'button',
  },
  render: (args) => ({
    components: { UiButton },
    setup() {
      return { args };
    },
    template: '<UiButton v-bind="args">Кнопка</UiButton>',
  }),
};

export const Secondary: Story = {
  args: {
    layout: 'secondary',
    isDisabled: false,
    type: 'button',
  },
  render: (args) => ({
    components: { UiButton },
    setup() {
      return { args };
    },
    template: '<UiButton v-bind="args">Кнопка</UiButton>',
  }),
};

export const Disabled: Story = {
  args: {
    layout: 'primary',
    isDisabled: true,
    type: 'button',
  },
  render: (args) => ({
    components: { UiButton },
    setup() {
      return { args };
    },
    template: '<UiButton v-bind="args">Кнопка</UiButton>',
  }),
};

export const Submit: Story = {
  args: {
    layout: 'primary',
    isDisabled: false,
    type: 'submit',
  },
  render: (args) => ({
    components: { UiButton },
    setup() {
      return { args };
    },
    template: '<UiButton v-bind="args">Отправить</UiButton>',
  }),
};

