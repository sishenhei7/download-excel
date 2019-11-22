<template>
  <div class="home">
    <div class="config">
      <el-radio-group
        v-model="mode"
        @change="handleModeChange"
      >
        <el-radio-button label="json"></el-radio-button>
        <el-radio-button label="base64"></el-radio-button>
      </el-radio-group>

      <el-radio-group v-model="method">
        <el-radio-button label="async">异步</el-radio-button>
        <el-radio-button label="sync">同步</el-radio-button>
      </el-radio-group>

      <download-excel
        :mode="mode"
        :get-data="() => getDownloadData()"
        :handle-error="err =>handleDownloadError(err)"
        @loading="val => isLoading = val"
      >
        <el-button
          class="btn-icon"
          :icon="isLoading ? 'el-icon-loading' : 'el-icon-download'"
        ></el-button>
      </download-excel>
    </div>

    <el-input
      class="input"
      type="textarea"
      :rows="5"
      :placeholder="`请输入${mode}字符串`"
      v-model="content">
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      mode: 'json',
      method: 'async',
      filename: 'myExcel.xlsx',
      chartname: 'sheet1',
      content: '[{"a": 1},{"a": 2}]',
      isLoading: false
    }
  },
  methods: {
    handleDownloadError () {
      const errMsg = this.content ? '下载发生错误，请稍后再试！' : '数据不能为空！'
      this.$message.error({
        showClose: true,
        message: errMsg
      })
    },
    getDownloadData () {
      if (this.method === 'sync') {
        try {
          const payload = {
            data: this.mode === 'json' ? JSON.parse(this.content) : this.content,
            filename: this.filename,
            chartname: this.chartname
          }
          return Promise.resolve(payload)
        } catch (err) {
          return Promise.reject(err)
        }
      }

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const payload = {
            data: this.mode === 'json' ? JSON.parse(this.content) : this.content,
            filename: this.filename,
            chartname: this.chartname
          }
          resolve(payload)
        }, 3000)
      })
    },
    handleModeChange (val) {
      if (val === 'json') {
        this.content = '[{"a": 1},{"a": 2}]'
      } else {
        this.content = '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'
      }
    }
  }
}
</script>
<style>
.home {
  margin: 100px auto 0;
  width: 600px;
}

.config {
  display: flex;
  justify-content: space-between;
}

.input {
  margin-top: 15px;
}
</style>
