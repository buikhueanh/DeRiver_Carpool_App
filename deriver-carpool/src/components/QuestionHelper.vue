<template>
  <footer class="footer">
    <div class="footer-wrapper">
      <RouterLink to="/contact" class="contact-link">
        Have questions? <button class="contact-button">Contact Us</button>
      </RouterLink>
    </div>
  </footer>
</template>

<script>
export default {
  name: "QuestionHelper",
};
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #231F20;
  padding: 20px;
  text-align: center;
  color: #fff;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.footer-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.contact-link {
  text-decoration: none;
  color: inherit;
}

.contact-button {
  background-color: #AD974F;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin-left: 10px;
}

.contact-button:hover {
  background-color: #8E793E;
}
</style>