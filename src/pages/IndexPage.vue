<template>
  <div>
    <q-page class="flex flex-center">
      <BlogCard
        @deletePost="onDeletePost"
        @editPost="onEditPost"
        v-for="(post, i) in posts"
        :key="'post_' + i"
        :post="post"
      />
    </q-page>
    <BlogPaginate />
    <AddPost />
    <UpdatePost :post="selectPost" :isUpdatePost="isnEditModal"/>

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
            Submit
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left" />
              Loading...
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import BlogCard from "components/BlogCard.vue";
import AddPost from "components/AddPost.vue";
import UpdatePost from "components/UpdatePost.vue";
import BlogPaginate from "components/BlogPaginate.vue";
import { computed, ref } from "vue";
import { usePostsStore } from "stores/posts";

const postsStore = usePostsStore();
const posts = computed(() => postsStore.postsList);
const users = computed(() => postsStore.users);
const selectPost = ref({});
const isDeleteModal = ref(false);
const isnEditModal = ref(false);
const isLoading = computed(() => postsStore.loader && isDeleteModal.value);
postsStore.getPosts();
postsStore.getUsers();

const onDeletePost = (user) => {
  selectPost.value = user;
  isDeleteModal.value = true;
};
const onEditPost = (user) => {
  selectPost.value = user;
  isnEditModal.value = true;
};

const deletePost = async () => {
  await postsStore.deletePost(selectPost.value.id);
  isDeleteModal.value = false;
};
</script>
