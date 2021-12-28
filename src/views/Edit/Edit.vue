<template lang="pug">
section
    section-title(text="Edit existing item")
    item-form(@submit="onSubmit" :initial-data="form")
</template>

<script>
import router from '@/router'
import { getItem, putItem } from '@/apis/apis'
import { errorToast, okToast } from '@/helpers/ui'
import ItemForm from '@/components/ItemForm'
export default {
  components: {
    ItemForm,
  },
  props: {
    itemId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
        parentId: 0,
        destinationId: 0,
        isContainer: false,
        image: null,
      },
      show: true,
    }
  },
  mounted: function () {
    this.loadItem()
  },
  methods: {
    async loadItem() {
      try {
        const item = await getItem(this.itemId)
        //TODO: I can't do this using the spread operator
        this.form.name = item.name
        this.form.description = item.description
        this.form.parentId = item.parent_id
        this.form.destinationId = item.destination_id
        this.form.isContainer = item.is_container
        this.form.image = item.image
      } catch (err) {
        this.$bvToast.toast(`Item can't be retrieved`, errorToast)
      } finally {
        this.loading = false
      }
    },
    async onSubmit(data) {
      try {
        await putItem(this.itemId, data)
        router.replace('/list', () => {
          this.$root.$bvToast.toast(`Item ${data.name} created`, okToast)
        })
      } catch (err) {
        this.$bvToast.toast(`Item could not be updated`, errorToast)
      }
    },
  },
}
</script>
