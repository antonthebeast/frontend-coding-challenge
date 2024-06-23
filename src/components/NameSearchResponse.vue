<template>
  <el-dialog v-model="luckyDialogVisible" title="Congratulations" width="500" center @close="onDialogClose">
    <span>Congratulations, {{name}} is a lucky name!<br>You've won a prize. Will you accept it?</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="acceptPrize">Accept</el-button>
        <el-button @click="closeDialog">Reject</el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="unluckyDialogVisible" title="Sorry" width="500" center @close="onDialogClose">
    <span>I'm sorry, {{name}} is not in today's list of lucky names.</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">OK</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'NameSearchResponse',
  data() {
    return {
      luckyDialogVisible: false,
      unluckyDialogVisible: false
    }
  },
  computed: {
    ...mapState(['name', 'isLucky'])
  },
  watch: {
    isLucky(newValue) {
      if (newValue === true) {
        this.luckyDialogVisible = true;
      } else if (newValue === false) {
        this.unluckyDialogVisible = true;
      } else {
        this.luckyDialogVisible = false;
        this.unluckyDialogVisible = false;
      }
    }
  },
  methods: {
    ...mapMutations(['setName', 'setIsLucky']),
    ...mapActions(['checkName', 'addWinner']),
    closeDialog() {
      this.luckyDialogVisible = false;
      this.unluckyDialogVisible = false;
    },
    onDialogClose() {
      this.setIsLucky(null);
    },
    acceptPrize() {
      this.addWinner();
      this.setName('');
      this.luckyDialogVisible = false;
    }
  }
}
</script>

<style lang="scss">
.el-dialog {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>