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

<style scoped src="../styles/PopupDialog.css"></style>