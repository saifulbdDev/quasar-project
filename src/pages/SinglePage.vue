<template>
  <q-page class="q-pa-md my-card" v-if="post?.title">
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" icon="home" to="/" />
        <q-breadcrumbs-el label="Post" />
      </q-breadcrumbs>
    </div>
    <q-card class=" ">
      <img src="https://cdn.quasar.dev/img/mountains.jpg" />

      <q-card-section>
        <div class="text-h6">{{ post.title }}</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ post.body }}
      </q-card-section>
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-toolbar-title>Comments</q-toolbar-title>
      </q-toolbar>
      <q-list>
        <template v-for="comment in comments" :key="comment.id">
          <q-item>
            <q-item-section>
              <q-item-label>Comment by : {{ comment.email }}</q-item-label>
              <q-item-label caption lines="2">{{ comment.body }}</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>5 min ago</q-item-label>
              <q-icon name="star" color="yellow" />
            </q-item-section>
          </q-item>

          <q-separator spaced inset />
        </template>
      </q-list>
    </q-card>
  </q-page>
</template>
<script setup>
import { useRoute } from "vue-router";
import { usePostsStore } from "stores/posts";
import { computed } from "vue";
const route = useRoute();
const postsStore = usePostsStore();

const postId = computed(() => route.params.id);
console.log(route.params.id, "route.params.id");
const post = computed(() => postsStore.post);
const comments = computed(() => postsStore.comments);
postsStore.getPost(postId.value);
postsStore.getPostComments(postId.value);
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 800px
  margin:0 auto
</style>
