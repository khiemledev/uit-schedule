<template>
  <div id="unknown-classes" v-if="unknownClasses.length > 0">
    <p>Danh sách các lớp chưa sắp xếp lịch dự kiến:</p>
    <ul>
      <li v-for="e in unknownClasses" :key="e.MaLop">
        <span class="font-bold">{{ e.MaLop }}</span> -
        <span>{{ e.TenMH }}</span> -
        <span class="font-bold">{{ e.TenGV }}</span>
        <div id="unselect-unknown-class" @click="unselectClass(e.MaLop)">
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
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ScheduleTableUnknownClasses",
  props: ["unknownClasses"],
  methods: {
    unselectClass(maLop) {
      this.$store.commit("removeClass", maLop);
    },
  },
};
</script>

<style scoped src="@/styles/ScheduleTable/ScheduleTableUnknownClasses.css"></style>