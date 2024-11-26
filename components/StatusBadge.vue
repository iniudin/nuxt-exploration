<script setup lang="ts">
import type { Status } from "~/types";

defineProps<{ status: Status }>();

const statusStyles = {
  PENDING_APPROVAL: "bg-yellow-100 text-yellow-800",
  PENDING_RECEIVE: "bg-blue-100 text-blue-800",
  RECEIVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

const statusLabels = {
  PENDING_APPROVAL: "Pending Approval",
  PENDING_RECEIVE: "Pending Receive",
  RECEIVED: "Received",
  REJECTED: "Rejected",
};
</script>
<template>
  <span
    :class="statusStyles[status]"
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
  >
    {{ statusLabels[status] }}
  </span>
</template>
