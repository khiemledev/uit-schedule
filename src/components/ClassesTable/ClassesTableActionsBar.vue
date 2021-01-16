<template>
  <div id="actions-bar">
    <div id="search-form">
      <input
        @keyup.enter="search"
        type="search"
        name="search"
        ref="searchInput"
        placeholder="Tên môn, tên GV, thứ, tiết..."
      />
      <button class="btn" @click="search">Tìm kiếm</button>
    </div>
    <button id="btn-toggle-filter" class="btn" @click="toggleShowFilter">
      {{ showFilter ? "Ẩn" : "Hiện" }} bộ lọc
    </button>
  </div>
</template>

<script>
export default {
  name: "ClassesTableActionsBar",
  props: {
    showFilter: Boolean,
  },
  emits: ["search", "toggleShowFilter"],
  methods: {
    toggleShowFilter() {
      this.$emit("toggleShowFilter");
    },
    search() {
      let qr = this.$refs.searchInput.value.trim().toLowerCase();
      this.$emit("search", qr);
    },
  },
};
</script>

<style scoped src="@/styles/ClassesTable/ClassesTableActionsBar.css"></style>