<template>
  <header class="header">
    <nav class="navbar" :class="$route.path === '/' ? '' : 'with-background'">
      <div class="container">
        <div class="navbar-brand">
          <a
            class="navbar-item has-text-white is-size-2 has-text-weight-bold"
            href="#"
          >
            {{ brandName }}
          </a>
          <span
            role="button"
            tabindex="0"
            class="navbar-burger burger has-text-white"
            data-target="navbar-menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbar-menu" class="navbar-menu">
          <div class="navbar-end">
            <div v-if="isAuthenticated" class="navbar-item nav-home">
              {{ user.email }}
            </div>
            <router-link
              v-for="item in items"
              v-bind:key="item.text"
              :to="item.link"
              class="navbar-item nav-home"
            >
              {{ item.text }}
            </router-link>
            <template v-if="!isAuthenticated">
              <router-link to="/login" class="navbar-item nav-home">
                Login
              </router-link>
              <router-link to="/register" class="navbar-item nav-home">
                Register
              </router-link>
            </template>
            <template v-else>
              <router-link to="/users/me" class="navbar-item nav-home">
                Profile
              </router-link>
              <router-link to="/logout" class="navbar-item nav-home">
                Logout
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  // props: ['brandName', 'items'],
  props: {
    brandName: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  .navbar-item {
    .navbar-link {
      color: white;
    }

    @media only screen and (max-width: 1023px) {
      .navbar-link {
        color: black;
      }
    }
  }

  @media screen and (min-width: 1024px) {
    .navbar-item.has-dropdown:hover .navbar-link {
      color: black;

      &:not(.is-arrowless)::after {
        border-color: black;
      }
    }
  }

  .navbar-dropdown {
    .navbar-item {
      color: black;
    }
  }

  .navbar-link:not(.is-arrowless)::after {
    border-color: white;
  }
}
</style>
