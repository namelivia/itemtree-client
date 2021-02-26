<template lang="pug">
    b-card.mb-2(
        :title="name"
        :img-src="imageUrl"
        :img-alt="name"
        img-top
        style="max-width: 20rem;"
    )
        b-card-text
            p {{ description }}
        router-link(:to="{ name: 'item', params: { itemId: id}}")
            b-button.ml-2(v-t="'itemCard.details'")
</template>
<script>
import { getImageUrl } from "@/apis/helpers";
export default {
  props: {
    name: {
      type: String,
      default: "",
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
      default: "",
    },
    imagePath: {
      type: String,
      default: "@/assets/images/image-placeholder.png",
    },
  },
  computed: {
    imageUrl: function () {
      if (this.imagePath) {
        return getImageUrl(this.imagePath);
      }
      return null;
    },
  },
};
</script>
