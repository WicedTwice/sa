import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { ref } from 'vue';

import UiSelect from './UiSelect.vue';

const meta = {
  title: 'UI/UiSelect',
  component: UiSelect,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
    },
    isDisabled: {
      control: 'boolean',
    },
    options: {
      control: 'object',
    },
  },
} satisfies Meta<typeof UiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = ['Опция 1', 'Опция 2', 'Опция 3'];

export const Default: Story = {
  args: {
    modelValue: 'Опция 1',
    isDisabled: false,
    options: defaultOptions,
  },
  render: (args) => {
    const value = ref(args.modelValue);
    return {
      components: { UiSelect },
      setup() {
        return { args, value };
      },
      template:
        '<UiSelect v-model="value" :is-disabled="args.isDisabled" :options="args.options" />',
    };
  },
};

export const WithManyOptions: Story = {
  args: {
    modelValue: '255.255.255.0',
    isDisabled: false,
    options: [
      '255.255.255.255',
      '255.255.255.254',
      '255.255.255.252',
      '255.255.255.248',
      '255.255.255.240',
      '255.255.255.224',
      '255.255.255.192',
      '255.255.255.128',
      '255.255.255.0',
      '255.255.254.0',
      '255.255.252.0',
    ],
  },
  render: (args) => {
    const value = ref(args.modelValue);
    return {
      components: { UiSelect },
      setup() {
        return { args, value };
      },
      template:
        '<UiSelect v-model="value" :is-disabled="args.isDisabled" :options="args.options" />',
    };
  },
};

export const Disabled: Story = {
  args: {
    modelValue: 'Опция 1',
    isDisabled: true,
    options: defaultOptions,
  },
  render: (args) => {
    const value = ref(args.modelValue);
    return {
      components: { UiSelect },
      setup() {
        return { args, value };
      },
      template:
        '<UiSelect v-model="value" :is-disabled="args.isDisabled" :options="args.options" />',
    };
  },
};

