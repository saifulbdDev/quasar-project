<template>
  <q-card class="my-card" flat bordered v-if="post?.id">
    <q-card-section>
      <div class="text-h5 ellipsis q-mt-sm q-mb-xs">{{ post.title }}</div>
      <div class="text-caption text-grey text-justify">
        {{ post?.body?.slice(0, 150) }}
      </div>
    </q-card-section>

    <q-card-actions>
      <q-btn flat color="info" @click="emit(`edit-post`, post)" label="Edit" />
      <q-btn flat color="secondary" label="Delete" @click="emit(`delete-post`, post)" />

      <q-space />

      <q-btn
        color="primary"
        label="See More"
        label-position="left"
        flat
        icon="visibility"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>


const emit = defineEmits(["delete-post", "edit-post"])
const props = defineProps({
   post: {
      type: Object,
      required: true,
    },
});

</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  margin: 6px;
  max-width: 350px;
}
</style>
