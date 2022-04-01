<template>
  <div v-if="currentTask" class="modal flex">
    <div class="modal-content">
      <p>Are you sure to delete?</p>
      <div class="actions flex">
        <button @click="deleteTask(currentTask.docId)" class="red">Yes</button>
        <button @click="closeDeleteModal" class="purple">No</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  // eslint-disable-next-line
  name: "modal",
  computed: {
    ...mapState(["currentTaskArray"]),
  },
  data() {
    return {
      currentTask: null,
    };
  },
  created() {
    this.getCurrentTask();
  },
  methods: {
    ...mapMutations([
      "SET_CURRENT_TASK",
      "TOGGLE_EDIT_TASK",
      "TOGGLE_TASK",
      "TOGGLE_DELETE_MODAL",
    ]),
    ...mapActions(["DELETE_TASK"]),

    async deleteTask(docId) {
      await this.DELETE_TASK(docId);
      this.TOGGLE_DELETE_MODAL();
      this.$router.push({ name: "Home" });
    },

    closeDeleteModal() {
      this.TOGGLE_DELETE_MODAL();
    },
    getCurrentTask() {
      this.SET_CURRENT_TASK(this.$route.params.taskId);
      this.currentTask = this.currentTaskArray[0];
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  z-index: 100;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

  .modal-content {
    border-radius: 20px;
    padding: 48px 32px;
    max-width: 450px;
    background-color: #252945;
    color: #fff;

    p {
      text-align: center;
    }

    .actions {
      margin-top: 24px;
      button {
        flex: 1;
      }
    }
  }
}
</style>
