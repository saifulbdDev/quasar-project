import { computed, ref } from "vue";

const MIN_VISIBLE_PAGES = 6;

export default function usePaginatedRange(
  totalCount,
  pageSize,
  currentPage,
  showEllipses = ref(true)
) {
  const totalPages = computed(() =>
    Math.ceil(totalCount.value / pageSize.value)
  );
  const visiblePages = ref(Math.max(MIN_VISIBLE_PAGES, totalPages.value));

  const getVisiblePagesThreshold = computed(() =>
    Math.floor((totalPages.value - 1) / 2)
  );

  const isMoreItemsThanVisible = computed(
    () => totalPages.value >= visiblePages.value
  );

  const shouldShowEllipses = computed(
    () => showEllipses.value && isMoreItemsThanVisible.value
  );

  const position = computed(() => {
    const threshold = getVisiblePagesThreshold.value;
    if (currentPage.value <= threshold + 1) {
      return "start";
    } else if (currentPage.value >= totalPages.value - threshold + 1) {
      return "end";
    } else {
      return "elsewhere";
    }
  });

  const pagination = computed(() => {
    const items = Array.from({ length: visiblePages.value }, (_, index) => {
      if (position.value === "start") {
        return index + 1;
      } else if (position.value === "end") {
        return totalPages.value - visiblePages.value + index + 1;
      } else {
        return currentPage.value - getVisiblePagesThreshold.value + index;
      }
    });

    if (position.value === "start") {
      items[items.length - 1] = totalPages.value;
      if (shouldShowEllipses.value) {
        items[items.length - 2] = "…";
      }
    } else if (position.value === "end") {
      items[0] = 1;
      if (shouldShowEllipses.value) {
        items[1] = "…";
      }
    } else {
      items[0] = 1;
      items[items.length - 1] = totalPages.value;
      if (shouldShowEllipses.value) {
        items[1] = "…";
        items[items.length - 2] = "…";
      }
    }

    return items;
  });

  return {
    pagination,
  };
}
