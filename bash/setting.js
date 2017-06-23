const setting = {
  path: './src/',
  dev: {
    repUrl: 'http://6city.mu.gg/static/',
    path: 'dev',
    http: 'http://',
  },
  test: {
    repUrl: 'http://6city.mu.gg/static/',
    path: 'test',
    http: 'http://',
  },
  build: {
    repUrl: 'https://m.6city.com/sp/',
    path: './build',
    http: 'https://',
  },
  template: '.wxml',
  watchFiles: ['src/**/*.*'],
  appScss: 'src/app.scss',
}
module.exports = setting