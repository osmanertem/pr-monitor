<template>
  <div id="app">
    <h2>PR Monitor</h2>
    <p>
      <span>https://github.com/</span>
      <input type="text" :value="config.githubConfig.owner" @change="onGithubOwnerChange">
      <span>/</span>
      <input type="text" :value="config.githubConfig.repo" @change="onGithubRepoChange">
    </p>
    <MonitorTable id="monitor-table" :hideQA="hideQA" :hideSW="hideSW" />
    <p>
      <span class="config-param-title">Hide QA: </span>
      <input type="checkbox" v-model="hideQA">
      <span class="config-param-title">Hide SW: </span>
      <input type="checkbox" v-model="hideSW">
      <span class="config-param-title">username: </span>
      <input type="text" :value="config.githubConfig.username" @change="onGithubUsernameChange">
      <span class="config-param-title">page reload in sec: </span>
      <input type="text" :value="parseInt(config.pageReloadInMs/1000)" @change="onPageReloadChanged" style="width:50px"> 
      <span class="config-param-title">access_token: </span>
      <input type="text" :value="config.githubConfig.apiAccessToken" @change="onAccessTokenChanged" style="width:300px">
    </p>
    <p>
      <a href="https://github.com/osmanertem/pr-monitor#requirements" >How to get access token? </a>
    </p>
  </div>
</template>

<script>
import MonitorTable from "./components/MonitorTable.vue";
import { setInterval } from "timers";
import { mapState } from "vuex";

export default {
  name: "app",
  data() {
    return {
      titleInterval: undefined,
      hideQA: localStorage["hideQA"] === "true",
      hideSW: localStorage["hideSW"] === "true",
    };
  },
  components: {
    MonitorTable
  },
  mounted() {
    setInterval(() => {
      this.$store.dispatch("fetchPRList");
    }, parseInt(this.config.pageReloadInMs));
  },
  computed: {
    ...mapState(["config"])
  },
  methods: {
    onAccessTokenChanged(e) {
      let copyConfig = JSON.parse(localStorage["config"]);
      copyConfig.githubConfig.apiAccessToken = e.srcElement.value;
      localStorage["config"] = JSON.stringify(copyConfig);
      location.reload();
    },
    onGithubOwnerChange(e) {
      let copyConfig = JSON.parse(localStorage["config"]);
      copyConfig.githubConfig.owner = e.srcElement.value;
      localStorage["config"] = JSON.stringify(copyConfig);
      location.reload();
    },
    onGithubRepoChange(e) {
      let copyConfig = JSON.parse(localStorage["config"]);
      copyConfig.githubConfig.repo = e.srcElement.value;
      localStorage["config"] = JSON.stringify(copyConfig);
      location.reload();
    },
    onGithubUsernameChange(e) {
      let copyConfig = JSON.parse(localStorage["config"]);
      copyConfig.githubConfig.username = e.srcElement.value;
      localStorage["config"] = JSON.stringify(copyConfig);
      location.reload();
    },
    onPageReloadChanged(e) {
      let copyConfig = JSON.parse(localStorage["config"]);
      copyConfig.pageReloadInMs = parseInt(e.srcElement.value) * 1000;
      localStorage["config"] = JSON.stringify(copyConfig);
      location.reload();
    }
  },
  watch: {
    hideQA() {
      console.log(this.hideQA); // eslint-disable-line
      localStorage["hideQA"] = this.hideQA;
    },
    hideSW() {
      localStorage["hideSW"] = this.hideSW;
    },
  }
};
</script>

<style>
.config-param-title {
  margin-left:10px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

#monitor-table {
  margin-left: auto;
  margin-right: auto;
}
.content {
  max-width: unset !important;
  padding:unset !important;
}

table {
  border-width: 0px;
  display:unset;
}
th td {
  border: 1px none #dfe2e5 !important;
}
tr {
  border: 1px none #dfe2e5 !important;
}
</style>
