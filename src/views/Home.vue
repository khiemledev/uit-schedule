<template>
  <div id="home">
    <TheHeader />
    <LastUpdateTime />
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
import TheHeader from "../components/Once/TheHeader";
import LastUpdateTime from "../components/Once/LastUpdateTime";

export default {
  name: "Home",
  components: {
    ClassesTable,
    ScheduleTable,
    SelectedClassesCode,
    Summary,
    ButtonBackToTop,
    TheFooter,
    TheHeader,
    LastUpdateTime
  },
};
</script>

<style scoped>
#home {
  @apply container w-full p-4 space-y-4 mx-auto;
}
</style>