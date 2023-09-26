<template>
  <q-dialog v-model="postsStore.isUpdatePost">
    <q-card style="width: 600px; max-width: 80vw">
      <q-form @submit="submitForm" @reset="closeForm" class="q-gutter-sm">
        <q-card-section class="q-mb-md">
          <div class="text-h6">Add Post Title</div>
        </q-card-section>
        <q-separator />
        <q-input
          filled
          class="q-px-md"
          v-model="formData.title"
          label="Post Title *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <q-input
          v-model="formData.body"
          filled
          class="q-px-md"
          label="Post Body *"
          type="textarea"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            type="submit"
            style="width: 150px"
            :disable="isLoading"
            :loading="isLoading"
            color="primary"
            @click="progress = true"
          >
            Submit
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left" />
              Loading...
            </template>
          </q-btn>

          <q-btn
            label="Cancel"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
            @click="postsStore.onUpdateModel(false)"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, reactive, watch } from "vue";
import { usePostsStore } from "stores/posts";
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const formData = reactive(props.post);

watch(
  () => props.post,
  (value) => {
    formData.title = value.title;
    formData.body = value.body;
  }
);
const postsStore = usePostsStore();
const isLoading = computed(() => postsStore.loader && postsStore.isUpdatePost);

const submitForm = async () => {
  if (!formData.title || !formData.body) return;

  await postsStore.updatePost({
    title: formData.title,
    body: formData.body,
    id: props?.post?.id,
  });

  postsStore.onUpdateModel(false);
};
</script>
