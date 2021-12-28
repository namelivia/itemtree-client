<template lang="pug">
section
    section-title(:text="$t('list.title')")
    item-list
</template>

<script>
import ItemList from './components/ItemList'
export default {
  components: {
    ItemList: ItemList,
  },
}
</script>
