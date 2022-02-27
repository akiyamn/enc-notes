<template>
    <div id="upload-view">
        <input class="normal-entry" placeholder="some_filename" type="text" v-model="filename"/>
        <textarea v-model="message" placeholder="Put your message here. 💩"></textarea>
        <input class="password-entry" placeholder="Password" type="password" v-model="key"/>
        <button class="send-button" @click="upload">Upload</button>
        <SuccessBox :success="created" :failure="error" :bad-message="'Unable to create new note. ' + errorMessage" :good-message="'Note has been created! 🎉'"/>
    </div>
</template>

<script>
import SuccessBox from './SuccessBox.vue'

export default {
    name: 'UploadView',
    components: {
        SuccessBox,
    },
    data() {
        return {
            message: "",
            filename: "",
            key: "",
            error: false,
            errorMessage: "",
            created: false,
        };
    },
    methods: {
          upload() {
            fetch(this.$apiURL + "/save", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data: this.message,
                filename: this.filename,
                key: this.key,
              }),
            })
              .then((response) => {
                // get text inside response
                this.created = response.status == 201
                this.error = !this.created
                response.text().then((output) => {
                    this.errorMessage = response.statusText + ": " + output
                  console.log(output);
                });
              })
              .catch((err) => {
                console.error(err);
                this.error = true;
                this.errorMessage = err.message;
              });
        },
    },
    mounted() {
        this.error = false;
        this.created = false;
        // Set the filename to the current date and time
        this.filename = new Date().toISOString().replace(/[-:.]/g, "")
        // const today = new Date()
        // this.filename = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        // Get the minutes with a padded zero
        // const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()
        // this.filename = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate() + "_"  + today.getHours() + "." + minutes
    }
}
</script>

<style scoped>
textarea {
    width: 100%;
    height: 100%;
}
</style>