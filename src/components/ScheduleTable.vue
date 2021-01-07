<template>
  <div id="container">
    <div id="table-wrapper">
      <table id="schedule-table">
        <tr>
          <th>Tiết</th>
          <th>Thứ hai</th>
          <th>Thứ ba</th>
          <th>Thứ tư</th>
          <th>Thứ năm</th>
          <th>Thứ sáu</th>
          <th>Thứ bảy</th>
        </tr>
        <tr v-for="(e, i) in classes" :key="i">
          <td class="text-center">{{ i + 1 }}</td>
          <td
            v-for="(e2, i2) in e"
            :key="i2"
            :rowspan="e2.spans"
            :style="{ display: e2.display }"
            :class="{ active: Object.keys(e2).length != 0 ? true : false }"
          >
            <span class="font-bold">{{ e2.MaLop }}</span>
            <span>{{ e2.TenMH }}</span>
            <span class="font-bold">{{ e2.TenGV }}</span>
            <span>{{ e2.PhongHoc ? `P ${e2.PhongHoc}` : "" }}</span>
            <span>{{ e2.NBD ? `BĐ: ${e2.NBD}` : "" }}</span>
            <span>{{ e2.NKT ? `KT: ${e2.NKT}` : "" }}</span>
            <div
              v-if="Object.keys(e2).length != 0 ? true : false"
              @click="unselectClass(e2.MaLop)"
              id="unselect-class"
              title="Bỏ chọn lớp này"
            >
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
          </td>
        </tr>
      </table>
    </div>
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
  </div>
</template>

<script>
export default {
  name: "ScheduleTable",
  data() {
    return {
      classes: [],
      unknownClasses: [],
    };
  },
  watch: {
    getClassesDetail() {
      this.preprocessTKB();
    },
  },
  computed: {
    getClassesDetail() {
      return this.$store.state.selectedClassesDetail;
    },
  },
  methods: {
    unselectClass(maLop) {
      this.$store.dispatch("unselectClass", { MaLop: maLop });
    },
    preprocessTKB() {
      let classes = this.getClassesDetail;

      // Fill class in 2d array
      let arr = [];
      for (let i = 1; i <= 10; i++) {
        // Get class by Tiet == i [1 -> 10]
        let t = classes.filter(
          (val) => val.Tiet.includes(i) || (i == 10 && val.Tiet.includes(0))
        );
        let h = [];
        // Get class by Thu == j [2 -> 7]
        for (let j = 2; j <= 7; j++) {
          let k = t.filter((val) => val.Thu == j);
          if (k.length == 0) h.push({});
          else {
            h.push(k[0]);
            h[h.length - 1].spans = k[0].Tiet.length;
          }
        }
        arr.push(h);
      }

      // Remove duplicated class
      for (let j = 2 - 2; j <= 7 - 2; j++) {
        for (let i = 1 - 1; i <= 10 - 1; i++) {
          if (Object.keys(arr[i][j]).length > 0) {
            let n = arr[i][j].Tiet.length;
            let k = 1;
            for (; k < n; k++) {
              if (arr[i + k]) arr[i + k][j] = { display: "none" };
              else break;
            }
            i += k - 1;
          }
        }
      }
      this.classes = arr;

      // Get unknown subjects
      this.unknownClasses = classes.filter(
        (val) => val.Thu == "*" || val.Tiet == "*"
      );
    },
  },
  mounted() {
    this.preprocessTKB();
  },
};
</script>

<style scoped>
#container {
  @apply container;
}

#table-wrapper {
  @apply overflow-auto border border-gray-500 p-0;
}

#schedule-table {
  @apply w-full;
}

#schedule-table th,
#schedule-table td {
  @apply border border-gray-500 p-2;
  min-width: 7rem;
}

#schedule-table th:first-child,
#schedule-table td:first-child {
  min-width: 4rem;
}

.active {
  @apply pt-6 lg:pt-0 relative bg-gray-700 text-white text-center !important;
}

.active span {
  @apply block;
}

#unknown-classes {
  @apply mt-3;
}

#unknown-classes p {
  @apply font-semibold text-lg;
}

#unknown-classes li {
  @apply border border-gray-400 rounded p-2 my-1 relative pr-3 lg:pr-0;
}

#unselect-class {
  @apply w-6 h-6 absolute top-1 right-1 cursor-pointer;
}

#unselect-unknown-class {
  @apply w-6 h-6 absolute right-2 top-2 cursor-pointer;
}
</style>