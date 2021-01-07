<template>
  <div id="selected-classes-code">
    <textarea
      id="classes-code"
      rows="10"
      :value="selectedClassesStr"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "SelectedClassesCode",
  computed: {
    selectedClassesStr() {
      return this.selectedClasses.join("\n");
    },
    getSelectedClasses() {
      return this.$store.state.selectedClasses;
    },
  },
  watch: {
    getSelectedClasses(newVal) {
      this.selectedClasses = newVal;
    },
  },
  data() {
    return {
      selectedClasses: [],
    };
  },
  mounted() {
    this.selectedClasses = this.getSelectedClasses;
  },
};
</script>

<style scoped>
#selected-classes-code {
  @apply w-full;
}

#classes-code {
  @apply border border-gray-500 p-2 w-full;
}
</style>