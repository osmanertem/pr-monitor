/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    prList: [],
    reviewersByPrID: {},
    config: {}
  },
  getters: {
    getPrList(state) {
      return state.prList;
    }
  },
  actions: {
    init({ commit, dispatch }) {
      commit("INIT_CONFIG");
      dispatch("fetchPRList");
    },
    fetchPRList({ commit, dispatch, state }) {
      fetch(
        `https://api.github.com/repos/${state.config.githubConfig.owner}/${state.config.githubConfig.repo}/pulls?access_token=${
          state.config.githubConfig.apiAccessToken
        }`
      )
        .then(response => response.json())
        .then(jsonData => {
          // console.log("fetchPRList", jsonData);
          commit("PROCESS_NEW_PR_LIST", jsonData);

          jsonData.forEach(prData => {
            dispatch("fetchPRReviewStatus", prData.number);
            dispatch("fetchPRDetails", prData.number);
            dispatch("fetchCheckerStatuses", { checkStatusQueryURL: prData.statuses_url, prNumber: prData.number });
          });
        })
        .catch(error => console.error(error));
    },
    fetchPRReviewStatus({ commit, dispatch, state }, prNumber, page = 0) {
      // console.log("fetchPRReviewStatus triggered", prNumber, page);
      fetch(
        `https://api.github.com/repos/${state.config.githubConfig.owner}/${state.config.githubConfig.repo}/pulls/${prNumber}/reviews?access_token=${
          state.config.githubConfig.apiAccessToken
        }&page=${page}`
      )
        .then(response => response.json())
        .then(jsonData => {
          // console.log("fetchPRReviewStatus", jsonData);
          if (jsonData && jsonData.length === 30) {
            dispatch("fetchPRReviewStatus", prNumber, ++page);
          }
          commit("PROCESS_PR_REVIEW_STATUS", { jsonData, prNumber });
        })
        .catch(error => console.error(error));
    },
    fetchPRDetails({ commit, state }, prNumber) {
      fetch(
        `https://api.github.com/repos/${state.config.githubConfig.owner}/${state.config.githubConfig.repo}/pulls/${prNumber}?access_token=${
          state.config.githubConfig.apiAccessToken
        }`
      )
        .then(response => response.json())
        .then(jsonData => {
          // console.log("fetchPRDetails", jsonData);
          commit("PROCESS_PR_DETAILS", { jsonData });
        })
        .catch(error => console.error(error));
    },
    async fetchCheckerStatuses({ commit, state }, { checkStatusQueryURL, prNumber }) {
      // console.log(checkStatusQueryURL + `?access_token=${Config.githubConfig.apiAccessToken}`);
      fetch(checkStatusQueryURL + `?access_token=${state.config.githubConfig.apiAccessToken}`)
        .then(response => response.json())
        .then(jsonData => {
          // console.log("fetchCheckerStatuses", jsonData);
          commit("PROCESS_CHECKER_STATUS", { jsonData, prNumber });
        })
        .catch(error => console.error(error));
    }
  },
  mutations: {
    CLEAR_PR_LIST(state) {
      state.prList = [];
      state.reviewersByPrID = {};
    },
    INIT_CONFIG(state) {
      if (!localStorage["config"]) {
        localStorage["config"] = JSON.stringify({
          pageReloadInMs: 60000,
          githubConfig: {
            username: "osmanertem",
            apiAccessToken: "",
            owner: "vuexp",
            repo: "vuexp"
          }
        });
      }

      state.config = JSON.parse(localStorage["config"]);
    },
    UPDATE_CONFIG(state, { newConfig }) {
      state.config = newConfig;
    },
    PROCESS_CHECKER_STATUS(state, { jsonData, prNumber }) {
      let nonPendingStatuses = jsonData.filter(currentStatusInfo => {
        return currentStatusInfo.state !== "pending";
      });
      let uniqueStatusList = [];

      nonPendingStatuses.forEach(currentNonPending => {
        if (
          uniqueStatusList.filter(currentUnique => {
            return currentUnique.context === currentNonPending.context;
          }).length === 0
        ) {
          uniqueStatusList.push(currentNonPending);
        }
      });

      for (let i = 0; i < state.prList.length; i++) {
        if (state.prList[i].number == prNumber) {
          Vue.set(state.prList[i], "checkerStatuses", uniqueStatusList);
          break;
        }
      }
    },
    PROCESS_PR_DETAILS(state, { jsonData }) {
      for (let i = 0; i < state.prList.length; i++) {
        if (state.prList[i].number == jsonData.number) {
          Vue.set(state.prList[i], "mergeable", jsonData.mergeable);
          break;
        }
      }
    },
    PROCESS_PR_REVIEW_STATUS(state, { jsonData, prNumber }) {
      prNumber += "";

      jsonData.forEach(currentReviewData => {
        if (!state.reviewersByPrID[prNumber]) {
          Vue.set(state.reviewersByPrID, prNumber, {});
        }
        Vue.set(state.reviewersByPrID[prNumber], currentReviewData.user.login, currentReviewData);
      });

      //state.prList = jsonData;
    },
    PROCESS_NEW_PR_LIST(state, jsonData) {
      for (let i = 0; i < jsonData.length; i++) {
        let found = false;
        for (let j = 0; j < state.prList.length; j++) {
          if (jsonData[i].number == state.prList[j].number) {
            jsonData[i].mergeable = state.prList[j].mergeable;
            jsonData[i].checkerStatuses = state.prList[j].checkerStatuses;
            Vue.set(state.prList, j, jsonData[i]);
            found = true;
            break;
          }
        }

        if (!found) {
          Vue.set(state.prList, state.prList.length, jsonData[i]);
        }
      }

      //  state.prList = jsonData;
    },
    increment(state) {
      state.count++;
    }
  }
});
