const BASE_URL = process.env.NODE_ENV === 'production' ? '/download-excel/' : '/'

module.exports = {
  publicPath: BASE_URL,
  productionSourceMap: false
}
