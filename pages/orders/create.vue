<script setup>
const config = useRuntimeConfig();
const createOrder = async (items) => {
  try {
    const response = await fetch(`${config.public.apiBase}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation CreateOrder($items: [OrderItemInput!]!) {
            createOrder(input: { items: $items }) {
              id
            }
          }
        `,
        variables: {
          items,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error creating order:", error);
  }
};
const items = ref([{ itemCode: "", itemName: "", quantity: 1 }]);

const addItem = () => {
  items.value.push({ itemCode: "", itemName: "", quantity: 1 });
};

const removeItem = () => {
  items.value.splice(index, 1);
};

const submitForm = async () => {
  await createOrder(items.value);
  navigateTo("/orders");
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <div class="px-6 py-4 bg-indigo-600">
      <h2 class="text-lg font-semibold text-white">
        Create New Purchase Order
      </h2>
    </div>

    <form @submit.prevent="submitForm" class="p-6">
      <div class="space-y-6">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="flex items-center space-x-4"
        >
          <div class="flex-1">
            <label
              for="itemCode"
              class="block text-sm font-medium text-gray-700"
            >
              Item Code
            </label>
            <input
              id="itemCode"
              type="text"
              v-model="item.itemCode"
              placeholder="Enter Item Code"
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div class="flex-1">
            <label
              for="itemName"
              class="block text-sm font-medium text-gray-700"
            >
              Item Name
            </label>
            <input
              id="itemName"
              type="text"
              v-model="item.itemName"
              placeholder="Enter Item Name"
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div class="w-32">
            <label
              for="quantity"
              class="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              v-model="item.quantity"
              placeholder="Qty"
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              min="1"
              step="1"
              required
            />
          </div>

          <button
            v-if="items.length > 1"
            type="button"
            @click="removeItem(index)"
            class="text-red-500 hover:text-red-700 transition"
          >
            <Icon name="lucide:trash" class="h-5 w-5" />
          </button>
        </div>
      </div>

      <div class="mt-6">
        <button
          type="button"
          @click="addItem"
          class="flex items-center px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:ring-2 focus:ring-indigo-500"
        >
          <Icon name="lucide:plus" class="h-5 w-5 mr-2" />
          Add Item
        </button>
      </div>

      <div class="mt-8 flex justify-end space-x-4">
        <RouterLink
          :to="{ name: 'orders' }"
          class="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:ring-2 focus:ring-indigo-500"
        >
          Cancel
        </RouterLink>
        <button
          type="submit"
          class="px-6 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
        >
          Create Order
        </button>
      </div>
    </form>
  </div>
</template>
