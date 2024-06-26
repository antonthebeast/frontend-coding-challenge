<template>
  <el-dialog v-model="sorryDialogVisible" title="Sorry" width="500" center @close="closeDialog">
    <span>I'm sorry, {{ name }} has already received their prize today!</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">OK</el-button>
      </div>
    </template>
  </el-dialog>
  <div class="container">
    <el-row>
      <el-col>Check that your name is lucky today:</el-col>
    </el-row>
    <el-row>
      <el-col><el-input v-model="nameInput" placeholder="Input 'name'" clearable type="text" :formatter="formatName" class="nameinput" @keyup.enter="submitName" /></el-col>
    </el-row>
    <el-row>
      <el-col><el-button type="success" :disabled="isDisabled" round @click="submitName">Submit</el-button></el-col>
    </el-row>
  </div>
  <name-search-response></name-search-response>
</template>

<script>
import { ElNotification } from 'element-plus'
import NameSearchResponse from '@/components/NameSearchResponse.vue'
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'

const open_error = (message) => {
  ElNotification({
    title: 'Error',
    message: message,
    type: 'error',
  })
}

export default {
  name: 'NameSearcher',
  components: {
    NameSearchResponse,
  },
  data() {
    return {
      sorryDialogVisible: false,
    }
  },
  computed: {
    ...mapState(['name', 'winners', 'maxWinners', 'error']),
    nameInput: {
      get() {
        return this.name
      },
      set(value) {
        this.setName(value)
      }
    },
    isDisabled() {
      return this.name.trim().length < 3 || this.winners.length >= this.maxWinners;
    }
  },
  methods: {
    ...mapActions(['checkName']),
    ...mapMutations(['setName', 'setError']),
    ...mapGetters(['isWinner']),
    submitName() {
      if (!this.isDisabled) {
        if (this.isWinner()) {
          this.sorryDialogVisible = true;
        } else {
          this.checkName()
        }
      }
    },
    formatName(value) {
      return value.replace(/[^a-zA-Z]/g, '');
    },
    closeDialog() {
      this.sorryDialogVisible = false;
    }
  },
  watch: {
    error(newError) {
      if (newError) {
        open_error(newError);
        this.setError(null)
      }
    }
  }  
}
</script>

<style scoped lang="scss">
.container {
  width: 50%;
}
.el-row {
  margin-bottom: 8px;
}
</style>