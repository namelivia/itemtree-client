<template lang="pug">
section
    h1(v-t="'list.title'")
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
