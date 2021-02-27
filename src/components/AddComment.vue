<template lang="pug">
section
    b-form(@submit="onSubmit" @reset="onReset"  v-if="show")
        b-form-group(
            id="message-input-group"
            :label="$t('addComment.insertComment')"
            label-for="message"
        )
            b-input-group
                b-form-input(
                    id="content"
                    name="content"
                    v-model="form.content"
                    type="text"
                    :placeholder="$t('addComment.content')"
                )
                b-input-group-append
                    b-button(type="submit" variant="primary" v-t="'addComment.add'")
</template>
<script>
import { postComment } from "@/apis/apis";
import { errorToast, okToast } from "@/helpers/ui";
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
        content: "",
      },
      show: true,
    };
  },
  methods: {
    async onSubmit(evt) {
      try {
        evt.preventDefault();
        await postComment(this.itemId, this.form);
        this.$bvToast.toast(`Comment added`, okToast);
        this.onReset();
      } catch (err) {
        this.$bvToast.toast(`Comment could not be added`, errorToast);
      }
    },
    onReset(evt) {
      if (evt) {
        evt.preventDefault();
      }
      this.form.content = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
