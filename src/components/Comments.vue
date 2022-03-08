<template lang="pug">
loading(v-if='loading')
section(v-else)
    .mt-4
    comment(
      v-for='comment in comments' :key='comment.id'
        :user="comment.user_name"
        :date="comment.date"
        :content="comment.content"
      )
    add-comment.mt-4(:item-id="this.id")
</template>
<script>
import { getComments } from '@/apis/apis'
import { useToast } from 'vue-toastification'
import Comment from '@/components/Comment.vue'
import AddComment from '@/components/AddComment.vue'
export default {
  components: {
    Comment,
    AddComment,
  },
  props: {
    itemId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      comments: [],
      id: null,
      loading: true,
    }
  },
  watch: {
    itemId: {
      immediate: true,
      handler: function (newData) {
        this.id = newData
        this.loadComments()
      },
    },
  },
  methods: {
    async loadComments() {
      const toast = useToast()
      try {
        this.comments = await getComments(this.id)
      } catch (err) {
        toast.error(`Comments can't be retrieved`)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
