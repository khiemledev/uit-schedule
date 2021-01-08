<template>
  <div id="summary">
    <div id="summary-head">Tổng quan về các lựa chọn của bạn</div>
    <div id="soTC">Tổng số TC: {{ getSoTC }}</div>
    <div id="lists">
      <div class="list" v-if="getTenMH.length > 0">
        Các môn học đã chọn
        <ul>
          <li v-for="mh in getTenMH" :key="mh">
            {{ mh }}
          </li>
        </ul>
      </div>
      <div class="list" v-if="getTenGV.length > 0">
        Các giảng viên
        <ul>
          <li v-for="gv in getTenGV" :key="gv">
            {{ gv }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Summary",
  computed: {
    getSoTC() {
      return this.$store.getters.soTC;
    },
    getTenGV() {
      return this.$store.getters.tenGV;
    },
    getTenMH() {
      return this.$store.getters.tenMH;
    },
  },
};
</script>

<style scoped>
#summary {
  @apply border border-gray-500 rounded-md p-3 space-y-4;
}

#summary-head {
  @apply text-2xl font-semibold;
}

#soTC {
  @apply text-xl font-semibold;
}

#lists {
  @apply md:flex;
}

.list {
  @apply md:flex-1 text-xl font-semibold;
}

.list ul {
  @apply text-base list-disc list-inside;
}
</style>