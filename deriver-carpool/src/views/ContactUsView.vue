<template>
  <div class="contact-wrapper">
    <div class="card" style="width: 30rem;">
      <div class="card-header">
        Contact Page
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><b>Email: </b>customerservice@deriver.com</li>
        <li class="list-group-item"><b>Phone: </b> +1 (123)-456-7890</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactUsView",
};
</script>

<style scoped>
@import 'bootstrap/dist/css/bootstrap.min.css';

.contact-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  margin-top: 3em;
}

.card {
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: #f8f9fa;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  font-size: 1.25rem;
  font-weight: bold;
  color: #231F20;
}

.list-group {
  padding-left: 0;
  margin-bottom: 0;
}

.list-group-item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  color: #231F20;
}
</style>