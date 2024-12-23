const isStaticFile = (url, STATIC_FILES) => {
    const requestUrl = new URL(url, self.location.origin)
    return STATIC_FILES.includes(requestUrl.pathname)
}