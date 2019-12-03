<template>
  <div class="container has-text-centered">
    <div class="column is-4 is-offset-4">
      <h3 class="title has-text-grey">Register</h3>
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
                v-model="form.fullName"
                class="input is-large"
                type="text"
                placeholder="Full Name"
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
                v-model="form.avatar"
                class="input is-large"
                type="text"
                placeholder="Avatar Url"
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
          <div class="field">
            <div class="control">
              <input
                v-model="form.passwordConfirmation"
                class="input is-large"
                type="password"
                placeholder="Confirm Password"
              />
              <!-- <div class="form-error">
                <span class="help is-danger">Password is required</span>
              </div> -->
            </div>
          </div>
          <button
            @click="handleRegister"
            type="button"
            class="button is-block is-primary is-outlined is-rounded is-small is-fullwidth"
          >
            Sign Up
          </button>
        </form>
      </div>
      <p>
        <router-link to="/login" class="login"
          >Returning User? go to Login</router-link
        >&nbsp;·&nbsp;
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
        fullName: '',
        avatar: '',
        password: '',
        passwordConfirmation: ''
      }
    };
  },
  methods: {
    handleRegister() {
      this.$store
        .dispatch('auth/signUp', this.form)
        .then(async user => {
          await this.$store.dispatch('auth/createUserProfile', 
            {uid: user.uid, 
            userProfile: {
              fullName: this.form.fullName,
              avatar: this.form.avatar,
              user: user.uid
            }})
          this.$router.push('/');
        })
        .catch(errorMessage => {
          this.$toasted.error(errorMessage, { duration: 3000 });
        });
    }
  }
};
</script>

<style scoped>
.login {
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
