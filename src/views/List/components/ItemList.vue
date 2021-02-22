<template lang="pug">
section
    h3(v-if='loading' ) Loading...
    b-card-group(v-else columns)
        item-card(
            v-for='item in items' :key='item.id'
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
import ItemCard from "./ItemCard";
import { getItems } from "@/apis/apis";
import { errorToast } from "@/helpers/ui";
export default {
  components: {
    itemCard: ItemCard,
  },
  data: function () {
    return {
      items: [],
      loading: true,
    };
  },
  mounted: function () {
    this.loadList();
  },
  methods: {
    async loadList() {
      try {
        this.items = await getItems();
      } catch (err) {
        this.$bvToast.toast(`Items can't be retrieved`, errorToast);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
