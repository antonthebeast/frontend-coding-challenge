<template>
    <div class="container">
        <el-badge :value="winners.length + ' / ' + maxWinners" class="item" color="green" type="primary" style="width: 100%;">
        <el-card style="width: 100%;">
            <template #header>
            <div class="card-header">
                <span>Winners</span>
            </div>
            </template>
            <p v-for="(winner, index) in winners" :key="index">{{ winner }}</p>
        </el-card>
    </el-badge>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
    name: 'WinnersList',
    computed: {
        ...mapState(['winners', 'maxWinners']),
    }
}
</script>

<style scoped>
.container {
    width: 50%;
}
.el-badge {
    --el-badge-size: 40px;
}
</style>