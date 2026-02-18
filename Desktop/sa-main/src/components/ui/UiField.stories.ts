import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { ref } from 'vue';

import UiField from './UiField.vue';
import UiInput from './UiInput.vue';
import UiSelect from './UiSelect.vue';

const meta = {
  title: 'UI/UiField',
  component: UiField,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof UiField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInput: Story = {
  args: {
    label: 'E-mail',
  },
  render: (args) => {
    const value = ref('');
    return {
      components: { UiField, UiInput },
      setup() {
        return { args, value };
      },
      template: `
        <UiField :label="args.label">
          <UiInput v-model="value" placeholder="Введите e-mail" />
        </UiField>
      `,
    };
  },
};

export const WithSelect: Story = {
  args: {
    label: 'Маска подсети',
  },
  render: (args) => {
    const value = ref('255.255.255.0');
    const options = [
      '255.255.255.0',
      '255.255.0.0',
      '255.0.0.0',
    ];
    return {
      components: { UiField, UiSelect },
      setup() {
        return { args, value, options };
      },
      template: `
        <UiField :label="args.label">
          <UiSelect v-model="value" :options="options" />
        </UiField>
      `,
    };
  },
};

export const WithoutLabel: Story = {
  args: {
    label: '',
  },
  render: (args) => {
    const value = ref('');
    return {
      components: { UiField, UiInput },
      setup() {
        return { args, value };
      },
      template: `
        <UiField :label="args.label">
          <UiInput v-model="value" placeholder="Введите текст" />
        </UiField>
      `,
    };
  },
};

