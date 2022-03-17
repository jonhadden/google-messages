<template>
  <section class="password">
    <div>
      <h1><span>Welcome to </span>Infinite Messages</h1>
      <div v-if="isAuthorised">
        <h2>Looks like you're already logged in</h2>
        <p>Either logout or go to the password protected area</p>
        <button @click="removeAuthorisation" class="button">Log out</button>
        <a class="button" href="/">Go to password protected area</a>
      </div>
      <div v-else class="form-container">
        <form>
          <label for="prototypePassword">Prototype Password</label>
          <input 
            name="prototypePassword"
            v-model="methodLoginValue" 
            type="password" 
            placeholder="Prototype Password"
            ref="passwordField"
            class="inverse">

          <div class="actions">
            <button 
              @click="loginUser()" 
              class="button primary inverse">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data: function() {
    return {
      methodLoginValue: '',
      isAuthorised: false
    }
  },

  computed: {
    redirectPath() {
      const path = this.$route.query.previousPath;
      return path || this.localePath('/');
    }
  },

  mounted() {
    this.isAuthorised = this.$passwordProtect.isAuthorised();
  },

  methods: {
    loginUser() {
      this.$passwordProtect.authorise(this.methodLoginValue);
      this.isAuthorised = this.$passwordProtect.isAuthorised();

      this.$router.push(this.redirectPath);
    },
    removeAuthorisation() {
      this.$passwordProtect.removeAuthorisation();
      this.isAuthorised = this.$passwordProtect.isAuthorised();
    }
  }
}
</script>
<style lang="scss">
	.password {
      background: purple;
      color: white;
      background: radial-gradient(circle, rgba(103,58,183,1) 0%, rgba(82,46,146,1) 100%);
      height: 100vh;
      display: flex;
      justify-content: center;
      h1 {
        line-height: 1.25;
        span {
          display: block;
          color: rgba(255,255,255,0.2);
        }
      }
      & > div {
          margin-top: 10%;
      }

      form {
          display: grid;
      }
  }
</style>