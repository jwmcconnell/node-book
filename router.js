function route(handle, pathname) {
  console.log(`About to route a request for ${pathname}`);
  typeof handle[pathname] === 'function'
    ? handle[pathname]()
    : console.log(`No request handler found for ${pathname}`)
}

exports.route = route;