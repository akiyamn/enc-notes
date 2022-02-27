<template>
    <div 
    v-if="success || failure"
    :class="{good: success, bad: failure}"
    class="successBox">
        {{ success ? goodMessage : badMessage }}
    </div>
</template>

<script>
export default {
    name: "SuccessBox",
    props: ["success", "failure", "good-message", "bad-message"],
    data() {
        return {
            text: "",
        };
    },
    methods: {
    },
}
</script>

<style scoped>
.successBox {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 2em;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
}
/* .successBox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
} */
.good {
    background-color: rgba(223, 240, 216, 0.8);
}
.bad {
    background-color: rgba(242, 222, 222, 0.8);
}
</style>