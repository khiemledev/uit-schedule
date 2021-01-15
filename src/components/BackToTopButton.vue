<template>
  <transition name="bounce">
    <div id="btn-back-to-top" v-show="show" @click="goToTop">
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 11l7-7 7 7M5 19l7-7 7 7"
        ></path>
      </svg>
    </div>
  </transition>
</template>

<script>
export default {
  name: "BackToTopButton",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    goToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  mounted() {
    window.onscroll = () => {
      if (
        document.body.scrollTop > 350 ||
        document.documentElement.scrollTop > 350
      ) {
        if (!this.show) this.show = true;
      } else {
        if (this.show) this.show = false;
      }
    };
  },
};
</script>

<style scoped src="../styles/BackToTopButton.css"></style>