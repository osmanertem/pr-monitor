<template>
  <tr
    class="pr-row"
    :class="{'has-enough-approvers' : didPRGetRequiredApproves, 'dont-have-enough-approvers': !didPRGetRequiredApproves}"
  >
    <td>
      <a
        :href="`https://github.com/${config.githubConfig.owner}/${config.githubConfig.repo}/pull/${prData.number}`"
        target="_blank"
      >{{ prData.number }}</a>
    </td>
    <td :class="{'blink_me': isReadyToBeMerged}">{{ isReadyToBeMerged ? '✅' : '❌'}}</td>
    <td :title="prData.user.login">{{ ownerName }}</td>
    <td>
      <a
        :href="`https://github.com/${config.githubConfig.owner}/${config.githubConfig.repo}/pull/${prData.number}`"
        target="_blank"
      >{{ prData.title }}</a>
    </td>
    <td>
      <span v-if="!didIApprove" class="blink_me" title="I did not approve yet">❗️</span>
      <span
        v-for="(currentApprover, index) in approverList"
        :title="currentApprover.login"
        :key="currentApprover.login"
      >{{ currentApprover.name + (approverList.length-1 === index ? '' :', ') }}</span>
    </td>
    <td style="padding-top:5px">
      <table>
        <tr>
          <template v-for="(currentStatusInfo, index) in prData.checkerStatuses">
            <td :key="index + '_avatar'" style="padding:0px; padding-left:5px">
              <a
                :href="currentStatusInfo.target_url"
                :key="index + '_url'"
                target="_blank"
                :title="currentStatusInfo.context + ': ' + currentStatusInfo.description"
              >
                <img height="20" :src="currentStatusInfo.avatar_url">
              </a>
            </td>
            <td
              :key="index + '_status'"
              style="padding:0px; height:26px; padding-bottom:9px; padding-right:5px"
            >
              <span style="font-size:10px">{{ currentStatusInfo.state === 'success' ? '✅' : '❌'}}</span>
            </td>
          </template>
        </tr>
      </table>
    </td>
    <td>{{ prData.mergeable ? '✅' : '❌'}}</td>
    <td>{{ didPRGetRequiredApproves ? '✅' : '❌'}}</td>
  </tr>
</template>

<script>
import { mapState } from "vuex";
import {
  getNameFromLogin,
  didPRGetRequiredApproveCount
} from "../helpers/theHelper";

export default {
  name: "PRRow",
  props: {
    prData: Object,
    index: Number
  },
  mounted() {},
  updated() {},
  computed: {
    ...mapState(["reviewersByPrID", "prList", "config"]),
    isReadyToBeMerged() {
      return this.hasAllCheckersPassed && this.didPRGetRequiredApproves;
    },
    hasAllCheckersPassed() {
      let result = true;

      if (this.prData.checkerStatuses) {
        this.prData.checkerStatuses.forEach(currentStatus => {
          result = result && currentStatus.state === "success";
        });
      }

      return result;
    },
    approverList() {
      let prNumber = this.prData.number + "";

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
            name: getNameFromLogin(
              this.reviewersByPrID[prNumber][currentReviewer].user.login
            )
          });
        }
      }
      return tempList;
    },
    didIApprove() {
      return (
        this.approverList.filter(currentApprover => {
          return currentApprover.login === this.config.githubConfig.username;
        }).length > 0
      );
    },
    didPRGetRequiredApproves() {
      return didPRGetRequiredApproveCount(this.approverList);
    },
    ownerName() {
      return getNameFromLogin(this.prData.user.login);
    }
  },
  methods: {
    getApproversOfAPr(prNumber) {
      if (!this.reviewersByPrID[prNumber]) {
        return [];
      }
      let filteredList = [];
      for (let currentReviewer in this.reviewersByPrID[prNumber]) {
        if (currentReviewer.state === "APPROVED") {
          filteredList.push(currentReviewer);
        }
      }
      return filteredList;
    }
  }
};
</script>

<style>
.pr-row {
  height: 50px;
}

.pr-didNOT-get-required-approve-count {
  background-color: red;
}
.has-enough-approvers {
  background-color: greenyellow;
}
.dont-have-enough-approvers {
  background-color: lightgray;
}
.blink_me {
  animation: blinker 2s ease-in-out infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
