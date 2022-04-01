<template>
  <div @click="checkClick" ref="taskWrap" class="task-wrap flex flex-column">
    <form @submit.prevent="submitForm" class="task-content">
      <Loading v-show="loading" />
      <h1 v-if="!editTask">New Task</h1>
      <h1 v-else>Edit Task</h1>

      <!-- Task-create -->
      <div class="task-details flex flex-column">
        <div class="input flex flex-column">
          <label for="taskName">Title</label>
          <input required type="text" id="taskName" v-model="taskName" />
        </div>
        <div class="input flex flex-column">
          <label for="taskDescription">Description</label>
          <input
            required
            type="text"
            id="taskDescription"
            v-model="taskDescription"
          />
        </div>
      </div>

      <div class="task-work flex flex-column">
        <div class="input flex flex-column">
          <label for="taskPriority">Priority</label>
          <select required type="text" id="taskPriority" v-model="taskPriority">
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div class="input flex flex-column">
          <label for="taskDeadline" id="taskDeadline">Deadline</label>
          <input v-model="taskDeadline" type="date" for />
        </div>
        <div class="input flex flex-column">
          <label for="status">Status</label>
          <select required type="text" id="taskStatus" v-model="taskStatus">
            <option value="Not Started">Not Started</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Delayed">Delayed</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      <!-- Save/Exit -->
      <div class="save flex">
        <div class="left">
          <button type="button" @click="closeTask" class="red">Cancel</button>
        </div>
        <div class="right flex">
          <button
            v-if="!editTask"
            type="submit"
            @click="publishTask"
            class="purple"
          >
            Save
          </button>
          <button v-if="editTask" type="sumbit" class="purple">
            Update Task
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
import Loading from "../components/Loading";
import { mapActions, mapMutations, mapState } from "vuex";
import { uid } from "uid";
export default {
  name: "taskModal",
  data() {
    return {
      // dateOptions: { year: "numeric", month: "numeric", day: "numeric" },
      docId: null,
      taskName: null,
      loading: null,
      // taskDateUnix: null,
      // taskDate: null,
      // taskTerms: null,
      // taskDueDateUnix: null,
      // taskDueDate: null,
      taskDeadline: Date,
      taskDescription: null,
      taskStatus: null,
      taskPriority: null,
      taskItemList: [],
    };
  },
  components: {
    Loading,
  },
  created() {
    if (this.editTask) {
      const currentTask = this.currentTaskArray[0];
      this.docId = currentTask.docId;
      this.taskName = currentTask.taskName;
      this.taskDeadline = currentTask.taskDeadline;
      this.taskDescription = currentTask.taskDescription;
      this.taskPriority = currentTask.taskPriority;
      this.taskItemList = currentTask.taskItemList;
      this.taskStatus = currentTask.taskStatus;
    }
  },
  methods: {
    ...mapMutations(["TOGGLE_TASK", "TOGGLE_MODAL", "TOGGLE_EDIT_TASK"]),

    ...mapActions(["UPDATE_TASK", "GET_TASKS"]),

    checkClick(e) {
      if (e.target === this.$refs.taskWrap) {
        this.TOGGLE_MODAL();
      }
    },

    closeTask() {
      this.TOGGLE_TASK();
      if (this.editTask) {
        this.TOGGLE_EDIT_TASK();
      }
    },

    async uploadTask() {

      this.loading = true;

      const dataBase = db.collection("tasks").doc();

      await dataBase.set({
        taskId: uid(6),
        taskName: this.taskName,
        // taskDate: this.taskDate,
        // taskDateUnix: this.taskDateUnix,
        // taskTerms: this.taskTerms,
        // taskDueDate: this.taskDueDate,
        // taskDueDateUnix: this.taskDueDateUnix,
        taskDeadline: this.taskDeadline,
        taskDescription: this.taskDescription,
        taskItemList: this.taskItemList,
        taskStatus: this.taskStatus,
        taskPriority: this.taskPriority,
      });

      this.loading = false;

      this.TOGGLE_TASK();

      this.GET_TASKS();
    },

    async updateTask() {

      this.loading = true;

      const dataBase = db.collection("tasks").doc(this.docId);

      await dataBase.update({
        taskName: this.taskName,
        // taskTerms: this.taskTerms,
        // taskDueDate: this.taskDueDate,
        // taskDueDateUnix: this.taskDueDateUnix,
        taskDeadline: this.taskDeadline,
        taskDescription: this.taskDescription,
        taskItemList: this.taskItemList,
        taskPriority: this.taskPriority,
        taskStatus: this.taskStatus,
      });

      this.loading = false;

      const data = {
        docId: this.docId,
        routeId: this.$route.params.taskId,
      };

      this.UPDATE_TASK(data);
    },

    submitForm() {
      if (this.editTask) {
        this.updateTask();
        return;
      }
      this.uploadTask();
    },
  },
  computed: {
    ...mapState(["editTask", "currentTaskArray"]),
  },
  watch: {
    taskTerms() {
      const futureDate = new Date();
      this.taskDueDateUnix = futureDate.setDate(
        futureDate.getDate() + parseInt(this.taskTerms)
      );
      this.taskDueDate = new Date(this.taskDueDateUnix).toLocaleDateString(
        "en-us",
        this.dateOptions
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.task-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 900px) {
    left: 90px;
  }

  .task-content {
    position: relative;
    padding: 56px;
    max-width: 700px;
    width: 100%;
    background-color: #141625;
    color: #fff;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    h1 {
      margin-bottom: 48px;
      color: #fff;
    }

    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      color: #777f98;
    }

    h4 {
      color: #7c5dfa;
      font-size: 12px;
      margin-bottom: 24px;
    }

    // Bill To / Bill From
    .task-details {
      margin-bottom: 48px;

      .location-details {
        gap: 16px;
        div {
          flex: 1;
        }
      }
    }

    // Task Work

    .task-work {
      .input{
        color: #fff;
      }
      .task-deadline {
        gap: 24px;
        div {
          flex: 1;
        }
      }

      .work-items {
        .item-list {
          width: 100%;

          // Item Table Styling
          .table-heading,
          .table-items {
            gap: 16px;
            font-size: 12px;

            .item-name {
              flex-basis: 50%;
            }

            .qty {
              flex-basis: 10%;
            }

            .price {
              flex-basis: 20%;
            }

            .total {
              flex-basis: 20%;
              align-self: center;
            }
          }

          .table-heading {
            margin-bottom: 16px;

            th {
              text-align: left;
            }
          }

          .table-items {
            position: relative;
            margin-bottom: 24px;

            img {
              position: absolute;
              top: 15px;
              right: 0;
              width: 12px;
              height: 16px;
            }
          }
        }

        .button {
          color: #fff;
          background-color: #252945;
          align-items: center;
          justify-content: center;
          width: 100%;

          img {
            margin-right: 4px;
          }
        }
      }
    }

    .save {
      margin-top: 60px;

      div {
        flex: 1;
      }

      .right {
        justify-content: flex-end;
        button {
          font-size: 10px;
        }
      }
    }
  }

  .input {
    margin-bottom: 24px;
  }

  label {
    font-size: 12px;
    margin-bottom: 6px;
  }

  input,
  select {
    width: 100%;
    background-color: #1e2139;
    color: #fff;
    border-radius: 4px;
    padding: 12px 4px;
    border: none;

    &:focus {
      outline: none;
    }
  }
}
</style>
