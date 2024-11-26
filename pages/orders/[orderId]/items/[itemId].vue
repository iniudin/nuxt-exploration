<script setup>
const route = useRoute();
const config = useRuntimeConfig();
const { data } = await useFetch(`${config.public.apiBase}/graphql`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query: `
        query orderItem($id: ID!) {
          orderItem(id: $id) {
            id
            itemCode
            itemName
            quantity
            inventories {
              id
              number
              quantity
            }
          }
        }
      `,
    variables: {
      id: route.params.itemId,
    },
  }),
});

const updateInventory = async (inventories) => {
  try {
    const query = `
    mutation updateItem($id: ID!, $input: [InventoryInput!]!) {
      updateItem(id: $id, input: { inventories: $input }) {
        id
      }
    }
  `;

    const response = await fetch(`${config.public.apiBase}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          id: orderItem.value.id,
          input: inventories,
        },
      }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL Errors:", result.errors);
      throw new Error("Failed to update inventory");
    }
  } catch (error) {
    console.error("Error updating inventory:", error);
  }
};

const orderItem = computed(() => data.value.data.orderItem);

const inventories = ref([]);

const addInventory = () => {
  inventories.value.push({
    number: "",
    quantity: 0,
  });
};

const removeInventory = (index) => {
  inventories.value.splice(index, 1);
};

const totalQuantity = computed(() =>
  inventories.value.reduce((total, inventory) => total + inventory.quantity, 0)
);

const isQuantityValid = computed(
  () => totalQuantity.value === orderItem.value.quantity
);

const submitForm = async () => {
  await updateInventory(inventories.value);
  const router = useRouter();
  router.back();
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-md max-w-2xl mx-auto">
    <div class="px-6 py-4 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900">
        Add Inventory for Item #{{ orderItem.itemCode }}
      </h2>
      <p class="mt-1 text-sm text-gray-600">
        Total Quantity: {{ totalQuantity }} / {{ orderItem.quantity }}
      </p>
    </div>

    <form @submit.prevent="submitForm" class="p-6 space-y-6">
      <div class="space-y-4">
        <div
          v-for="(lot, index) in inventories"
          :key="index"
          class="flex items-center space-x-4"
        >
          <div class="flex-1">
            <input
              type="text"
              placeholder="Lot Number"
              v-model="lot.number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>
          <div class="w-32">
            <input
              type="number"
              placeholder="Quantity"
              v-model="lot.quantity"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="button"
            @click="removeInventory(index)"
            class="text-red-500 hover:text-red-700 transition"
          >
            <Icon name="lucide:trash" class="h-5 w-5" />
          </button>
        </div>
        <button
          type="button"
          @click="addInventory"
          class="flex items-center px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:ring-2 focus:ring-indigo-500"
        >
          <Icon name="lucide:plus" class="h-5 w-5 mr-2" />
          Add Lot
        </button>
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          @click="$router.back()"
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="!isQuantityValid"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Lot Numbers
        </button>
      </div>
    </form>
  </div>
</template>
