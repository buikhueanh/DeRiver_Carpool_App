<template>
  <Navbar />
  <QuestionHelper />
</template>

<script>
import Navbar from "./components/Navbar.vue";
import QuestionHelper from "./components/QuestionHelper.vue";

export default {
  name: "App",
  components: {
    Navbar,
    QuestionHelper,
  },
};
</script>
