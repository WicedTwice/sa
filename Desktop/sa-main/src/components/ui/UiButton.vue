<template>
  <button
    :type="props.type"
    :disabled="props.isDisabled"
    :data-layout="props.layout"
    class="ui-button"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface IProps {
  layout?: 'primary' | 'secondary';
  isDisabled?: boolean;
  type?: 'submit' | 'button';
}

interface IEmit {
  (e: 'click', event: MouseEvent): void;
}

const props = withDefaults(defineProps<IProps>(), {
  layout: 'primary',
  isDisabled: false,
  type: 'button',
});

defineEmits<IEmit>();
</script>

<style scoped lang="scss">
@import '../../styles/colors.scss';

.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 18px;
  border: 1px solid transparent;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.95rem;
  font-family: inherit;
  line-height: 1.5;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    opacity 0.2s ease,
    transform 0.05s ease;

  &[data-layout='primary'] {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-white);

    &:hover:not(:disabled) {
      background-color: var(--color-primary-hover);
      border-color: var(--color-primary-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--color-primary-active);
      border-color: var(--color-primary-active);
      transform: translateY(1px);
    }
  }

  &[data-layout='secondary'] {
    background-color: transparent;
    border-color: var(--color-secondary);
    color: var(--color-secondary);

    &:hover:not(:disabled) {
      background-color: var(--color-secondary);
      color: var(--color-white);
    }

    &:active:not(:disabled) {
      background-color: var(--color-secondary-active);
      border-color: var(--color-secondary-active);
      transform: translateY(1px);
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary) 20%, transparent);
  }
}
</style>

