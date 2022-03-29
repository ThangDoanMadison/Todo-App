<template>
  
    
    <div class="task flex">
      <div class="left flex">
        <span class="task-name">{{ task.taskName }}</span>
        <!-- <span class="task-date">{{ task.taskDate }}</span> -->
        <span class="due-date">{{ task.taskDueDate }}</span>
      </div>
      <div class="right flex">
        <span class="priority">{{ task.taskPriority }}</span>
        <div
          class="status-button flex"
          :class="{
            'not-started': task.taskStatus === 'Not Started',
            pending: task.taskStatus === 'Pending',
            'in-progress': task.taskStatus === 'In Progress',
            delayed: task.taskStatus === 'Delayed',
            done: task.taskStatus === 'Done',
          }"
        >
          <span>{{ task.taskStatus }}</span>
        </div>
        <router-link
          class=""
          :to="{ name: 'Task', params: { taskId: task.taskId } }"
        >
          <div class="icon">
            <img src="@/assets/icon-arrow-right.svg" alt="" />
          </div>
        </router-link>
      </div>
    </div>
  
</template>

<script>
export default {
  // eslint-disable-next-line
  name: "task",
  props: ["task"],
};
</script>

<style lang="scss" scoped>

.header {
  text-decoration: none;
  cursor: pointer;
  gap: 16px;
  margin-bottom: 16px;
  color: #fff;
  border-radius: 20px;
  padding: 28px 32px;
  background-color: #1e2139;
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
.task {
  text-decoration: none;
  cursor: pointer;
  gap: 16px;
  margin-bottom: 16px;
  color: #fff;
  border-radius: 20px;
  padding: 28px 32px;
  background-color: #1e2139;
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
