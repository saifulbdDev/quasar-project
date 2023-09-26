<template>
  <div class="q-pa-md q-mx-auto" style="max-width: 550px">
    <q-toolbar class="bg-primary justify-between text-white shadow-2">
      <q-toolbar-title>Select Current User</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
      <q-item
        v-for="user in users"
        :key="user.id"
        class="q-my-sm"
        clickable
        @click="postsStore.currentUser(user)"
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user?.name?.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
          <q-item-label caption lines="1">{{ user.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="person_add" color="green" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { usePostsStore } from "stores/posts";

const postsStore = usePostsStore();

const users = computed(() => postsStore.users);

postsStore.getUsers();
</script>
