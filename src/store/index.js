import { createStore } from "vuex";
import db from "../firebase/firebaseInit";

export default createStore({
  state: {
    taskData: [],
    taskModal: null,
    modalActive: null,
    tasksLoaded: null,
    currentTaskArray: null,
    editTask: null,
  },
  mutations: {
    TOGGLE_TASK(state) {
      state.taskModal = !state.taskModal;
    },
    TOGGLE_MODAL(state) {
      state.modalActive = !state.modalActive;
    },
    SET_TASK_DATA(state, payload) {
      state.taskData.push(payload);
      // console.log(state);
      // console.log(payload);
    },
    TASKS_LOADED(state) {
      state.tasksLoaded = true;
    },
    SET_CURRENT_TASK(state, payload) {
      state.currentTaskArray = state.taskData.filter((task) => {
        return task.taskId === payload;
      });
    },
    TOGGLE_EDIT_TASK(state) {
      state.editTask = !state.editTask;
    },
    DELETE_TASK(state, payload) {
      state.taskData = state.taskData.filter((task) => task.docId !== payload);
    },
    
  },
  actions: {
    async GET_TASKS({ commit, state }) {
      const getData = db.collection("tasks");
      const results = await getData.get();
      results.forEach((doc) => {
        if (!state.taskData.some((task) => task.docId === doc.id)) {
          const data = {
            docId: doc.id,
            taskId: doc.data().taskId,
            taskName: doc.data().taskName,
            taskDateUnix: doc.data().taskDateUnix,
            taskDate: doc.data().taskDate,
            taskTerms: doc.data().taskTerms,
            taksDueDateUnix: doc.data().taskDueDateUnix,
            taskDueDate: doc.data().taskDueDate,
            taskDescription: doc.data().taskDescription,
            taskItemList: doc.data().taskItemList,
            taskPending: doc.data().taskPending,
            taskNotStarted: doc.data().taskNotStarted,
            taskDone: doc.data().taskDone,
            taskDelayed: doc.data().taskDelayed,
            taskInProgress: doc.data().taskInProgress,
            taskPriority: doc.data().taskPriority,
            taskStatus: doc.data().taskStatus,
          };
          commit("SET_TASK_DATA", data);
        }
      });
      commit("TASKS_LOADED");
    },
    async UPDATE_TASK({ commit, dispatch }, { docId, routeId }) {
      commit("DELETE_TASK", docId);
      await dispatch("GET_TASKS");
      commit("TOGGLE_TASK");
      commit("TOGGLE_EDIT_TASK");
      commit("SET_CURRENT_TASK", routeId);
    },
    async DELETE_TASK({ commit }, docId) {
      const getTask = db.collection("tasks").doc(docId);
      await getTask.delete();
      commit("DELETE_TASK", docId);
    },
    // async UPDATE_STATUS_TO_DONE({ commit }, docId) {
    //   const getTask = db.collection("tasks").doc(docId);
    //   await getTask.update({
    //     taskDone: true,
    //     taskPending: false,
    //   });
    //   commit("UPDATE_STATUS_TO_DONE", docId);
    // },
    // async UPDATE_STATUS_TO_PENDING({ commit }, docId) {
    //   const getTask = db.collection("tasks").doc(docId);
    //   await getTask.update({
    //     taskDone: false,
    //     taskPending: true,
    //     taskNotStarted: false,
    //   });
    //   commit("UPDATE_STATUS_TO_PENDING", docId);
    // },
  },
  modules: {},
});
