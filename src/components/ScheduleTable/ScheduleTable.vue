<template>
  <div id="container">
    <div id="btn-save-as-image">
      <button @click="saveImage">Lưu hình ảnh</button>
    </div>
    <div id="table-wrapper" :class="{ 'overflow-auto': !exporting }">
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
    <ScheduleTableUnKnownClasses :unknownClasses="unknownClasses" />
  </div>
</template>

<script>
import domtoimage from "dom-to-image";
import ScheduleTableUnKnownClasses from "@/components/ScheduleTable/ScheduleTableUnknownClasses";

export default {
  name: "ScheduleTable",
  components: { ScheduleTableUnKnownClasses },
  data() {
    return {
      classes: [],
      unknownClasses: [],
      exporting: false,
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
    saveImage() {
      this.exporting = true;
      domtoimage
        .toJpeg(document.getElementById("schedule-table"))
        .then((dataUrl) => {
          var link = document.createElement("a");
          link.download = "my-image-name.jpeg";
          link.href = dataUrl;
          link.click();
          this.exporting = false;
        })
        .catch((e) => {
          console.log(e);
          this.exporting = false;
        });
    },
    unselectClass(maLop) {
      this.$store.commit("removeClass", maLop);
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

<style scoped src="@/styles/ScheduleTable/ScheduleTable.css"></style>