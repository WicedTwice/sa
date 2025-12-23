<template>
  <div class="subnet-calculator">
    <div class="subnet-calculator__form">
      <div class="subnet-calculator__field">
        <label class="subnet-calculator__label" for="ip-input">
          IP адрес:
        </label>
        <input
          id="ip-input"
          v-model="ipAddress"
          type="text"
          class="subnet-calculator__input"
          :class="{ 'subnet-calculator__input--error': !isValidIp }"
          placeholder="192.168.1.150"
          @keyup.enter="calculate"
        />
        <span v-if="!isValidIp && ipAddress" class="subnet-calculator__error">
          Неверный IP адрес
        </span>
      </div>

      <div class="subnet-calculator__field">
        <label class="subnet-calculator__label" for="mask-select">
          Сетевая маска:
        </label>
        <select
          id="mask-select"
          v-model="selectedMask"
          class="subnet-calculator__select"
        >
          <option
            v-for="mask in SUBNET_MASKS"
            :key="mask.cidr"
            :value="mask.mask"
          >
            {{ mask.label }}
          </option>
        </select>
      </div>

      <button
        class="subnet-calculator__button"
        :disabled="!canCalculate"
        @click="calculate"
      >
        Рассчитать
      </button>
    </div>

    <div v-if="result" class="subnet-calculator__result">
      <h2 class="subnet-calculator__title">Результаты расчета:</h2>
      <div class="subnet-calculator__result-item">
        <span class="subnet-calculator__result-label">IP адрес:</span>
        <span class="subnet-calculator__result-value">{{ result.ip }}</span>
      </div>
      <div class="subnet-calculator__result-item">
        <span class="subnet-calculator__result-label">Маска:</span>
        <span class="subnet-calculator__result-value">{{ result.mask }}</span>
      </div>
      <div class="subnet-calculator__result-item">
        <span class="subnet-calculator__result-label">Адрес сети:</span>
        <span class="subnet-calculator__result-value">{{ result.networkAddress }}</span>
      </div>
      <div class="subnet-calculator__result-item">
        <span class="subnet-calculator__result-label">Количество адресов:</span>
        <span class="subnet-calculator__result-value">{{ result.addressesCount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { SUBNET_MASKS } from '../constants/subnetMasks';
import { isIpValid } from '../utils/ipValidation';
import { getNetworkAddress } from '../utils/networkAddress';
import { getAddressesCount } from '../utils/addressCount';

interface CalculationResult {
  ip: string;
  mask: string;
  networkAddress: string;
  addressesCount: number;
}

const ipAddress = ref('');
const selectedMask = ref('255.255.255.0');

const isValidIp = computed(() => {
  if (!ipAddress.value) return true;
  return isIpValid(ipAddress.value);
});

const canCalculate = computed(() => {
  return isValidIp.value && ipAddress.value.length > 0;
});

const result = ref<CalculationResult | null>(null);

function calculate() {
  if (!canCalculate.value) return;

  const networkAddress = getNetworkAddress(ipAddress.value, selectedMask.value);
  const addressesCount = getAddressesCount(selectedMask.value);

  result.value = {
    ip: ipAddress.value,
    mask: selectedMask.value,
    networkAddress,
    addressesCount,
  };
}
</script>

<style scoped lang="scss">
.subnet-calculator {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
}

.subnet-calculator__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 32px;
}

.subnet-calculator__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.subnet-calculator__label {
  font-weight: 700;
  color: var(--color-black);
}

.subnet-calculator__input,
.subnet-calculator__select {
  padding: 12px;
  border: 2px solid var(--color-gray);
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
}

.subnet-calculator__input--error {
  border-color: var(--color-error);
}

.subnet-calculator__error {
  color: var(--color-error);
  font-size: 0.875rem;
}

.subnet-calculator__button {
  padding: 12px 24px;
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;

  &:hover:not(:disabled) {
    background-color: #005a9a;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.subnet-calculator__result {
  padding: 24px;
  background-color: var(--color-gray);
  border-radius: 4px;
}

.subnet-calculator__title {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: var(--color-black);
}

.subnet-calculator__result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  &:last-child {
    border-bottom: none;
  }
}

.subnet-calculator__result-label {
  font-weight: 700;
  color: var(--color-black);
}

.subnet-calculator__result-value {
  color: var(--color-primary);
  font-family: monospace;
}
</style>

