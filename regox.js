
RegExp.prototype.test2 = function(str) {
  return !!this.exec(str)
}

String.prototype.search2 = function(re) {
  let oldlastindex = re.lastIndex
  re.lastIndex = 0
  let match = re.exec(this)
  re.lastIndex = oldlastindex
  if(match == null) {
    return -1
  } else {
    return match.index
  }
}

String.prototype.match2 = function(re) {
  var str = this
  if(!re.global) {
    return re.exec(str)
  }
  let result = []
  let old = re.lastIndex
  re.lastIndex = 0
  while((match = re.exec(str))) {
    result.push(match[0])
  }
  re.lastIndex = old
  return result
}
