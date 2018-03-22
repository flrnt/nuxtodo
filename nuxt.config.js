module.exports = {
  mode: 'universal',
  head: {
    title: 'Todo List',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'TODO List' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#3B8070' },
  css: [
    'todomvc-app-css/index.css'
  ],
  router: {
    linkActiveClass: 'selected'
  },
  build: {
    extend(config, ctx) {
    }
  }
}
