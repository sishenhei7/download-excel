<template>
  <div @click="handleDownload">
    <slot />
  </div>
</template>
<script>
import XLSX from 'xlsx'
import FileSaver from 'file-saver'
import base64ToBlob from './util'

export default {
  name: 'DownloadExcel',
  props: {
    mode: {
      type: String,
      default: 'json'
    },
    getData: {
      type: Function,
      default: null
    },
    handleError: {
      type: Function,
      default: () => (null)
    }
  },
  methods: {
    handleDownload () {
      this.$emit('loading', true)
      this.getData()
        .then((res) => {
          if (this.mode === 'json') {
            this.jsonToExcel(res)
          } else {
            this.base64ToExcel(res)
          }
        })
        .catch((err) => {
          this.handleError(err)
        })
        .finally(() => {
          this.$emit('loading', false)
        })
    },
    base64ToExcel ({ data, filename = 'myExcel.xlsx' }) {
      const mime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      FileSaver.saveAs(base64ToBlob(data, mime), filename)
    },
    jsonToExcel ({ data, chartname = 'sheet1', filename = 'myExcel.xlsx' }) {
      // export json to Worksheet of Excel
      // only array possible
      const sheet = XLSX.utils.json_to_sheet(data)

      Object.keys(sheet).forEach((item) => {
        const cell = sheet[item]
        const value = cell.v
        if (cell.t === 's' && value.indexOf('%') > -1) {
          cell.z = '0.00%'
          cell.t = 'n'
          cell.v = Number(value.substring(0, value.length - 1)) / 100
        }
      })

      // A workbook is the name given to an Excel file
      const wb = XLSX.utils.book_new()

      // add Worksheet to Workbook
      // Workbook contains one or more worksheets
      XLSX.utils.book_append_sheet(wb, sheet, chartname)

      // export Excel file
      XLSX.writeFile(wb, filename)
    }
  }
}
</script>
