<template>
  <q-page class="q-mt-md">
    <div class="flex flex-center">
      <BlogCard
        @deletePost="onDeletePost"
        @editPost="onEditPost"
        v-for="(post, i) in paginatedArray"
        :key="'post_' + i"
        :post="post"
      />
    </div>
    <BlogPaginate
      class="pagination-component justify-center"
      v-model="currentPage"
      :numberOfPages="numberOfPages"
    />
    <AddPost />
    <UpdatePost :post="selectPost" />

    <q-dialog v-model="isDeleteModal" persistent>
      <q-card style="width: 600px">
        <q-card-section class="">
          <div class="text-h6">Delete Post</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="row items-center">
          <span class="q-ml-sm text-bold"
            >Are you sure you want to delete this Post?</span
          >
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            @click="deletePost"
            style="width: 150px"
            :disable="isLoading"
            :loading="isLoading"
            color="primary"
          >
            Delete
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left" />
              Loading...
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { usePagination } from "../composables/usePaginated";
import { usePostsStore } from "stores/posts";
import BlogCard from "components/BlogCard.vue";
import AddPost from "components/AddPost.vue";
import UpdatePost from "components/UpdatePost.vue";
import BlogPaginate from "components/BlogPaginate.vue";
import { computed, ref } from "vue";

const postsStore = usePostsStore();

const currentPage = computed({
  get() {
    return postsStore.currentPage;
  },
  set(val) {
    postsStore.currentPage = val;
  },
});

const rowsPerPage = ref(12);
const { paginatedArray, numberOfPages } = usePagination({
  rowsPerPage,
  currentPage,
});

const selectPost = ref({});
const isDeleteModal = ref(false);

const isLoading = computed(() => postsStore.loader && isDeleteModal.value);
postsStore.getPosts();
postsStore.getUsers();

const onDeletePost = (user) => {
  selectPost.value = user;
  isDeleteModal.value = true;
};
const onEditPost = (user) => {
  selectPost.value = user;
  postsStore.onUpdateModel(true);
};

const deletePost = async () => {
  await postsStore.deletePost(selectPost.value.id);
  isDeleteModal.value = false;
};
</script>
