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
      <el-col><el-input class="nameinput" v-model="nameInput" placeholder="Input 'name'" clearable type="text" :formatter="formatName" /></el-col>
    </el-row>
    <el-row>
      <el-col><el-button type="success" :disabled="isDisabled" round @click="submitName">Submit</el-button></el-col>
    </el-row>
  </div>
  <name-search-response></name-search-response>
</template>

<script>
import NameSearchResponse from '@/components/NameSearchResponse.vue'
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'

export default {
  name: 'NameSearcher',
  data() {
    return {
      sorryDialogVisible: false,
    }
  },
  components: {
    NameSearchResponse,
  },
  computed: {
    ...mapState(['name']),
    nameInput: {
      get() {
        return this.name
      },
      set(value) {
        this.setName(value)
      }
    },
    isDisabled() {
      return this.name.trim().length < 3;
    }
  },
  methods: {
    ...mapActions(['checkName']),
    ...mapMutations(['setName']),
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