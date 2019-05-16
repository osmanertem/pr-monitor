<template>
  <div id="app">
    <h2>PR Monitor</h2>
    <p>
      <span>https://github.com/</span>
      <input type="text" :value="config.githubConfig.owner" @change="onGithubOwnerChange">
      <span>/</span>
      <input type="text" :value="config.githubConfig.repo" @change="onGithubRepoChange">
    </p>
    <p>
      <span>username: </span>
      <input type="text" :value="config.githubConfig.username" @change="onGithubUsernameChange">
      <span>page reload in ms:</span>
      <input type="text" :value="config.pageReloadInMs" @change="onPageReloadChanged" style="width:50px"> 
      <span>access_token: </span>
      <input type="text" :value="config.githubConfig.apiAccessToken" @change="onAccessTokenChanged" style="width:300px">
    </p>
    <MonitorTable id="monitor-table"/>
  </div>
</template>

<script>
import MonitorTable from "./components/MonitorTable.vue";
import { setInterval, clearInterval } from "timers";
import { mapState } from "vuex";

export default {
  name: "app",
  data() {
    return {
      titleInterval: undefined,
    };
  },
  components: {
    MonitorTable
  },
  mounted() {
    if (this.titleInterval) {
      clearInterval(this.titleInterval);
    }

    this.titleInterval = setInterval(() => {
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
      copyConfig.pageReloadInMs = parseInt(e.srcElement.value);
      localStorage["config"] = JSON.stringify(copyConfig);
      location.reload();
    }
  }
};
</script>

<style>
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
</style>
