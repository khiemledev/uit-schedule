<template>
  <div id="home">
    <ClassesTable />
  </div>
</template>

<script>
import ClassesTable from "../components/ClassesTable";

export default {
  name: "Home",
  components: { ClassesTable },
};
</script>

<style scoped>
#home {
  @apply container p-4;
}
</style>