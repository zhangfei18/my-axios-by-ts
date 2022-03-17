let cookie = {
  read(name: string): string | null {
    let reg = new RegExp('(^|;\\s*)(' + name + ')=([^;]*)')
    let match = document.cookie.match(reg)
    return match ? decodeURIComponent(match[3]) : null
  }
}
export default cookie
