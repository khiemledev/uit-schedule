<template>
  <div id="home">
    <Summary />
    <ScheduleTable />
    <SelectedClassesCode />
    <ClassesTable />
    <TheFooter />
    <ButtonBackToTop />
  </div>
</template>

<script>
import ClassesTable from "../components/ClassesTable/ClassesTable";
import ScheduleTable from "../components/ScheduleTable/ScheduleTable";
import SelectedClassesCode from "../components/SelectedClassesCode";
import Summary from "../components/Summary";
import ButtonBackToTop from "../components/Once/BackToTopButton";
import TheFooter from "../components/Once/TheFooter";

export default {
  name: "Home",
  components: {
    ClassesTable,
    ScheduleTable,
    SelectedClassesCode,
    Summary,
    ButtonBackToTop,
    TheFooter,
  },
};
</script>

<style scoped>
#home {
  @apply container w-full p-4 space-y-4 mx-auto;
}
</style>