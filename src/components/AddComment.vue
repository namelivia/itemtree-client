<template lang="pug">
section
    form(@submit="onSubmit" @reset="onReset"  v-if="show")
        text-input(
          :name="content"
          :label="$t('addComment.insertComment')"
          :placeholder="$t('addComment.content')"
          @update="form.content = $event"
          required
        )
        submit-button(:text="$t('addComment.add')")
</template>
<script>
import { postComment } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  props: {
    itemId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      form: {
        content: '',
      },
      show: true,
    }
  },
  methods: {
    async onSubmit(evt) {
      const toast = useToast()
      try {
        evt.preventDefault()
        await postComment(this.itemId, this.form)
        toast.success(`Comment added`)
        this.onReset()
      } catch (err) {
        toast.error(`Comment could not be added`)
      }
    },
    onReset(evt) {
      if (evt) {
        evt.preventDefault()
      }
      this.form.content = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
