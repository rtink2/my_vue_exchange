<template>
  <div class="container has-text-centered">
    <div class="column is-4 is-offset-4">
      <h3 class="title has-text-grey">Login</h3>
      <p class="subtitle has-text-grey">Please login to proceed.</p>
      <div class="box">
        <figure class="avatar">
          <img src="https://placehold.it/128x128" />
        </figure>
        <form>
          <div class="field">
            <div class="control">
              <input
                v-model="form.email"
                class="input is-large"
                type="email"
                placeholder="Your Email"
                autocomplete="email"
              />
              <!-- <div class="form-error">
                <span class="help is-danger">Email is required</span>
                <span class="help is-danger">Email address is not valid</span>
              </div> -->
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input
                v-model="form.password"
                class="input is-large"
                type="password"
                placeholder="Your Password"
                autocomplete="current-password"
              />
              <!-- <div class="form-error">
                <span class="help is-danger">Password is required</span>
              </div> -->
            </div>
          </div>
          <button
            @click="handleLogin"
            type="button"
            class="button is-block is-primary is-outlined is-rounded is-small is-fullwidth"
          >
            Log In
          </button>
        </form>
      </div>
      <p>
        <router-link to="/register" class="newUser"
          >New User? go to Register</router-link
        >
        &nbsp;·&nbsp;
      </p>
      <p class="has-text-grey"><a>Sign In With Google</a>&nbsp;</p>
      <p class="has-text-grey">
        <a href="../">Need Help?</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    handleLogin() {
      this.$store
        .dispatch('auth/signIn', this.form)
        .then(_ => this.$router.push('/'))
        .catch(errorMessage =>
          this.$toasted.error(errorMessage, { duration: 3000 })
        );
    }
  }
};
</script>

<style scoped>
.newUser {
  color: rgb(188, 18, 245);
}
.hero.is-success {
  background: #f2f6fa;
}
.hero .nav,
.hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}
</style>
