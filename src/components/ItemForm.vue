<template lang="pug">
    b-form(@submit="onSubmit" @reset="onReset"  v-if="show")
        b-form-group(
            id="name-input-group"
            :label="$t('itemForm.name')"
            label-for="name"
        )
            b-form-input(
                id="name"
                name="name"
                v-model="item.name"
                type="text"
                required
                :placeholder="$t('itemForm.enterItemName')"
            )
        b-form-group(
            id="description-input-group"
            :label="$t('itemForm.descriptiom')"
            label-for="description"
        )
            b-form-input(
                id="description"
                name="description"
                v-model="item.description"
                type="text"
                required
                :placeholder="$t('itemForm.enterItemDescription')"
            )
        b-form-group(
            id="parent-id-input-group"
            :label="$t('itemForm.parentId')"
            label-for="parent-id"
        )
            b-form-input(
                id="parent-id"
                name="parent-id"
                v-model="item.parent_id"
                type="number"
                required
                :placeholder="$t('itemForm.enterParentId')"
            )
        b-form-group(
            id="destination-id-input-group"
            :label="$t('itemForm.destinationId')"
            label-for="destination-id"
        )
            b-form-input(
                id="destination-id"
                name="destination-id"
                v-model="item.destination_id"
                type="number"
                required
                :placeholder="$t('itemForm.enterParentId')"
            )
        b-form-checkbox(
            id="is-container"
            name="is-container"
            v-model="item.is_container"
            type="number"
            value="true"
            unchecked-value="false"
            :placeholder="$t('itemForm.enterIsContainer')"
        )
            | {{$t('newItem.isContainer')}}
        resize-image-upload(@loaded="onImageLoaded")
        .mt-4
        b-button.mr-2(type="submit" variant="primary") {{$t('newItem.submit')}}
        b-button(type="reset" variant="danger") {{$t('newItem.reset')}}
</template>
<script>
import ResizeImageUpload from "@/components/ResizeImageUpload";
import { postImage } from "@/apis/apis";
import { errorToast } from "@/helpers/ui";
export default {
  components: {
    ResizeImageUpload,
  },
  props: {
    initialData: {
      type: Object,
      default: () => {
        return {
          name: "",
          description: null,
          image: null,
        };
      },
    },
  },
  data() {
    return {
      show: true,
      item: {
        name: "",
        description: null,
        image: null,
      },
    };
  },
  watch: {
    initialData: {
      immediate: true,
      handler: function (newData) {
        this.item = newData;
      },
    },
  },
  methods: {
    onImageLoaded(newImage) {
      this.item.image = newImage;
    },
    async uploadImage() {
      //After creating if the item upload image if has it
      if (this.item.image) {
        try {
          this.item.image = await postImage(this.item.image);
        } catch (err) {
          this.$bvToast.toast(`Image could not be loaded`, errorToast);
        }
      }
    },
    async onSubmit(evt) {
      if (evt) {
        evt.preventDefault();
      }
      await this.uploadImage();
      this.$emit("submit", this.item);
    },
    onReset(evt) {
      if (evt) {
        evt.preventDefault();
      }
      this.item.name = "";
      this.item.description = null;
      this.item.image = null;
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
