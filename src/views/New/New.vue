<template lang="pug">
section
    section-title(text="Add new item")
    item-form(@submit="onSubmit")
</template>

<script>
import router from '@/router'
import ItemForm from '@/components/ItemForm.vue'
import { postItem } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  components: {
    ItemForm,
  },
  methods: {
    async onSubmit(data) {
      const toast = useToast()
      try {
        await postItem(data)
        router.replace('/list', () => {
          toast.success(`Item ${data.name} created`)
        })
      } catch (err) {
        toast.error(`Item could not be created`)
      }
    },
  },
}
</script>
