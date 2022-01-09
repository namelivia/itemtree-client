<template lang="pug">
section
    section-title(:text="$t('list.title')")
    item-list
</template>

<script>
import ItemList from '@/views/List/components/ItemList.vue'
export default {
  components: {
    ItemList: ItemList,
  },
}
</script>
