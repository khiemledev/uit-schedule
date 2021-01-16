<template>
  <transition name="bounce">
    <div id="filter" v-if="showFilter">
      <div id="filters">
        <span v-for="e in mapper" :key="e.field" class="cb-group">
          <input
            type="checkbox"
            :name="`cb-${e.field}`"
            :value="e.field"
            v-model="displayFields"
          />
          <label :for="`cb-${e.field}`">{{ e.name }}</label>
        </span>
      </div>
      <button id="btn-reset-filter" class="btn" @click="resetFilter">
        Đặt lại bộ lọc
      </button>
    </div>
  </transition>
</template>

<script>
import mapper from "@/assets/json_mapper.json";

export default {
  name: "ClassesTableFilters",
  props: {
    showFilter: Boolean,
  },
  data() {
    return {
      mapper: mapper,
      displayFields: this.$store.state.displayFields,
    };
  },
  watch: {
    displayFields(newVal) {
      this.$store.state.displayFields = newVal;
    },
  },
  methods: {
    toggleFilter() {
      this.$emit("toggleShowFilter");
    },
    resetFilter() {
      this.$store.commit("resetFilter");
      this.displayFields = this.$store.state.displayFields;
    },
  },
};
</script>

<style scoped src="@/styles/ClassesTable/ClassesTableFilters.css"></style>