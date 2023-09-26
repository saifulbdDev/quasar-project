import { computed, ref } from "vue";
import { usePostsStore } from "stores/posts";
export function usePagination(config) {
  const postsStore = usePostsStore();
  const rowsPerPage = config.rowsPerPage || ref(10);
 
  const paginatedArray = computed(() =>
    postsStore.postsList.slice(
      (config.currentPage.value - 1) * rowsPerPage.value,
      config.currentPage.value * rowsPerPage.value
    )
  );

  const numberOfPages = computed(() =>
    Math.ceil((postsStore.postsList.length || 0) / rowsPerPage.value)
  );

  return {
    paginatedArray,
    numberOfPages,
  };
}
