<template>
  <div id="home">
    <ScheduleTable />
    <ClassesTable />
  </div>
</template>

<script>
import ClassesTable from "../components/ClassesTable";
import ScheduleTable from "../components/ScheduleTable";

export default {
  name: "Home",
  components: { ClassesTable, ScheduleTable },
};
</script>

<style scoped>
#home {
  @apply container w-full p-4;
}
</style>