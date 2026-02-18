<template>
  <input
    :value="props.modelValue"
    :disabled="props.isDisabled"
    :placeholder="props.placeholder"
    class="ui-input"
    type="text"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
interface IProps {
  modelValue: string;
  isDisabled?: boolean;
  placeholder?: string;
}

interface IEmit {
  (e: 'update:modelValue', value: string): void;
}

const props = withDefaults(defineProps<IProps>(), {
  isDisabled: false,
  placeholder: '',
});

const emit = defineEmits<IEmit>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style scoped lang="scss">
@import '../../styles/colors.scss';

.ui-input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: 0.95rem;
  font-family: inherit;
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-bg);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;

  &::placeholder {
    color: var(--color-text-secondary);
  }

  &:focus-visible {
    outline: none;
    border-color: var(--color-border-focus);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary) 20%, transparent);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: var(--color-bg-disabled);
    color: var(--color-text-disabled);
  }
}
</style>

