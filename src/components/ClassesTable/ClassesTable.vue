<template>
  <div id="classes-table">
    <PopupDialog @close="closeDialog" v-show="dialog.show">
      <template #body>{{ dialog.body }}</template>
    </PopupDialog>
    <ClassesTableActionsBar
      @toggleShowFilter="toggleShowFilter"
      @search="search"
      :showFilter="showFilter"
    />
    <ClassesTableFilters
      :showFilter="showFilter"
      :displayFields="displayFields"
      @displayFieldsChanged="displayFieldChanged"
      @resetFilter="resetFilter"
    />

    <div class="table-actions">
      <button id="btn-unselect-classes" @click="unselectClasses" class="btn">
        Bỏ chọn ({{ selectedClasses.length }} đã chọn)
      </button>

      <ClassesTablePaginationBar
        :page="page"
        @nextPage="nextPage"
        @prevPage="prevPage"
      />
    </div>

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
    <ClassesTablePaginationBar
      :page="page"
      @nextPage="nextPage"
      @prevPage="prevPage"
    />
  </div>
</template>

<script>
import mapper from "@/assets/json_mapper.json";
import PopupDialog from "@/components/PopupDialog";
import ClassesTableActionsBar from "./ClassesTableActionsBar";
import ClassesTableFilters from "./ClassesTableFilters";
import ClassesTablePaginationBar from "./ClassesTablePaginationBar";

export default {
  name: "ClassesTable",
  components: {
    PopupDialog,
    ClassesTableActionsBar,
    ClassesTableFilters,
    ClassesTablePaginationBar,
  },
  data() {
    return {
      mapper: mapper,
      showFilter: false,
      classes: [],
      queriedClasses: [],
      selectedClasses: [],
      page: 1,
      itemsPerPage: 50,
      dialog: {
        show: false,
        title: "Alert",
        body: "",
      },
    };
  },
  computed: {
    displayFields() {
      return this.$store.state.displayFields;
    },
    getClasses() {
      return this.$store.state.classes;
    },
    getSelectedClasses() {
      return this.$store.state.selectedClasses;
    },
    start() {
      return (this.page - 1) * this.itemsPerPage;
    },
    end() {
      return this.itemsPerPage * this.page;
    },
  },
  watch: {
    queriedClasses() {
      this.updateClasses();
    },
    page() {
      this.updateClasses();
    },
    getSelectedClasses(newVal) {
      this.selectedClasses = newVal;
    },
    selectedClasses(newVal) {
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
    displayFieldChanged(newVal) {
      this.displayFields = newVal;
    },
    toggleShowFilter() {
      this.showFilter = !this.showFilter;
    },
    updateClasses() {
      this.classes = this.queriedClasses.slice(this.start, this.end);
    },
    nextPage() {
      if (
        this.page < Math.ceil(this.queriedClasses.length / this.itemsPerPage)
      ) {
        this.page++;
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
      }
    },
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
      this.$store.commit("resetFilter");
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
    search(qr) {
      if (qr == "") {
        this.page = 1;
        this.queriedClasses = this.$store.state.classes;
        return;
      }
      // Search for every field that includes the query
      this.page = 1;
      this.queriedClasses = this.$store.state.classes.filter(
        (c) =>
          this.safeToStr(c.STT).includes(qr) ||
          this.safeToStr(c.MaMH).includes(qr) ||
          this.safeToStr(c.MaLop).includes(qr) ||
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
    this.queriedClasses = this.getClasses;
    this.selectedClasses = this.getSelectedClasses;
  },
};
</script>

<style scoped src="@/styles/ClassesTable/ClassesTable.css"></style>