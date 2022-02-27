<template>
    <div id="navbar-box">
        <div class="pageItem" 
        v-for='page of pages' 
        :key='page' 
        :class='{selected: selection == page.component}' 
        @click="this.$emit('changePage', page.component)">{{ page.title }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavbarBox',
    props: ['pages', 'selection'],
    components: {
    },
}
</script>

<style scoped>
.pageItem {
    cursor: pointer;
    list-style: none;
    display: inline-block;
    padding: 10px;
    margin: 0;
    background-color: #f6f6f6;
}
.pageItem:hover {
    background-color: #ddd;
}
.selected {
    background-color: white;
}
</style>