<template lang="pug">
    b-card.mb-2
        b-card-text
            p.mb-0 
             b {{user}}:
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
  },
};
</script>
