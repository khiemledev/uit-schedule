<template>
  <div id="home">
    <Summary />
    <ScheduleTable />
    <SelectedClassesCode />
    <ClassesTable />
  </div>
</template>

<script>
import ClassesTable from "../components/ClassesTable";
import ScheduleTable from "../components/ScheduleTable";
import SelectedClassesCode from "../components/SelectedClassesCode";
import Summary from "../components/Summary";

export default {
  name: "Home",
  components: {
    ClassesTable,
    ScheduleTable,
    SelectedClassesCode,
    Summary,
  },
};
</script>

<style scoped>
#home {
  @apply container w-full p-4 space-y-4 mx-auto;
}
</style>