<template>
  <div id="home">
    <ScheduleTable />
    <SelectedClassesCode />
    <ClassesTable />
  </div>
</template>

<script>
import ClassesTable from "../components/ClassesTable";
import ScheduleTable from "../components/ScheduleTable";
import SelectedClassesCode from "../components/SelectedClassesCode";

export default {
  name: "Home",
  components: { ClassesTable, ScheduleTable, SelectedClassesCode },
};
</script>

<style scoped>
#home {
  @apply container w-full p-4 space-y-4 mx-auto;
}
</style>