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
        query Order($id: ID!) {
          order(id: $id) {
            id
            createdAt
            status
            items {
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
        }
      `,
    variables: {
      id: route.params.orderId,
    },
  }),
});
const order = computed(() => data.value.data.order);
const canApprove = computed(() => order.value.status === "PENDING_APPROVAL");
const canReceive = computed(() => order.value.status === "PENDING_RECEIVE");
const allItemsHaveLots = computed(() =>
  order.value.items.every((item) => item.inventories.length > 0)
);

const updateStatus = async (status) => {
  try {
    const query = `
      mutation UpdateOrderStatus($id: ID!, $input: OrderStatus!) {
        updateOrderStatus(id: $id, input: $input) {
          id
          status
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
        variables: { id: order.value.id, input: status },
      }),
    });
    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL Errors:", result.errors);
      throw new Error("Failed to update order status");
    }

    order.value.status = status;
  } catch (error) {
    console.error("Error updating order status:", error);
  }
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-md">
    <div
      class="px-6 py-4 border-b border-gray-200 flex items-center justify-between"
    >
      <div class="flex items-center space-x-4">
        <button
          class="text-gray-500 hover:text-gray-700 transition rounded-full p-2"
          aria-label="Go back"
          @click="navigateTo('/orders')"
        >
          <Icon name="lucide:arrow-left" class="w-5 h-5" />
        </button>
        <div class="flex items-center space-x-2">
          <Icon name="lucide:clipboard" class="w-6 h-6 text-primary-600" />
          <h2 class="text-lg font-semibold text-gray-900">
            Order #{{ order.id }}
          </h2>
        </div>
      </div>
      <StatusBadge :status="order.status" />
    </div>

    <div class="p-6">
      <div class="mb-6">
        <h3 class="text-sm font-semibold text-gray-700">Order Details</h3>
        <p class="mt-1 text-sm text-gray-600">
          <span class="font-medium">Created:</span>
          {{ new Date(Number(order.createdAt)).toLocaleString() }}
        </p>
      </div>

      <div class="mb-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-gray-700">Items</h3>
          <div
            v-if="canApprove || (canReceive && allItemsHaveLots)"
            class="flex space-x-2"
          >
            <Button
              v-if="canApprove"
              variant="success"
              @Click="updateStatus('PENDING_RECEIVE')"
              >Approve</Button
            >
            <Button
              v-if="canApprove"
              variant="danger"
              @Click="updateStatus('REJECTED')"
              >Reject</Button
            >
            <Button
              v-if="canReceive && allItemsHaveLots"
              @Click="updateStatus('RECEIVED')"
              variant="primary"
              >Mark as Received</Button
            >
          </div>
        </div>

        <div class="overflow-hidden border border-gray-200 rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-semibold text-gray-600 tracking-wider"
                >
                  Item Code
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-semibold text-gray-600 tracking-wider"
                >
                  Name
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-semibold text-gray-600 tracking-wider"
                >
                  Quantity
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-semibold text-gray-600 tracking-wider"
                >
                  Lot Numbers
                </th>
                <th
                  v-if="!allItemsHaveLots"
                  class="px-6 py-3 text-right text-xs font-semibold text-gray-600 tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="item in order.items"
                :key="item.id"
                class="hover:bg-gray-50"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  {{ item.itemCode }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {{ item.itemName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {{ item.quantity }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <div v-if="item.inventories.length > 0">
                    <ul class="space-y-1">
                      <li
                        v-for="lot in item.inventories"
                        :key="lot.id"
                        class="flex justify-between text-sm text-gray-600"
                      >
                        <span>Lot: {{ lot.number }}</span>
                        <span>Qty: {{ lot.quantity }}</span>
                      </li>
                    </ul>
                  </div>
                  <span v-else class="text-gray-400">No lots assigned</span>
                </td>
                <td
                  v-if="canReceive"
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <div class="flex justify-end space-x-2">
                    <Button
                      v-if="item.inventories.length === 0"
                      variant="primary"
                      @Click="
                        $router.push(`/orders/${order.id}/items/${item.id}`)
                      "
                      >Add Inventory</Button
                    >
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
