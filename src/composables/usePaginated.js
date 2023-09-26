import { computed, ref } from "vue";
import { usePostsStore } from "stores/posts";
export function usePagination(config) {
  const postsStore = usePostsStore();
  const rowsPerPage = config.rowsPerPage || ref(10);
  const filterPostList = computed(() =>
    config.selectUser.value
      ? postsStore.posts.filter(
          (item) => item.userId !== config.selectUser.value
        )
      : postsStore.posts
  );
  const paginatedArray = computed(() =>
    filterPostList.value.slice(
      (config.currentPage.value - 1) * rowsPerPage.value,
      config.currentPage.value * rowsPerPage.value
    )
  );

  const numberOfPages = computed(() =>
    Math.ceil((filterPostList.value.length || 0) / rowsPerPage.value)
  );

  return {
    paginatedArray,
    numberOfPages,
  };
}
