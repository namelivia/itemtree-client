<template lang="pug">
section
    h1 Add new item
    item-form(@submit="onSubmit")
</template>

<script>
import router from "@/router";
import ItemForm from "@/components/ItemForm";
import { postItem } from "@/apis/apis";
import { errorToast, okToast } from "@/helpers/ui";
export default {
  components: {
    ItemForm,
  },
  methods: {
    async onSubmit(data) {
      try {
        postItem(data);
        router.replace("/list", () => {
          this.$root.$bvToast.toast(`Item ${data.name} created`, okToast);
        });
      } catch (err) {
        this.$bvToast.toast(`Item could not be created`, errorToast);
      }
    },
  },
};
</script>
