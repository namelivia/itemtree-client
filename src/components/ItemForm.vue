<template lang="pug">
form(@submit="onSubmit" @reset="onReset"  v-if="show")
    text-input(
      :name="name"
      :text="item.name"
      :label="$t('itemForm.name')"
      :placeholder="$t('itemForm.enterItemName')"
      @update="item.name = $event"
      required
    )
    text-input(
      :name="description"
      :text="item.description"
      :label="$t('itemForm.description')"
      :placeholder="$t('itemForm.enterItemDescription')"
      @update="item.description = $event"
      required
    )
    number-input(
      :name="parent-id"
      :label="$t('itemForm.parentId')"
      :placeholder="$t('itemForm.enterParentId')"
      :amount="item.parent_id"
      @update="item.parent_id = $event"
    )
    number-input(
      :name="destination-id"
      :label="$t('itemForm.destinationId')"
      :amount="item.destination_id"
      :placeholder="$t('itemForm.enterDestinationId')"
      @update="item.destination_id = $event"
    )
    checkbox-input(
      :name="is-container"
      :label="$t('itemForm.isContainer')"
      :checked="item.is_container"
      @update="item.is_container = $event"
    )
    resize-image-upload(@loaded="onImageLoaded")
    .mt-4
    submit-button.mr-2(:text="$t('itemForm.submit')")
    reset-button(:text="$t('itemForm.reset')")
</template>
<script>
import { postImage } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  props: {
    initialData: {
      type: Object,
      default: () => {
        return {
          name: null,
          description: null,
          parent_id: null,
          destination_id: null,
          is_container: false,
          image: null,
        }
      },
    },
  },
  data() {
    return {
      show: true,
      item: {
        name: null,
        description: null,
        parent_id: null,
        destination_id: null,
        is_container: false,
        image: null,
      },
    }
  },
  watch: {
    initialData: {
      immediate: true,
      handler: function (newData) {
        this.item = newData
      },
    },
  },
  methods: {
    onImageLoaded(newImage) {
      this.item.image = newImage
    },
    async uploadImage() {
      const toast = useToast()
      //After creating if the item upload image if has it
      if (this.item.image) {
        try {
          this.item.image = await postImage(this.item.image)
        } catch (err) {
          toast.error(`Image could not be loaded`)
        }
      }
    },
    async onSubmit(evt) {
      if (evt) {
        evt.preventDefault()
      }
      await this.uploadImage()
      this.$emit('submit', this.item)
    },
    onReset(evt) {
      if (evt) {
        evt.preventDefault()
      }
      this.item.name = null
      this.item.description = null
      this.item.parent_id = null
      this.item.destination_id = null
      this.item.is_container = false
      this.item.image = null
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
