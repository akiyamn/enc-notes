<template>
  <div id="note-view">
    <pre class="text-output" :class="{error}">{{ text }}</pre>
    <input class="password-entry" type="password" @change="requestText(currentFile)" placeholder="Password" v-model="key"/>
      <table class="files">
      <FileLink
        v-for="file of directory"
        :key="file"
        :filename="file.filename"
        :extension="file.extension"
        :created="file.created"
        :class="{selected: currentFile == file.filename}"
        @text="requestText(file.filename)"
      ></FileLink>
      </table>
  </div>
</template>

<script>
import FileLink from './FileLink.vue'

export default {
  name: 'NoteView',
  components: {
    FileLink,
  },
  data() {
    return {
      text: "Your message will appear here. 💩",
      currentFile: "",
      key: "unchi",
      directory: [],
      error: false,
    };
  },
  methods: {
    requestText(filename) {
      fetch(this.$apiURL + "/load", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: this.key,
          filename: filename,
        }),
      })
        .then((response) => {
          console.log(response);
          response.text().then((text) => {
            console.log(text);
            this.text = text;
            this.currentFile = filename;
            this.error = response.status != 200
          });
        })
        .catch((err) => {
          this.error = true;
          console.log(err)
        });
    },
  },
  mounted() {
    fetch(this.$apiURL  + "/list", {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        console.log(response);
        response.text().then((text) => {
          this.directory = JSON.parse(text);
          console.log(text);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-output {
  min-height: 2em;
  border: none;
  font-size: 12px;
  font-family: monospace;
  padding: 0.5em;
  margin: 0 0 0.5em 0;
  background-color: #f6f6f6;
  display: block;
}
.selected {
  font-weight: bold;
}
.error {
  color: red;
}
.files {
  width: 100%;
  border-collapse: collapse;
	margin-top: 0.5em;
}
</style>
