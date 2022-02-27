<template>
  <tr v-on:click="this.$emit('text', filename)" :style="{backgroundColor: this.calculateGreenness()}" > <!-- :class="this.chooseRecencyClass()" -->
    <td class="name"> {{ filename }}.{{ extension }} </td> <td class="date"> {{ new Date(created).toLocaleString() }}</td>
  </tr>
</template>

<script>
export default {
  name: 'NoteLink',
  props: ["filename", "extension", "created"],
  emits: ["text"],
  data() {
    return {};
  },
  methods: {
    chooseRecencyClass() {
      const now = new Date();
      const diff = now - new Date(this.created);
      const oneDay = 1000 * 60 * 60 * 24;
      if (diff < oneDay) { // A day
        return "today";
      } else if (diff < 2 * oneDay) { // Two days
        return "yesterday";
      } else if (diff < 7 * oneDay) { // Seven days
        return "recent";
      }
      return "";
    },
    calculateGreenness() {
      // Get the number of days old this note is
      const now = new Date();
      const diff = now - new Date(this.created);
      const oneDay = 1000 * 60 * 60 * 24;
      const daysOld = Math.floor(diff / oneDay);
      // Calculate the greenness of the note
      const greenness = Math.min(Math.max(0, (daysOld / 7)), 1);
      // Return the color as a string
      return "rgb(" +  Math.round(128 * greenness + 127) + ", " + 255 + ", " + Math.round(128 * greenness + 127) + ")";
    }
  },
}
</script>

<style scoped>
tr {
  cursor: pointer;
}
.name {
  text-align: left;
}
.date {
  text-align: right;
}
.today {
  background-color: #97e95d;
}
.yesterday {
  background-color: #bbec98;
}
.recent {
  background-color: #e7ffd6;
}
</style>
