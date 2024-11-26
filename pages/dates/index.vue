<script setup>
import { ref, computed } from "vue";

const startDate = ref("");
const endDate = ref("");
const includeEndOfDate = ref(false);

const dateDiff = computed(() => {
  if (!startDate.value || !endDate.value) return "Please select both dates";

  const start = new Date(startDate.value);
  const end = new Date(endDate.value);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return "Invalid dates";

  if (includeEndOfDate.value) {
    end.setDate(end.getDate() + 1);
  }

  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});
</script>

<template>
  <div class="bg-gray-50 min-h-screen p-6 flex flex-col items-center">
    <header class="text-center">
      <h1 class="text-3xl font-extrabold text-gray-900">
        Date Difference Calculator
      </h1>
      <p class="text-gray-600 mt-2">
        Easily calculate the difference between two dates. Optionally include
        the end of the date.
      </p>
    </header>

    <div class="bg-white shadow rounded-lg p-6 mt-6 w-full max-w-md">
      <div class="mb-4">
        <label for="start-date" class="block text-gray-700 font-medium mb-2"
          >Start Date</label
        >
        <input
          id="start-date"
          v-model="startDate"
          type="date"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Select start date"
        />
      </div>

      <div class="mb-4">
        <label for="end-date" class="block text-gray-700 font-medium mb-2"
          >End Date</label
        >
        <input
          id="end-date"
          v-model="endDate"
          type="date"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Select end date"
        />
      </div>

      <div class="mb-4 flex items-center">
        <input
          id="include-end-date"
          v-model="includeEndOfDate"
          type="checkbox"
          class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          aria-label="Include end of date"
        />
        <label for="include-end-date" class="ml-2 text-gray-700">
          Include End of Date
        </label>
      </div>

      <div class="mt-6">
        <label class="block text-gray-700 font-medium mb-2">Result</label>
        <p
          class="text-2xl font-bold text-indigo-600"
          :class="{
            'text-gray-400':
              dateDiff === 'Invalid dates' ||
              dateDiff === 'Please select both dates',
          }"
        >
          {{ dateDiff }}
        </p>
      </div>
    </div>
  </div>
</template>
