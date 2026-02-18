<template>
  <select
    :value="props.modelValue"
    :disabled="props.isDisabled"
    class="ui-select"
    @change="handleChange"
  >
    <option
      v-for="(option, index) in props.options"
      :key="index"
      :value="option"
    >
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts">
interface IProps {
  modelValue: string;
  isDisabled?: boolean;
  options: string[];
}

interface IEmit {
  (e: 'update:modelValue', value: string): void;
}

const props = withDefaults(defineProps<IProps>(), {
  isDisabled: false,
  options: () => [],
});

const emit = defineEmits<IEmit>();

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};
</script>

<style scoped lang="scss">
@import '../../styles/colors.scss';

.ui-select {
  width: 100%;
  padding: 8px 10px;
  padding-right: 32px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: 0.95rem;
  font-family: inherit;
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-bg);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23000' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
  appearance: none;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;

  &:focus-visible {
    outline: none;
    border-color: var(--color-border-focus);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary) 20%, transparent);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: var(--color-bg-disabled);
    color: var(--color-text-disabled);
    opacity: 0.6;
  }

  option {
    padding: 4px;
  }
}
</style>

