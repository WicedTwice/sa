<template>
  <section class="subnet-card">
    <h1 class="subnet-card__title">Калькулятор подсетей</h1>

    <form class="subnet-card__form" @submit.prevent="handleSubmit">
      <UiField label="IP адрес">
        <UiInput
          v-model="ip"
          placeholder="Например, 192.168.1.150"
          @keyup.enter="handleSubmit"
        />
        <p v-if="ip && !isIpValidComputed" class="subnet-card__error">
          Введите корректный IPv4-адрес.
        </p>
      </UiField>

      <UiField label="Маска подсети">
        <UiSelect
          v-model="maskLabel"
          :options="maskOptionLabels"
        />
      </UiField>

      <UiButton
        type="submit"
        :is-disabled="!isIpValidComputed"
      >
        Рассчитать
      </UiButton>
    </form>

    <section v-if="hasResult" class="subnet-card__result">
      <h2 class="subnet-card__subtitle">Результат</h2>

      <div class="subnet-card__row">
        <span class="subnet-card__label-text">IP / Маска:</span>
        <span class="subnet-card__value">
          {{ lastIp }} / {{ lastMaskLabel || lastMask }}
        </span>
      </div>

      <div class="subnet-card__row">
        <span class="subnet-card__label-text">Адрес сети:</span>
        <span class="subnet-card__value">
          {{ networkAddress }}
        </span>
      </div>

      <div class="subnet-card__row">
        <span class="subnet-card__label-text">Количество адресов:</span>
        <span class="subnet-card__value">
          {{ addressesCount }}
        </span>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import UiButton from './ui/UiButton.vue';
import UiField from './ui/UiField.vue';
import UiInput from './ui/UiInput.vue';
import UiSelect from './ui/UiSelect.vue';

import { MASK_OPTIONS } from '../constants/maskOptions';
import { getAddressesCount } from '../utils/getAddressesCount';
import { getNetworkAddress } from '../utils/getNetworkAddress';
import { isIpValid } from '../utils/isIpValid';

const ip = ref('192.168.1.150');
const defaultMaskOption = MASK_OPTIONS[0] ?? { value: '255.255.255.0', label: '255.255.255.0 (/24)' };
const maskLabel = ref(defaultMaskOption.label);

const maskOptionLabels = computed(() => MASK_OPTIONS.map((option) => option.label));

const mask = computed(() => {
  const selectedOption = MASK_OPTIONS.find((option) => option.label === maskLabel.value);
  return selectedOption?.value ?? defaultMaskOption.value;
});

const lastIp = ref('');
const lastMask = ref('');
const lastMaskLabel = ref('');

const isIpValidComputed = computed(() => isIpValid(ip.value));

const networkAddress = computed(() =>
  lastIp.value && lastMask.value ? getNetworkAddress(lastIp.value, lastMask.value) : '',
);

const addressesCount = computed(() =>
  lastMask.value ? getAddressesCount(lastMask.value) : 0,
);

const hasResult = computed(() => Boolean(lastIp.value && lastMask.value));

const handleSubmit = () => {
  if (!isIpValidComputed.value) return;

  lastIp.value = ip.value;
  lastMask.value = mask.value;
  lastMaskLabel.value = maskLabel.value;
};
</script>

<style scoped lang="scss">
.subnet-card {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 640px;
  margin: 40px auto;
  padding: 24px 28px;
  border-radius: 12px;
  background-color: var(--color-white);
  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.06);

  &__title {
    margin-bottom: 8px;
    font-size: 1.5rem;
  }

  &__subtitle {
    margin-bottom: 8px;
    font-size: 1.25rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 16px;

    :deep(.ui-button) {
      align-self: flex-start;
    }
  }

  &__result {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 12px;
    border-top: 1px solid var(--color-gray);
  }

  &__row {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    font-size: 0.95rem;
  }

  &__label-text {
    font-weight: 700;
  }

  &__value {
    font-family: 'base', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  &__error {
    margin: 0;
    font-size: 0.8rem;
    color: var(--color-error);
  }
}

@media (max-width: 640px) {
  .subnet-card {
    margin: 24px 16px;
    padding: 20px 16px;
  }
}
</style>


