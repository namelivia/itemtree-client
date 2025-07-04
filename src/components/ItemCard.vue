<template lang="pug">
div
  card(:image="imageUrl" :title="name" @width="onWidth")
      p {{ description }}
      router-link(:to="{ name: 'item', params: { itemId: id}}")
          secondary-button(:text="$t('itemCard.details')")
</template>
<script>
import { getImageUrl } from '@/apis/helpers'
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    id: {
      type: Number,
      default: 0,
    },
    parentId: {
      type: Number,
      default: 0,
    },
    destinationId: {
      type: Number,
      default: 0,
    },
    isContainer: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: '',
    },
    imagePath: {
      type: String,
      default: '@/assets/images/image-placeholder.png',
    },
  },
  data: function () {
    return {
      imageUrl: null,
    }
  },
  methods: {
    onWidth(width) {
      this.imageUrl = getImageUrl(this.imagePath, width)
    },
  },
}
</script>
