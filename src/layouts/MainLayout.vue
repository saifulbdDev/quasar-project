<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white text-primary">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>
        <template v-if="postsStore.user.id && route.path === '/'">
          <q-btn
            flat
            label="add post"
            icon="add"
            aria-label="Menu"
            class="q-mr-md"
            @click="postsStore.onAddPost(true)"
          />

          <q-select
            class="q-my-sm"
            filled
            v-model="selectUser"
            :options="users"
            label="Filter By User"
            option-value="id"
            option-label="name"
            style="width: 250px"
          >
            <template v-slot:append>
              <q-icon
                v-if="selectUser !== null"
                name="close"
                @click.stop.prevent="selectUser = null"
                class="cursor-pointer"
              /> </template
          ></q-select>
        </template>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item to="/" class="q-text-6" header> Quasar App </q-item>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useRoute } from "vue-router"

const route = useRoute()
import { usePostsStore } from "stores/posts";
const postsStore = usePostsStore();
const users = computed(() => postsStore.users);

const selectUser = computed({
  get() {
    return postsStore.selectUser;
  },
  set(val) {
    postsStore.selectUser = val;
    postsStore.currentPage = 1;
  },
});
const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
