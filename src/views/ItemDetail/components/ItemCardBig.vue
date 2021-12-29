<template lang="pug">
loading(v-if='loading')
section(v-else)
    img.mb-4.img-fluid(:src="imageUrl")
    p.mb-0 Id: {{ item.id}}
    p.mb-0 {{$t("itemDetails.name")}}: {{ item.name }}
    p.mb-0 {{$t("itemDetails.description")}}: {{ item.description }}
    p.mb-0 {{$t("itemDetails.parentId")}}: {{ item.parent_id }}
    p.mb-0 {{$t("itemDetails.destinationId")}}: {{ item.destination_id }}
    p.mb-0 {{$t("itemDetails.isContainer")}}: {{ item.is_container }}
    danger-button(@click="onDelete" :text="$t('itemDetails.deleteIt')")
    router-link(:to="{ name: 'edit', params: { itemId: this.item.id}}")
        secondary-button.ml-2(:text="$t('itemCard.editIt')")
</template>

<script>
import { getItem, deleteItem } from '@/apis/apis'
import { getImageUrl } from '@/apis/helpers'
//import { errorToast, okToast } from '@/helpers/ui'
import router from '@/router'
export default {
  props: {
    itemId: {
      type: Number,
      default: 0,
    },
  },
  data: function () {
    return {
      item: null,
      loading: true,
    }
  },
  computed: {
    imageUrl: function () {
      if (this.item.image) {
        return getImageUrl(this.item.image)
      }
      return null
    },
  },
  watch: {
    itemId: {
      immediate: true,
      handler: function (newData) {
        this.loadItem(newData)
      },
    },
  },
  methods: {
    async loadItem(itemId) {
      try {
        this.item = await getItem(itemId)
      } catch (err) {
        //this.$bvToast.toast(`Item can't be retrieved`, errorToast)
      } finally {
        this.loading = false
      }
    },
    async onDelete(evt) {
      evt.preventDefault()
      try {
        deleteItem(this.item.id)
        router.replace('/list', () => {
          //this.$root.$bvToast.toast(`Item removed`, okToast)
        })
      } catch (err) {
        //this.$bvToast.toast(`Item could not be removed`, errorToast)
      }
    },
  },
}
</script>
