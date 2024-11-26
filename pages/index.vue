<template>
  <div class="bg-white min-h-screen p-6">
    <h1 class="text-3xl font-bold text-gray-900">
      Welcome to Nuxt App Challange
    </h1>
    <p>There some my excercises in Javacript Challange</p>
    <p>Check out the code on GitHub</p>

    <div class="flex flex-col mt-6">
      <div class="mb-4 bg-gray-100 p-4 rounded shadow">
        <h2 class="text-3xl font-bold">Date Difference</h2>
        <p>This is a simple date difference calculator.</p>
        <p>
          It is a simple calculator that can calculate the difference between
          two dates.
        </p>
        <NuxtLink to="/dates" class="text-indigo-600">View Demo</NuxtLink>
      </div>

      <div class="mb-4 bg-gray-100 p-4 rounded shadow">
        <h2 class="text-3xl font-bold">Revamp</h2>
        <p>This is a simple revamp code.</p>
        <p>
          It is a code that can query and calculate and convert to default units
          (kg).
        </p>
        <NuxtLink
          to="https://github.com/iniudin/nuxt-graphql-exploration/tree/main/revamp"
          class="text-indigo-600"
          >View Demo</NuxtLink
        >
      </div>

      <div class="mb-4 bg-gray-100 p-4 rounded shadow">
        <h2 class="text-3xl font-bold">Purchase Orders</h2>
        <p>Purchase order management system.</p>
        <p>
          It demonstrates a purchase order management system that can manage
          item inventories.
        </p>
        <NuxtLink to="/orders" class="text-indigo-600">View Demo</NuxtLink>
      </div>
    </div>
  </div>
</template>
