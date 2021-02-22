<template lang="pug">
section
    h3(v-if='loading' ) Loading...
    div(v-else)
        item-card-big(:item-id="itemId")
</template>

<script>
import ItemCardBig from "./components/ItemCardBig";
export default {
  components: {
    ItemCardBig,
  },
  props: {
    itemId: {
      type: Number,
      default: 0,
    },
  },
};
</script>
