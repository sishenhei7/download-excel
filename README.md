# download-excel

> to make download excel more easily. Support base64 and json 下载Excel组件

[demo](https://sishenhei7.github.io/download-excel/)

## Getting Started

### install

To begin with, just install download-excel:

```
npm i download-excel -s
```

Then，register it in ```main.js```:

```
Vue.use(DownloadExcel)
```

### params

| param    | type   |  default  |  description |
| :----: | :-----:  | :----: |  :---: |
| mode | String | 'json' | 'json' or 'base64' |
| getData | Function | null | a function which get data and return a promise |
| handleError | Function | null | a function which handle error |

### examples

You can use DownloadExcel as a vue component anywhere like this:

```
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
```

For more usage, please check [demo-source-code](https://github.com/sishenhei7/download-excel/tree/master/demo)
