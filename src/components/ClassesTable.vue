<template>
  <div id="classes-table">
    <PopupDialog @close="closeDialog" v-show="dialog.show">
      <template #body>{{ dialog.body }}</template>
    </PopupDialog>
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
      <button
        id="btn-toggle-filter"
        class="btn"
        @click="showFilter = !showFilter"
      >
        {{ showFilter ? "Ẩn" : "Hiện" }} bộ lọc
      </button>
    </div>
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
    <button id="btn-unselect-classes" @click="unselectClasses" class="btn">
      Bỏ chọn ({{ selectedClasses.length }} đã chọn)
    </button>
    <div id="table-wrapper">
      <table id="table">
        <tr>
          <th></th>
          <th
            v-for="e in mapper"
            :key="e.field"
            v-show="displayFields.includes(e.field)"
          >
            {{ e.name }}
          </th>
        </tr>
        <tr v-for="(e, i) in classes" :key="i">
          <td>
            <input type="checkbox" :value="e.MaLop" v-model="selectedClasses" />
          </td>
          <!-- <td
            v-for="e2 in mapper"
            v-if="displayFields.includes(e2.field)"
            :key="e2.field"
            :class="{ 'text-center': e2.center }"
          >
            {{ e[e2.field] }}
          </td> -->
          <td v-if="displayFields.includes('STT')" class="text-center">
            {{ e.STT }}
          </td>
          <td v-if="displayFields.includes('MaMH')">{{ e.MaMH }}</td>
          <td v-if="displayFields.includes('MaLop')">{{ e.MaLop }}</td>
          <td v-if="displayFields.includes('TenMH')">{{ e.TenMH }}</td>
          <td v-if="displayFields.includes('MaGV')">{{ e.MaGV }}</td>
          <td v-if="displayFields.includes('TenGV')">{{ e.TenGV }}</td>
          <td v-if="displayFields.includes('SiSo')" class="text-center">
            {{ e.SiSo }}
          </td>
          <td v-if="displayFields.includes('SoTC')" class="text-center">
            {{ e.SoTC }}
          </td>
          <td v-if="displayFields.includes('TH')" class="text-center">
            {{ e.TH }}
          </td>
          <td v-if="displayFields.includes('HTGD')" class="text-center">
            {{ e.HTGD }}
          </td>
          <td v-if="displayFields.includes('Thu')" class="text-center">
            {{ e.Thu }}
          </td>
          <td v-if="displayFields.includes('Tiet')" class="text-center">
            {{ e.Tiet }}
          </td>
          <td v-if="displayFields.includes('CachTuan')" class="text-center">
            {{ e.CachTuan }}
          </td>
          <td v-if="displayFields.includes('PhongHoc')" class="text-center">
            {{ e.PhongHoc }}
          </td>
          <td v-if="displayFields.includes('KhoaHoc')" class="text-center">
            {{ e.KhoaHoc }}
          </td>
          <td v-if="displayFields.includes('HocKy')" class="text-center">
            {{ e.HocKy }}
          </td>
          <td v-if="displayFields.includes('NamHoc')" class="text-center">
            {{ e.NamHoc }}
          </td>
          <td v-if="displayFields.includes('HeDT')" class="text-center">
            {{ e.HeDT }}
          </td>
          <td v-if="displayFields.includes('KhoaQL')" class="text-center">
            {{ e.KhoaQL }}
          </td>
          <td v-if="displayFields.includes('NBD')" class="text-center">
            {{ e.NBD }}
          </td>
          <td v-if="displayFields.includes('NKT')" class="text-center">
            {{ e.NKT }}
          </td>
          <td v-if="displayFields.includes('GhiChu')" class="text-center">
            {{ e.GhiChu }}
          </td>
          <td v-if="displayFields.includes('Lang')" class="text-center">
            {{ e.Lang }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import mapper from "../assets/json_mapper.json";
import PopupDialog from "../components/PopupDialog";

const initFields = [
  "MaMH",
  "MaLop",
  "TenMH",
  "TenGV",
  "SoTC",
  "Thu",
  "Tiet",
  "PhongHoc",
  "KhoaQL",
];

export default {
  name: "ClassesTable",
  components: { PopupDialog },
  data() {
    return {
      displayFields: initFields,
      mapper: mapper,
      showFilter: false,
      classes: [],
      selectedClasses: [],
      dialog: {
        show: false,
        title: "Alert",
        body: "",
      },
    };
  },
  computed: {
    getClasses() {
      return this.$store.state.classes;
    },
    getSelectedClasses() {
      return this.$store.state.selectedClasses;
    },
  },
  watch: {
    getSelectedClasses(newVal) {
      this.selectedClasses = newVal;
    },
    selectedClasses(newVal) {
      // this.$store.dispatch("selectClasses", newVal).then((res) => {
      //   if (res) {
      //     const { conflictedClasses } = res;
      //     var classes = conflictedClasses.map((c) => c.MaLop).join(", ");
      //     this.openDialog(`Mã lớp ${classes} bị trùng!`);
      //     this.selectedClasses.splice(this.selectedClasses.length - 1, 1);
      //   }
      // });
      let newClass = newVal.find((c) => !this.getSelectedClasses.includes(c));
      let removedClass = this.getSelectedClasses.find(
        (c) => !newVal.includes(c)
      );
      if (newClass) {
        this.$store.dispatch("addClass", newClass).then((res) => {
          if (res) {
            const { classWasConflicted } = res;
            if (classWasConflicted) {
              this.openDialog(`Mã lớp ${classWasConflicted} bị trùng`);
              this.selectedClasses = this.getSelectedClasses;
            }
          }
        });
      } else if (removedClass) {
        this.$store.commit("removeClass", removedClass);
      }
    },
  },
  methods: {
    closeDialog() {
      this.dialog.show = false;
    },
    openDialog(body) {
      this.dialog.show = true;
      this.dialog.body = body;
    },
    unselectClasses() {
      this.$store.commit("clearClasses");
    },
    resetFilter() {
      this.displayFields = initFields;
    },
    safeToStr(x) {
      switch (typeof x) {
        case "object":
          return "object";
        case "function":
          return "function";
        default:
          return (x + "").toLowerCase();
      }
    },
    search() {
      let qr = this.$refs.searchInput.value.trim().toLowerCase();
      if (qr == "") {
        this.classes = this.$store.state.classes;
        return;
      }
      // Search for every field that includes the query
      this.classes = this.$store.state.classes.filter(
        (c) =>
          this.safeToStr(c.STT).includes(qr) ||
          this.safeToStr(c.MaMH).includes(qr) ||
          this.safeToStr(c.TenMH).includes(qr) ||
          this.safeToStr(c.MaGV).includes(qr) ||
          this.safeToStr(c.TenGV).includes(qr) ||
          this.safeToStr(c.SiSo).includes(qr) ||
          this.safeToStr(c.SoTC).includes(qr) ||
          this.safeToStr(c.TH).includes(qr) ||
          this.safeToStr(c.HTGD).includes(qr) ||
          this.safeToStr(c.Thu).includes(qr) ||
          this.safeToStr(c.Tiet).includes(qr) ||
          this.safeToStr(c.CachTuan).includes(qr) ||
          this.safeToStr(c.PhongHoc).includes(qr) ||
          this.safeToStr(c.KhoaHoc).includes(qr) ||
          this.safeToStr(c.HocKy).includes(qr) ||
          this.safeToStr(c.NamHoc).includes(qr) ||
          this.safeToStr(c.HeDT).includes(qr) ||
          this.safeToStr(c.KhoaQL).includes(qr) ||
          this.safeToStr(c.NBD).includes(qr) ||
          this.safeToStr(c.NKT).includes(qr) ||
          this.safeToStr(c.GhiChu).includes(qr) ||
          this.safeToStr(c.Lang).includes(qr)
      );
    },
  },
  mounted() {
    this.classes = this.getClasses;
    this.selectedClasses = this.getSelectedClasses;
  },
};
</script>

<style scoped>
#classes-table {
  @apply container;
}

#actions-bar {
  @apply flex flex-col sm:flex-row sm:justify-between items-center mb-2;
}

#search-form {
  @apply w-full sm:w-auto my-1;
}

#search-form input {
  @apply w-full sm:w-auto h-full border border-gray-500 rounded p-2 mb-1;
}

#search-form button {
  @apply w-full sm:w-auto h-full sm:ml-2;
}

.btn {
  @apply transition-colors duration-300 ease-in-out bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded;
}

#filter {
  @apply border border-gray-500 rounded p-3 mb-3 text-right;
}

#btn-toggle-filter {
  @apply w-full sm:w-auto h-full;
}

#filters {
  @apply flex flex-wrap mb-2;
}

#filters .cb-group {
  @apply flex items-center mr-4;
}

#filters .cb-group input {
  @apply w-5 h-5 mr-1;
}

#filters .cb-group label {
  @apply font-semibold;
}

#btn-reset-filter {
  @apply bg-red-500 hover:bg-red-700;
}

#table-wrapper {
  @apply w-full h-screen overflow-auto border border-gray-500;
}

#btn-unselect-classes {
  @apply mb-1;
}

#table {
  @apply w-full;
}

#table th,
#table td {
  @apply border border-gray-500 p-2 text-lg;
  min-width: 5rem;
}

#table tr th:first-child,
#table tr td:first-child {
  min-width: 0;
}

#table tr td input {
  @apply w-5 h-5 m-2 cursor-pointer;
}

#table tr {
  @apply hover:bg-gray-100;
}

#table th {
  @apply text-white bg-gray-700;
}
</style>