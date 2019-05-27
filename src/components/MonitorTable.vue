<template>
  <div>
    <table class="the-table" border="1">
      <thead>
        <th>#</th>
        <th>
          QA
          <br>SW
        </th>
        <th title="Ready to be merged. All checkers succeeded and has enough approvers">Ready</th>
        <th>Owner</th>
        <th>Title</th>
        <th>Approvers</th>
        <th>Checkers</th>
        <th>Mergeable</th>
        <th>
          Has Enough
          <br>Approvers
        </th>
      </thead>
      <tbody>
        <PRRow
          v-for="(prData, index) in filteredPrList"
          :prData="prData"
          :index="index"
          :key="index"
          :hideQA="hideQA"
          :hideSW="hideSW"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PRRow from "./PRRow";
import {
  getUserWithLogin,
  didPRGetRequiredApproveCount
} from "../helpers/theHelper";
import { setInterval } from "timers";

export default {
  name: "MonitorTable",
  props: ["hideQA", "hideSW"],
  data() {
    return {
      windowTitle: "pr-monitor"
    };
  },
  updated() {
    this.windowTitle =
      "(" +
      this.filteredPrList.length +
      ")" +
      (this.isThereAnyReadyPR ? "Ⓜ️" : "") +
      (this.isMyReviewNeeded ? "❗️ " : "") +
      "pr-monitor";

    // document.title = '(' + this.filteredPrList.length + ") pr monitor";
  },
  mounted() {
    setInterval(() => {
      if (document.title == "pr-monitor") {
        document.title = this.windowTitle;
      } else {
        document.title = "pr-monitor";
      }
    }, 1 * 1000);
  },
  computed: {
    ...mapState(["reviewersByPrID", "prList", "config"]),
    filteredPrList() {
      return this.prList.filter(prData => {
        let currentUser = getUserWithLogin(prData.user.login);
        return (
          !(currentUser.role === "SW" && this.hideSW) &&
          !(currentUser.role === "QA" && this.hideQA)
        );
      });
    },
    isMyReviewNeeded() {
      let result = false;
      this.filteredPrList.forEach(prData => {
        if (!this.didIApprove(prData)) {
          result = true;
        }
      });

      return result;
    },
    isThereAnyReadyPR() {
      let result = false;
      this.filteredPrList.forEach(prData => {
        if (
          this.hasAllCheckersPassed(prData) &&
          this.didPRGetRequiredApproves(prData) &&
          prData.mergeable &&
          prData.mergeable_state === 'clean'
        ) {
          result = true;
        }
      });

      return result;
    }
  },
  methods: {
    didPRGetRequiredApproves(prData) {
      let approverList = this.getApproverList(prData);
      if (!approverList) {
        return false;
      }

      return didPRGetRequiredApproveCount(approverList);
    },
    hasAllCheckersPassed(prData) {
      let result = true;

      if (prData.checkerStatuses) {
        prData.checkerStatuses.forEach(currentStatus => {
          result = result && currentStatus.state === "success";
        });
      }
      return result;
    },
    didIApprove(prData) {
      let approverList = this.getApproverList(prData);

      if (!approverList) {
        return false;
      }

      return (
        approverList.filter(currentApprover => {
          return currentApprover.login === this.config.githubConfig.username;
        }).length > 0
      );
    },
    getApproverList(prData) {
      let prNumber = prData.number + "";

      if (!this.reviewersByPrID[prNumber]) {
        return [];
      }
      let tempList = [];
      for (let currentReviewer in this.reviewersByPrID[prNumber]) {
        if (
          this.reviewersByPrID[prNumber][currentReviewer].state === "APPROVED"
        ) {
          tempList.push({
            login: this.reviewersByPrID[prNumber][currentReviewer].user.login,
            name: getUserWithLogin(
              this.reviewersByPrID[prNumber][currentReviewer].user.login
            ).name
          });
        }
      }
      return tempList;
    }
  },
  components: {
    PRRow
  }
};
</script>

<style>
.the-table {
  margin-left: auto;
  margin-right: auto;
}
.the-table td {
  padding-right: 10px;
  padding-left: 10px;
}
.the-table th {
  padding-right: 10px;
  padding-left: 10px;
}
</style>
