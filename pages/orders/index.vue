<script setup>
const { data } = useFetch("http://localhost:4000/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query: `
      query {
        orders {
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
  }),
});

const orders = computed(() => data.value.data.orders);
</script>

<template>
  <div class="bg-white rounded-lg shadow">
    <div class="px-6 py-4 border-b border-gray-200 bg-white shadow-sm">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <Icon name="lucide:clipboard" class="w-6 h-6 text-blue-500" />
          <h2 class="text-xl font-bold text-gray-800">Purchase Orders</h2>
        </div>
        <NuxtLink
          to="/orders/create"
          class="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Icon name="lucide:plus" class="w-5 h-5" />
          <span class="font-medium">Create Order</span>
        </NuxtLink>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg">
      <div
        v-for="order in orders"
        :key="order.id"
        class="group border-b last:border-none border-gray-200 hover:bg-gray-50 transition"
      >
        <div class="px-6 py-4 cursor-pointer">
          <div class="flex justify-between items-center">
            <div>
              <p
                class="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition"
                @click="$router.push(`/orders/${order.id}`)"
              >
                Order #{{ order.id }}
              </p>
              <p class="text-sm text-gray-500">
                Created: {{ order.createdAt }}
              </p>
            </div>

            <div>
              <StatusBadge :status="order.status" />
            </div>
          </div>

          <div class="mt-4">
            <p class="text-sm text-gray-500">
              <span class="font-medium text-gray-700">{{
                order.items.length
              }}</span>
              items | Total Quantity:
              <span class="font-medium text-gray-700">{{
                order.items.reduce((acc, item) => acc + item.quantity, 0)
              }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
