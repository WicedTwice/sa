<template>
  <div class="ui-field">
    <label v-if="props.label" class="ui-field__label">
      {{ props.label }}
    </label>
    <div class="ui-field__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  label?: string;
}

interface IEmit {}

const props = withDefaults(defineProps<IProps>(), {
  label: '',
});

defineEmits<IEmit>();
</script>

<style scoped lang="scss">
@import '../../styles/colors.scss';

.ui-field {
  display: flex;
  flex-direction: column;
  gap: 6px;

  &__label {
    font-weight: 700;
    font-size: 0.95rem;
    color: var(--color-text);
  }

  &__content {
    display: flex;
    flex-direction: column;
  }
}
</style>

