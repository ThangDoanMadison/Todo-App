<template>
  <div class="header flex">
    <div class="left flex">
      <span class="header-task-name" @click="sortBy('taskName')">Name</span>
      <!-- <span class="task-date">{{ task.taskDate }}</span> -->
      <span class="header-deadline" @click="sortByDate('taskDeadline')"
        >Deadline</span
      >
    </div>
    <div class="right flex">
      <span class="header-priority" @click="sortBy('taskPriority')"
        >Priority</span
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  // eslint-disable-next-line
  name: "sorting",
  props: ["task"],
  computed: {
    ...mapState(["taskData"]),
  },
  methods: {
    sortBy(prop) {
      this.taskData.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
      console.log(this.taskData)
    },
    sortByDate() {
      this.taskData.sort((a, b) => b.date - a.date );
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  text-decoration: none;
  cursor: pointer;
  gap: 16px;
  margin-bottom: 16px;
  color: #fff;
  //   border-radius: 20px;
  padding: 28px 32px;
  //   background-color: #1e2139;
  align-items: center;

  span {
    font-size: 13px;
  }

  .left {
    align-items: center;
    flex-basis: 60%;
    gap: 16px;

    span {
      flex: 1;
    }

    .task-name {
      // text-transform: uppercase;
    }
  }

  .right {
    gap: 16px;
    flex-basis: 40%;
    align-items: center;

    .priority {
      flex: 1;
      font-size: 16px;
      font-weight: 600px;
    }
  }
}
</style>