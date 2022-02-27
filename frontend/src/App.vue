<template>
  <div id="app-container">
    <NavbarBox :pages="pages" :selection="page" @changePage="changePage" />
    <div id="app-data">
      <NoteView v-if="page == 'NoteView'"/>
      <UploadView v-if="page == 'UploadView'" />
    </div>
  </div>
</template>

<script>
import NoteView from './components/NoteView.vue'
import UploadView from './components/UploadView.vue'
import NavbarBox from './components/NavbarBox.vue'

export default {
  name: 'App',
  components: {
    NoteView,
    UploadView,
    NavbarBox,
  },
  data:
    () => {
      return {
        page: 'NoteView',
        pages: [
          {
            title: 'Read',
            component: 'NoteView',
          },
          {
            title: 'Write',
            component: 'UploadView',
          },
        ],
      }
    },
  methods: {
    changePage(page) {
      this.page = page
    }
  }
}
</script>

<style>
#app {
  width: 60%;
  margin: auto;
  height: 100%;
  background-color: white;
  margin-top: 50px;
}
#app-data {
  padding: 1em;
}
body {
  background-color: #f0f0f0;
}
#navbar-box {
    background-color: #f0f0f0;
}
</style>
