<template lang="pug">
section
    loading(v-if='loading')
    div(v-else)
        item-card-big(:item-id="itemId")
        .mt-4
        comments(:item-id="itemId")
        .mt-4
        card-grid
          item-card(
                v-for='item in children' :key='item.id'
                :id="item.id"
                :name="item.name"
                :description="item.description"
                :parent-id="item.parent_id"
                :destination-id="item.destination_id"
                :is-container="item.is_container"
                :image-path="item.image"
            )
</template>

<script>
import ItemCard from '@/components/ItemCard.vue'
import ItemCardBig from '@/views/ItemDetail/components/ItemCardBig.vue'
import Comments from '@/components/Comments.vue'
import { getItems } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  components: {
    Comments,
    ItemCardBig,
    ItemCard,
  },
  props: {
    itemId: {
      type: Number,
      default: 0,
    },
  },
  data: function () {
    return {
      children: [],
      loading: true,
    }
  },
  watch: {
    itemId: {
      immediate: true,
      handler: function () {
        this.loadChildren()
      },
    },
  },
  methods: {
    async loadChildren() {
      const toast = useToast()
      try {
        this.children = await getItems(this.itemId)
      } catch (err) {
        toast.error(`Children items can't be retrieved`)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
