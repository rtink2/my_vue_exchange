<template>
  <div class="container base-page">
    <div class="form-container">
      <h1>Create Exchange</h1>
      <form>
        <div class="field">
          <label class="label">Type</label>
          <div class="control">
            <div class="select">
              <select v-model="form.type">
                <option value="service">Service</option>
                <option value="product">Product</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input
              @blur="$v.form.title.$touch"
              v-model="form.title"
              class="input"
              type="text"
              placeholder="Title"
            >
            <div
              v-if="$v.form.title.$error"
              class="form-error"
            >
              <span
                v-if="!$v.form.title.required"
                class="help is-danger"
              >Title is required</span>
              <span
                v-if="!$v.form.title.minLength"
                class="help is-danger"
              >Minimum length of title is 10 characters</span>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea
              @blur="$v.form.description.$touch"
              v-model="form.description"
              class="textarea"
              placeholder="Description"
            >
            </textarea>
            <div
              v-if="$v.form.description.$error"
              class="form-error"
            >
              <span
                v-if="!$v.form.description.required"
                class="help is-danger"
              >Description is required</span>
              <span
                v-if="!$v.form.description.minLength"
                class="help is-danger"
              >Description must be 15 characters</span>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Image Link</label>
          <div class="control">
            <input
              @blur="$v.form.image.$touch"
              v-model="form.image"
              class="input"
              type="text"
              placeholder="https://pexels...."
            >
            <div
              v-if="$v.form.image.$error"
              class="form-error"
            >
              <span
                v-if="!$v.form.image.url"
                class="help is-danger"
              >Image url is not valid!</span>
              <span
                v-if="!$v.form.image.supportedFileType"
                class="help is-danger"
              >Provided image extension is not supported</span>
              <span
                v-if="!$v.form.image.required"
                class="help is-danger"
              >Image is required</span>
            </div>
          </div>
        </div>
        <!-- TODO: Rename To Price -->
        <div class="field">
          <label class="label">Price</label>
          <div class="control">
            <input
              @blur="$v.form.price.$touch"
              v-model="form.price"
              class="input"
              type="number"
              placeholder="999"
            >
            <div
              v-if="$v.form.price.$error"
              class="form-error"
            >
              <span
                v-if="!$v.form.price.required"
                class="help is-danger"
              >Price is required</span>
              <span
                v-if="!$v.form.price.minValue"
                class="help is-danger"
              >Minum price is $10</span>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">City</label>
          <div class="control">
            <input
              @blur="$v.form.city.$touch"
              v-model="form.city"
              class="input"
              type="text"
              placeholder="New Orleans"
            >
            <div
              v-if="$v.form.city.$error"
              class="form-error"
            >
              <span
                v-if="!$v.form.city.required"
                class="help is-danger"
              >City is required</span>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">State</label>
          <div class="control">
            <input
              @blur="$v.form.state.$touch"
              v-model="form.state"
              class="input"
              type="text"
              placeholder="LA"
            >
            <div
              v-if="$v.form.state.$error"
              class="form-error"
            >
              <span
                v-if="!$v.form.state.required"
                class="help is-danger"
              >State is required</span>
            </div>
          </div>
        </div>

        <!-- TAGS -->
        <div class="field">
          <label class="label">Tags</label>
          <div class="control">
            <input
              @input="handleTags"
              class="input"
              type="text"
              placeholder="sale, vehicles, carpentry, mechanic,"
            >
            <div
              v-for="tag in form.tags"
              :key="`t-${tag}`"
              class="tag is-primary is-medium"
            >
              {{ tag }}
            </div>
          </div>
        </div>

        <!-- BUTTONS -->
        <div class="field is-grouped">
          <div class="control">
            <button
              @click.prevent="createExchange"
              class="button is-block is-primary is-outlined is-rounded is-medium is-fullwidth"
            >Submit</button>
          </div>
          <div class="control">
            <button class="button is-text">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, url, minValue } from "vuelidate/lib/validators";
import { supportedFileType } from "@/helpers/validators";

export default {
  data() {
    return {
      form: {
        title: "",
        description: "",
        type: "product",
        image: "",
        price: null,
        city: "",
        state: "",
        tags: []
      }
    };
  },
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(5)
      },
      description: {
        required,
        minLength: minLength(15)
      },
      image: {
        required,
        url
      },
      price: {
        required,
        minValue: minValue(10)
      },
      city: {
        required
      },
      state: {
        required
      }
    }
  },
  computed: {
    isFormValid() {
      return !this.$v.form.$invalid;
    }
  },
  methods: {
    createExchange() {
      this.$v.form.$touch();

      if (this.isFormValid) {
        this.$store
          .dispatch("exchange/createExchange", { ...this.form })
          .then(_ => this.$router.push({ name: "ProfilePage" }))
          .catch(e => console.error(e.message));
      }
    },
    handleTags(e) {
      const { value } = e.target;

      if (
        value &&
        value.trim().length > 1 &&
        (value.substr(-1) === "," || value.substr(-1) === " ")
      ) {
        this.form.tags.push(value.split(",")[0]);
        e.target.value = "";
      }
    }
  }
};
</script>

<style>
.form-container {
  max-width: 960px;
  margin: 0 auto;
}

.tag {
  margin: 3px;
}
</style>
