<template lang="pug">
b-spinner(v-if="loading" label="Loading...")
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
import { errorToast } from '@/helpers/ui'
import Comment from './Comment'
import AddComment from './AddComment'
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
      try {
        this.comments = await getComments(this.id)
      } catch (err) {
        this.$bvToast.toast(`Comments can't be retrieved`, errorToast)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
