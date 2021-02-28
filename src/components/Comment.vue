<template lang="pug">
    b-card.mb-2
        b-card-text
            p.mb-0 
             b {{user}} - {{ formattedDate }}:
            p.mb-0 {{content}}
</template>
<script>
export default {
  props: {
    content: {
      type: String,
      default: "",
    },
    user: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      default: "",
    },
  },
  computed: {
    formattedDate: function () {
      return new Date(this.date).toLocaleString();
    },
  },
};
</script>
