<template lang="pug">
section
    h3(v-if='loading' ) Loading...
    div(v-else)
        item-card-big(:item-id="itemId")
        .mt-4
        comments(:item-id="itemId")
        .mt-4
        b-card-group(columns)
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
import ItemCard from '@/components/ItemCard'
import ItemCardBig from './components/ItemCardBig'
import Comments from '@/components/Comments'
import { getItems } from '@/apis/apis'
import { errorToast } from '@/helpers/ui'
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
      try {
        this.children = await getItems(this.itemId)
      } catch (err) {
        this.$bvToast.toast(`Children items can't be retrieved`, errorToast)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
