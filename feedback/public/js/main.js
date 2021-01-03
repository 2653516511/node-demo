window.alert('hello world')

function (plugin: Function | Object) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return
    }
    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      // 实际执行插件的install方法
      plugin.install.apply(plugin, args)
    } else {
      plugin.apply(null, args)
    }
    plugin.installed = true
    return this
  }