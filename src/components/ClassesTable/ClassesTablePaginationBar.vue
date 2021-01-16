<template>
  <div class="pagination-bar">
    <div class="pag-btn" @click="prevPage">
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
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </div>
    <div class="page-number">{{ page }}</div>
    <div class="pag-btn" @click="nextPage">
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
          d="M9 5l7 7-7 7"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClassesTablePaginationBar",
  props: ["page"],
  methods: {
    nextPage() {
      this.$emit("nextPage");
    },
    prevPage() {
      this.$emit("prevPage");
    },
  },
};
</script>

<style scoped src="@/styles/ClassesTable/ClassesTablePaginationBar.css"></style>