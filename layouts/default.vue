<script setup>
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Date Difference", href: "/dates" },
  {
    name: "Revamp",
    href: "https://github.com/iniudin/nuxt-graphql-exploration/tree/main/revamp",
  },
  { name: "Orders", href: "/orders" },
];
</script>
<template>
  <div class="min-h-screen bg-gray-100">
    <div class="py-6">
      <header class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold text-gray-900">Nuxt App</h1>
          <slot name="actions" />
        </div>

        <nav class="mt-6 bg-white shadow-sm rounded-md">
          <ul class="flex space-x-4">
            <li
              v-for="link in navLinks"
              :key="link.name"
              :class="{
                'border-b-2 border-indigo-500': link.href === $route.path,
              }"
              class="text-sm font-medium text-gray-500 hover:text-gray-700 px-3 py-2"
            >
              <NuxtLink :to="link.href">{{ link.name }}</NuxtLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <div class="mt-8">
        <slot />
      </div>
    </main>
  </div>
</template>
