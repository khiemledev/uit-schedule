<template>
  <div id="selected-classes-code">
    <textarea
      id="classes-code"
      rows="10"
      :value="selectedClassesStr"
      @change="handleChange"
      ref="classesInput"
    ></textarea>
    <p v-if="conflictMsg != ''" class="error-msg">{{ conflictMsg }}</p>
    <p v-if="nonExistMsg != ''" class="error-msg">{{ nonExistMsg }}</p>
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
      conflictMsg: "",
      nonExistMsg: "",
      selectedClasses: [],
      dialog: {
        title: "Alert",
        body: "",
        show: false,
      },
    };
  },
  methods: {
    handleChange() {
      this.conflictMsg = "";
      this.nonExistMsg = "";
      let classes = this.$refs.classesInput.value
        .trim()
        .split("\n")
        .map((e) => e.trim())
        .filter((e) => e != "");
      this.submitChange(classes);
    },
    submitChange(classes) {
      this.$store.dispatch("addClasses", classes).then((res) => {
        if (res) {
          const { conflictedClasses, nonExistClasses } = res;
          if (conflictedClasses && conflictedClasses.length > 0) {
            this.conflictMsg = `Mã lớp ${conflictedClasses.join(
              ", "
            )} bị trùng`;
          }
          if (nonExistClasses && nonExistClasses.length > 0) {
            this.nonExistMsg = `Mã lớp ${nonExistClasses.join(
              ", "
            )} không tồn tại`;
          }
        }
      });
    },
  },
  mounted() {
    this.selectedClasses = this.getSelectedClasses;
  },
};
</script>

<style scoped src="../styles/SelectedClassesCode.css"></style>