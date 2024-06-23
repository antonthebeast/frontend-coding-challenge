<template>
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
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'NameSearcher',
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
    submitName() {
      if (!this.isDisabled) {
        this.checkName()
      }
    },
    formatName(value) {
      return value.replace(/[^a-zA-Z]/g, '');
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