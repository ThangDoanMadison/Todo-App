<template>
  <div class="home container">
    <!-- Header -->
    <div class="header flex">
      <div class="left flex flex-column">
        <h1>Tasks</h1>
        <span>There are {{ taskData.length }} total tasks</span>
      </div>
      <div class="right flex">
        <div @click="toggleFilterMenu" class="filter flex">
          <span
            >Filter by status
            <span v-if="filteredTask">: {{ filteredTask }}</span></span
          >
          <img src="@/assets/icon-arrow-down.svg" alt="" />
          <ul v-show="filterMenu" class="filter-menu">
            <li @click="filteredTasks">Not started</li>
            <li @click="filteredTasks">Pending</li>
            <!-- <li @click="filteredTasks">In progress</li> -->
            <!-- <li @click="filteredTasks">Delayed</li> -->
            <li @click="filteredTasks">Done</li>
            <li @click="filteredTasks">Clear Filter</li>
          </ul>
        </div>
        <div @click="newTask" class="button flex">
          <div class="inner-button flex">
            <img src="@/assets/icon-plus.svg" alt="" />
          </div>
          <span>New Task</span>
        </div>
      </div>
    </div>
    <!-- Tasks -->
    <div v-if="taskData.length > 0">
      <Task
        v-for="(task, index) in filteredData"
        :task="task"
        :key="index"
      />
    </div>
    <div v-else class="empty flex flex-column">
      <img src="@/assets/empty-list.jpg" alt="" />
      <h3>There is nothing here</h3>
      <p>
        Create a new task by clicking the New Task button and get started
      </p>
    </div>
  </div>
</template>

<script>
import Task from "../components/Task";
import { mapMutations, mapState } from "vuex";
export default {
  // eslint-disable-next-line
  name: "Home",
  data() {
    return {
      filterMenu: null,
      filteredTask: null,
    };
  },
  components: {
    Task,
  },
  methods: {
    ...mapMutations(["TOGGLE_TASK"]),
    newTask() {
      this.TOGGLE_TASK();
    },

    toggleFilterMenu() {
      this.filterMenu = !this.filterMenu;
    },

    filteredTasks(e) {
      if (e.target.innerText === "Clear Filter") {
        this.filteredTask = null;
        return;
      }
      this.filteredTask = e.target.innerText;
    },
  },
  computed: {
    ...mapState(["taskData"]),

    filteredData() {
      return this.taskData.filter((task) => {
        if (this.filteredTask === "Not Started") {
          return task.taskNotStarted === true;
        }
        if (this.filteredTask === "Pending") {
          return task.taskPending === true;
        }
        if (this.filteredTask === "Done") {
          return task.taskDone === true;
        }
        return task;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  color: #fff;

  .header {
    margin-bottom: 65px;

    .left,
    .right {
      flex: 1;
    }

    .right {
      justify-content: flex-end;
      align-items: center;

      .button,
      .filter {
        align-items: center;

        span {
          font-size: 12px;
        }
      }

      .filter {
        position: relative;
        margin-right: 40px;
        cursor: pointer;

        img {
          margin-left: 12px;
          width: 9px;
          height: 5px;
        }

        .filter-menu {
          width: 120px;
          position: absolute;
          top: 25px;
          list-style: none;
          background-color: #1e2139;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);

          li {
            cursor: pointer;
            font-size: 12px;
            padding: 10px 20px;

            &:hover {
              color: #1e2139;
              background-color: #fff;
            }
          }
        }
      }

      .button {
        padding: 8px 10px;
        background-color: #7c5dfa;
        border-radius: 40px;

        .inner-button {
          margin-right: 8px;
          border-radius: 50%;
          padding: 8px;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          img {
            width: 10px;
            height: 10px;
          }
        }
      }
    }
  }

  .empty {
    margin-top: 160px;
    align-items: center;

    img {
      width: 214px;
      height: 200px;
    }

    h3 {
      font-size: 20px;
      margin-top: 40px;
    }

    p {
      text-align: center;
      max-width: 224px;
      font-size: 12px;
      font-weight: 300;
      margin-top: 16px;
    }
  }
}
</style>
