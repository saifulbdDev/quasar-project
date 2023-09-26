import { computed, ref } from "vue";

const MIN_VISIBLE_PAGES = 6;

export default function usePaginatedRange(
  totalPages,
  visiblePages = ref(MIN_VISIBLE_PAGES),
  currentPage,
  showEllipses = ref(true)
) {
  const getVisiblePagesThreshold = computed(() =>
    Math.floor((totalPages.value - 1) / 2)
  );
  const isMoreItemsThanVisible = computed(
    () => totalPages.value >= visiblePages.value
  );
  const shouldShowEllipses = computed(() => {
    if (!showEllipses.value) {
      return false;
    }
    return isMoreItemsThanVisible.value;
  });
  const getTotalPages = computed(() => {
    if (!isMoreItemsThanVisible.value) {
      return totalPages.value;
    }
    return visiblePages.value < MIN_VISIBLE_PAGES
      ? MIN_VISIBLE_PAGES
      : visiblePages.value;
  });
  const position = computed(() => {
    if (currentPage.value <= getVisiblePagesThreshold.value + 1) {
      return "start";
    } else if (
      currentPage.value >=
      totalPages.value - getVisiblePagesThreshold.value + 1
    ) {
      return "end";
    } else {
      return "elsewhere";
    }
  });
  const pagination = computed(() => {
    let items;

    switch (position.value) {
      case "start":
        items = Array.from({ length: getTotalPages.value }, (_, index) => {
          return index + 1;
        });
        items.splice(items.length - 1, 1, totalPages.value);
        if (shouldShowEllipses.value) {
          items.splice(items.length - 2, 1, "…");
        }
        break;
      case "end":
        items = Array.from({ length: getTotalPages.value }, (_, index) => {
          return totalPages.value - index;
        });
        items.reverse().splice(0, 1, 1);
        if (shouldShowEllipses.value) {
          items.splice(1, 1, "…");
        }
        break;
      default:
        items = Array.from({ length: getTotalPages.value }, (_, index) => {
          return currentPage.value - getVisiblePagesThreshold.value + index;
        });
        items.splice(0, 1, 1);
        items.splice(items.length - 1, 1, totalPages.value);
        if (shouldShowEllipses.value) {
          items.splice(1, 1, "…");
          items.splice(items.length - 2, 1, "…");
        }
        break;
    }
    return items;
  });
  return {
    pagination,
  };
}
