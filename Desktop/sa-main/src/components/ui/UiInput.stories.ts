import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { ref } from 'vue';

import UiInput from './UiInput.vue';

const meta = {
  title: 'UI/UiInput',
  component: UiInput,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
    },
    isDisabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
} satisfies Meta<typeof UiInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: '',
    isDisabled: false,
    placeholder: 'Введите текст',
  },
  render: (args) => {
    const value = ref(args.modelValue);
    return {
      components: { UiInput },
      setup() {
        return { args, value };
      },
      template:
        '<UiInput v-model="value" :is-disabled="args.isDisabled" :placeholder="args.placeholder" />',
    };
  },
};

export const WithValue: Story = {
  args: {
    modelValue: '192.168.1.150',
    isDisabled: false,
    placeholder: 'Введите текст',
  },
  render: (args) => {
    const value = ref(args.modelValue);
    return {
      components: { UiInput },
      setup() {
        return { args, value };
      },
      template:
        '<UiInput v-model="value" :is-disabled="args.isDisabled" :placeholder="args.placeholder" />',
    };
  },
};

export const Disabled: Story = {
  args: {
    modelValue: '192.168.1.150',
    isDisabled: true,
    placeholder: 'Введите текст',
  },
  render: (args) => {
    const value = ref(args.modelValue);
    return {
      components: { UiInput },
      setup() {
        return { args, value };
      },
      template:
        '<UiInput v-model="value" :is-disabled="args.isDisabled" :placeholder="args.placeholder" />',
    };
  },
};

