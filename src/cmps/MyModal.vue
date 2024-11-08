<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-container">
        <button class="modal-close" @click="close">&times;</button>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyModal',
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;

  z-index: 3;
}

.modal-content {

  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  position: relative;
  top: 15vh;
  max-width: 500px;
  width: 100%;
  height: 20vh;
  display: flex;
  justify-content: center;
}

.modal-close {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}
.modal-container{
  display: flex;
 flex-direction: column;
}
</style>
