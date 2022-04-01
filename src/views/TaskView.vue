<template>
  <div v-if="currentTask" class="task-view container">
    <router-link class="nav-link flex" :to="{ name: 'Home' }">
      <img src="@/assets/icon-arrow-left.svg" alt="" /> Go Back
    </router-link>
    <!-- Header -->
    <div class="header flex">
      <div class="left flex">
        <span>Status</span>
        <div
          class="status-button flex"
          :class="{
            'not-started': currentTask.taskStatus === 'Not Started',
            pending: currentTask.taskStatus === 'Pending',
            'in-progress': currentTask.taskStatus === 'In Progress',
            delayed: currentTask.taskStatus === 'Delayed',
            done: currentTask.taskStatus === 'Done',
          }"
        >
          <span>{{ currentTask.taskStatus }}</span>
        </div>
      </div>
      <div class="right flex">
        <button @click="toggleEditTask" class="dark-purple">Edit</button>
        <button @click="toggleDeleteModal" class="red">
          Delete
        </button>
      </div>
    </div>

    <!-- Task Details -->
    <div class="task-details flex flex-column">
      <div class="top flex">
        <div class="left flex flex-column">
          <p><span></span>{{ currentTask.taskName }}</p>
        </div>
      </div>
      <div class="middle flex">
        <div class="task-date flex flex-column">
          <h4>Task Deadline</h4>
          <p>
            {{ currentTask.taskDeadline }}
          </p>
        </div>
        <div class="task-terms flex flex-column">
          <h4>Task Priority</h4>
          <p>{{ currentTask.taskPriority }}</p>
        </div>
        <div class="task-description flex flex-column">
          <h4>Task Description</h4>
          <p>{{ currentTask.taskDescription }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "taskView",
  data() {
    return {
      currentTask: null,
    };
  },
  created() {
    this.getCurrentTask();
  },
  methods: {
    ...mapMutations(["SET_CURRENT_TASK", "TOGGLE_EDIT_TASK", "TOGGLE_TASK", "TOGGLE_DELETE_MODAL"]),

    ...mapActions([
      "DELETE_TASK",
    ]),
    
    getCurrentTask() {
      this.SET_CURRENT_TASK(this.$route.params.taskId);
      this.currentTask = this.currentTaskArray[0];
    },

    toggleEditTask() {
      this.TOGGLE_EDIT_TASK();
      this.TOGGLE_TASK();
    },
    toggleDeleteModal() {
        this.TOGGLE_DELETE_MODAL();
    },
    
  },
  computed: {
    ...mapState(["currentTaskArray", "editTask"]),
  },
  watch: {
    editTask() {
      if (!this.editTask) {
        this.currentTask = this.currentTaskArray[0];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.task-view {
  .nav-link {
    margin-bottom: 32px;
    align-items: center;
    color: #fff;
    font-size: 12px;
    img {
      margin-right: 16px;
      width: 7px;
      height: 10px;
    }
  }

  .header,
  .task-details {
    background-color: #1e2139;
    border-radius: 20px;
  }

  .header {
    align-items: center;
    padding: 24px 32px;
    font-size: 12px;

    .left {
      align-items: center;

      span {
        color: #dfe3fa;
        margin-right: 16px;
      }
    }

    .right {
      flex: 1;
      justify-content: flex-end;

      button {
        color: #fff;
      }
    }
  }

  .task-details {
    padding: 48px;
    margin-top: 24px;

    .top {
      div {
        color: #dfe3fa;
        flex: 1;
      }

      .left {
        font-size: 12px;
        p:first-child {
          font-size: 24px;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 8px;
        }

        p:nth-child(2) {
          font-size: 16px;
        }

        span {
          color: #888eb0;
        }
      }

      .right {
        font-size: 12px;
        align-items: flex-end;
      }
    }

    .middle {
      margin-top: 50px;
      color: #dfe3fa;
      gap: 16px;

      h4 {
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 12px;
      }

      p {
        font-size: 16px;
      }

      .task-terms,
      .task-date {
        flex: 1;
      }

      .task-date {
        h4:nth-child(3) {
          margin-top: 32px;
        }

        p {
          font-weight: 600;
        }
      }

      .task-terms {
        h4:nth-child(3) {
          margin-top: 32px;
        }
        p:nth-child(2) {
          font-size: 16px;
        }
        p:nth-child(3) {
          margin-top: auto;
        }

        p {
          font-size: 12px;
        }
      }

      .task-description {
        flex: 2;
      }
    }

    .bottom {
      margin-top: 50px;

      .billing-items {
        padding: 32px;
        border-radius: 20px 20px 0 0;
        background-color: #252945;

        .heading {
          color: #dfe3fa;
          font-size: 12px;
          margin-bottom: 32px;

          p:first-child {
            flex: 3;
            text-align: left;
          }

          p {
            flex: 1;
            text-align: right;
          }
        }

        .item {
          margin-bottom: 32px;
          font-size: 13px;
          color: #fff;

          &:last-child {
            margin-bottom: 0;
          }

          p:first-child {
            flex: 3;
            text-align: left;
          }

          p {
            flex: 1;
            text-align: right;
          }
        }
      }

      .total {
        color: #fff;
        padding: 32px;
        background-color: rgba(12, 14, 22, 0.7);
        align-items: center;
        border-radius: 0 0 20px 20px;

        p {
          flex: 1;
          font-size: 12px;
        }

        p:nth-child(2) {
          font-size: 28px;
          text-align: right;
        }
      }
    }
  }
}
</style>
