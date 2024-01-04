export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    this.handle()
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]

    document.body.classList.remove('home', 'universe', 'exploration');

    switch (pathname) {
      case '/universe':
        document.body.classList.add('universe');
        break;
      case '/exploration':
        document.body.classList.add('exploration');
        break;
      default:
        document.body.classList.add('home')
        break;
    }

    fetch(route)
      .then((data) => data.text())
      .then(html => {
        document.querySelector('#app').innerHTML = html
      })
  }
}
