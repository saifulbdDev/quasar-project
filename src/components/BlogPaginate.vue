<template>
  <q-pagination
    v-model="currentPage"
    :max="pagination"
    direction-links
    unelevated
    color="black"
    active-color="purple"
  />
</template>

<script setup>
import { ref } from "vue";
import usePaginatedRange from "../composables/usePaginatedRange"; // Adjust the path as needed

const totalCount = ref(100); // Replace with your actual total count
const pageSize = ref(10); // Replace with your actual page size
const currentPage = ref(1); // Replace with your actual current page number

const { pagination } = usePaginatedRange(totalCount, pageSize, currentPage);
console.log(pagination, 'pagination')
</script>
