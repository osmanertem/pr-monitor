<template>
  <tr
    class="pr-row"
    :class="{'has-enough-approvers' : isReadyToBeMerged, 'dont-have-enough-approvers': !isReadyToBeMerged}"
  >
    <td>
      <a
        :href="`https://github.com/${config.githubConfig.owner}/${config.githubConfig.repo}/pull/${prData.number}`"
        target="_blank"
      >{{ prData.number }}</a>
    </td>
    <td>{{ owner.role }}</td>
    <td :class="{'blink_me': isReadyToBeMerged}">{{ isReadyToBeMerged ? '✅' : '❌'}}</td>
    <td :title="prData.user.login">{{ owner.name }}</td>
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
      <table style="border-width:0px">
        <tr style="border: 1px none #dfe2e5">
          <template v-for="(currentStatusInfo, index) in prData.checkerStatuses">
            <td
              :key="index + '_avatar'"
              style="padding:0px; padding-left:5px;padding-top:10px;width:20px;display:inline-block;  border: 1px none #dfe2e5 "
              :class="{'blink_me': currentStatusInfo.state !== 'success'}"
            >
              <a
                :href="currentStatusInfo.target_url"
                :key="index + '_url'"
                target="_blank"
                :title="currentStatusInfo.context + ': ' + currentStatusInfo.description"
              >
                <img height="20" :src="currentStatusInfo.avatar_url" style="display:block">
              </a>
            </td>
            <td
              :key="index + '_status'"
              style="padding:0px;padding-top:10px; height:26px;  padding-right:5px; border: 1px none #dfe2e5"
              :class="{'blink_me': currentStatusInfo.state !== 'success'}"
            >
              <span style="font-size:10px">{{ currentStatusInfo.state === 'success' ? '✅' : '❌'}}</span>
            </td>
          </template>
        </tr>
      </table>
    </td>
    <td>{{ prData.mergeable && prData.mergeable_state === 'clean' ? '✅' : (prData.mergeable_state) }}</td>
    <td>{{ didPRGetRequiredApproves ? '✅' : '❌'}}</td>
  </tr>
</template>

<script>
import { mapState } from "vuex";
import {
  getUserWithLogin,
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
      return (
        this.hasAllCheckersPassed &&
        this.didPRGetRequiredApproves &&
        this.prData.mergeable &&
        this.prData.mergeable_state === "clean"
      );
    },
    hasAllCheckersPassed() {
      let result = true;

      if (this.prData.checkerStatuses) {
        this.prData.checkerStatuses.forEach(currentStatus => {
          result &= currentStatus.state === "success";
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
            name: getUserWithLogin(
              this.reviewersByPrID[prNumber][currentReviewer].user.login
            ).name
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
    owner() {
      return getUserWithLogin(this.prData.user.login);
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
