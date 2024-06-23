<template>
    <div class="container" v-if="winnersList.length > 0">
        <el-card style="width: 100%;">
            <template #header>
            <div class="card-header">
                <span>Winners</span>
            </div>
            </template>
            <p v-for="winner in winnersList">{{ winner }}</p>
        </el-card>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
    name: 'WinnersList',
    computed: {
        ...mapState(['winners']),
        winnersList: {
            get() {
                return this.winners
            },
        }
    }
}
</script>

<style scoped>
.container {
    width: 50%;
}
</style>