<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3><slot name="header">Thông báo</slot></h3>
          </div>

          <div class="modal-body">
            <slot name="body">Nội dung</slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "PopupDialog",
  emits: ["close"],
};
</script>

<style scoped>
#app {
  @apply p-4;
}

.modal-mask {
  @apply fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 table transition-opacity duration-300 ease-in-out;
}

.modal-wrapper {
  @apply table-cell align-middle;
}

.modal-container {
  @apply w-72 my-0 mx-auto py-5 px-8 bg-white rounded shadow-lg transition-all duration-300 ease-in-out;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  @apply mt-0 text-lg text-blue-500 font-semibold;
}

.modal-body {
  @apply my-5;
}

.modal-footer {
  @apply text-right;
}

.modal-default-button {
  @apply transition-colors duration-300 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 py-1 px-5;
}

.modal-enter-active {
  animation: fade 0.3s;
}
.modal-leave-active {
  animation: fade 0.3s reverse;
}
.modal-enter-active .modal-container {
  animation: bounce-in 0.4s;
}
.modal-leave-active .modal-container {
  animation: bounce-in 0.4s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>