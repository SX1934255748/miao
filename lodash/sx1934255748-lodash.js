
var  sx1934255748 = {
  chunk: function(array, size) {
    let result = []
    let count = 0
    let len = array.length
    let k = array.length / size
    for(let i = 0; i < k; i++){
      let ary_i = []
      for(let j = size * i; j < size * (i+1) && j < len; j++){
        ary_i.push(array[j])
      }
      result[i] = ary_i
    }
    return result
  },

  compact: function(array) {
    let result = []
    for(let i in array){
      if(array[i]){
        result.push(array[i])
      }
    }
    return result
  },

  difference: function(array, ...values) {
    let result = []
    let map = new Map()
    for(let i in values){
      for(let j in values[i]){
        map.set(values[i][j], 1)
      }
    }
    for(let i in array){
      if(!map.has(array[i])){
        result.push(array[i])
      }
    }
    return result
  },

  differenceBy: function(array, values, _method) {
    let result = []
    let map = new Map()
    values = [values]
    for(let i in values){
      for(let j in values[i]){
        map.set(values[i][j][_method], 1)
      }
    }
    for(let i in array){
      if(!map.has(array[i][_method])){
        result.push(array[i])
      }
    }
    return result
  },

  drop: function(array, n = 1){
    let result = []
    let len = array.length
    if(len <= n){
      return result
    }

    for(let i = n; i < len; i++){
      result.push(array[i])
    }
    return result
  },

  dropRight: function(array, n = 1){
    let result = []
    let len = array.length
    if(len <= n){
      return result
    }
    for(let i = 0; i < len-n; i++){
      result.push(array[i])
    }
    return result
  },
  fill: function(array, value, start = 0, end = array.length) {
    let result = []
    for(let i in array) {
      if(i < end && i >= start) {
        result.push(value)
      } else {
        result.push(array[i])
      }
    }
    return result
  },
  findIndex: function(ary, predicate, fromindex = 0){
    function isObjMatch(obj1, obj2) {
      for(let key in obj2) {
        if(obj1[key] != obj2[key]) {
          return false
        }
      }
      return true
    }
    function isAryMatch(obj1, ary2) {
      if(obj1[ary2[0]] != ary2[1]) {
        return false
      }
      return true
    }
    let obj
    if(typeof predicate == 'function') {
      for(let i = fromindex; i < ary.length; i++) {
        obj = ary[i]
        if(predicate(obj)) {
          return i
        }
      }
      return -1
    } else if(Array.isArray(predicate)) {
      for(let i = fromindex; i < ary.length; i++) {
        obj = ary[i]
        if(isAryMatch(obj, predicate)) {
          return i
        }
      }
      return -1
    } else if(typeof predicate == 'object') {
      for(let i = fromindex; i < ary.length; i++) {
        obj = ary[i]
        if(isObjMatch(obj, predicate)) {
          return i
        }
      }
      return -1
    } else {
      for(let i = fromindex; i < ary.length; i++) {
        obj = ary[i]
        if(obj[predicate]) {
          return i
        }
      }
      return -1
    }
  },
  findLastIndex: function() {

  },
  flatten: function(ary) {
    return ary.reduce((result, value) => result.concat(value), [])
  },
  flattenDeep: function(ary) {

    ary.forEach(element => {

    });
  },
  isSameValueZero(x, y) {
    if(typeof x !== typeof y) {
      return false
    }
    if(x == y) {
      return true
    }
    if(typeof x === 'number' && isNaN(x) && isNaN(y)) {
      return true
    }
    return false
  },
  ArraySameVal(ary1, ary2, iteratee = it => it) {
    let set2 = new Set(ary2.map(iteratee))
    return ary1.filter( it => set2.has(iteratee(it)))
  },
  intersection(...ary) {
    return ary.reduce((ary1, ary2) => this.ArraySameVal(ary1, ary2))
  },
  intersectionBy: function(...ary) {
    let iteratee = ary.pop()
    if(typeof iteratee === 'string'){
      iteratee = it => it[iteratee]
    }
    return ary.reduce((ary1, ary2) => this.ArraySameVal(ary1, ary2, iteratee))
  },
  isSameVal(ary1, ary2, iteratee) {
    return ary1.filter(it1 => {
      let isSame = false
      ary2.forEach(it2 => {
        if(iteratee(it1, it2)) {
          isSame =  true
        }
      })
      return isSame
    })
  },
  identity(val) {
    return val
  },
  intersectionWith: function(...ary) {
    let iteratee = ary.pop()
    if(typeof iteratee === 'string'){
      let str = iteratee
      iteratee = (it1, it2) => it1[str] === it2[str]
    }
    return ary.reduce((ary1, ary2) => this.isSameVal(ary1, ary2, iteratee))
  },
  join(ary, str = ',') {
    return ary.reduce((a, b) => "" + a + str + b)
  },
  property(str) {
    let path = str.split('.')
    return (obj) => {
      let result = obj
      for(let i = 0; i < path.length; i++) {
        if(result[path[i]] == null) {
          return null
        }
        result = result[path[i]]
      }
      return result
    }
  },
  isMath(obj1, obj2) {
    if(obj1.length != obj2.length) {
      return false
    }
    for(let i in obj1) {
      if(obj1[i] !== obj2[i]){
        if(typeof obj1[i] != 'object') {
          return false
        } else {
          return this.isMath(obj1[i], obj2[i])
        }
      }
    }
    return true

  },
  mathesProperty(path, srcVal) {
    return (obj) => {
      return this.isMath(this.property(path)(obj), srcVal)
    }
  },
  bind(func, thisArg, ...fixedArgs) {

    return function(...args) {
      var bindedArgs = [...fixedArgs]
      let j = 0
      for(let i = 0; i < bindedArgs.length; i++) {
        if(bindedArgs[i] === _) {
          bindedArgs[i] = args[j++]
        }
      }
      bindedArgs.push(...args.slice(j))
      return func.call(thisArg, ...bindedArgs)
    }

  },
  matches(obj1) {
    return function(obj2) {
      return isMath(obj1, obj2)
    }
  },
  ary(func, n = func.length) {
    let args = new Array(n)
    return function(...args) {
      return func.apply(this, args)
    }
  },
  unary(func) {
    return this.ary(func, 1)
    // return function(...arg) {
    //   return func.apply(this, arg.slice(0, 1))
    // }
  },
  negate(func) {
    return function(...args) {
      return !func(...args)
    }
  },
  spread(func) {
    return function(ary) {
      return func(...ary)
    }
  },
  before(n, func) {
    var i = 0
    var result
    return function(...args) {
      if(i == n) {
        return result
      }
      func(...args)
      i++
    }
  },
  memoize(func) {
    var map = new Map()
    return function(val) {
      if(map.has(val)) {
        return map.get(val)
      }
      var result = func(val)
      map.set(val, result)
      return result
    }
  },
  swap(ary, a, b) {
    [ary[a], ary[b]] = [ary[b], ary[a]]
  },
  shuffle(ary) {
    for(let i in ary) {
      let j = Math.round(Math.random() * (ary.length - 1))
      this.swap(ary, i, j)
    }
  },
  last(ary) {
    return ary[ary.length-1]
  },
  lastIndexof(ary, value, fromIndex = ary.length-1) {
    for(let i = fromIndex; i >= 0; i--) {
      if(ary[i] == value) {
        return i
      }
    }
    return -1
  },
  nth(ary, n = 0) {
    if(n >= 0) {
      return ary[n]
    } else {
      return ary[ary.length+n]
    }
  },
  pull(ary, ...values) {
    return ary.filter(it => {
      let bool = true
      values.forEach(value => {
        if(!this.isSameValueZero(it, value)) {
          bool = false
        }
      })
      return bool
    })
  },
  pullAll(ary, values) {
    return this.pull(ary, ...values)
  },
  iteratee(){

  },
  pullAllBy(ary, values, iteratee = this.identity) {

    iteratee = this.iteratee(iteratee)
    return ary.filter(it => {
      let bool = true
      values.forEach(value => {
        if(!this.isSameValueZero(iteratee(it), iteratee(value))) {
          bool = false
        }
      })
      return bool
    })
  },











}

function MultiplyorUnitFailure(message) {
  this.message = message
  this.stack = (new Error()).stack
}
MultiplyorUnitFailure.prototype = Object.create(Error.prototype)
MultiplyorUnitFailure.prototype.name = 'MultiplyorUnitFailure'

function primitiveMultiply(a, b) {
  if(Math.random() > .5) {
    return a * b
  } else {
    throw new MultiplyorUnitFailure()
  }
}

function multiple(a, b) {
  try{
    return primitiveMultiply(a, b)
  } catch(e) {
    if(e.name == 'MultiplyorUnitFailure'){
      return multiple(a, b)
    }
  }
}



// function unary(func) {

// }

// function TextCell(text) {
//   this.lines = text.split('/n')
// }

// TextCell.prototype.minWidth = function() {
//   return this.lines.map(it => it.length).reduce((a, b) => a > b ? a : b)
// }

// TextCell.prototype.minHeight = function() {
//   return this.lines.length
// }
// function repeat(string, times) {
//   var result = ''
//   for(let i = 0; i < times; i++) {
//     result += string
//   }
//   return result
// }
// TextCell.prototype.draw = function(width = this.minWidth(), height = this.minHeight()) {
//   var result = []
//   for(let i = 0; i < height; i++) {
//     var val = this.lines[i] || ''
//     var space = width - val.length
//     result.push(val + repeat(' ', space))
//   }
//   return result
// }

// var rows = [
//   [new TextCell('sjdkfl/nssdjf/nsdj/nsjdfks/njalkj/n999'), new TextCell('sjdkfl/nssdjf'), new TextCell('ssdjf/nsdfjksldfj'), new TextCell('sjdkfl/nssdjf/nsdfjksldfj')],
//   [new TextCell('345sjdkfl/nssdjf/nsdj'), new TextCell('343sjdkfl/nssdjf'), new TextCell('433ssdjf/nsdfjksldfj'), new TextCell('343434sjdkfl/nssdjf/nsdfjksldfj')],
// ]

// function rowsHeight(rows) {
//   return rows.map(row => Math.max(...row.map(cell => cell.minHeight())))

//   // var result = []
//   // rows.forEach( row => {
//   //   var maxHeight = row.map(it => it.minHeight()).reduce((a, b) => a > b ? a : b)
//   //   result.push(maxHeight)
//   // })
//   // return result
// }

// function colsWidth(rows) {
//   return rows[0].map((_, idx) => Math.max( ...rows.map(row => row[idx].minWidth()) ) )
// }

// function Vector(x, y) {
//   this.x = x
//   this.y = y
// }

// Vector.prototype.plus = function(b) {
//   let x = this.x + b.x
//   let y = this.y + b.y
//   return new Vector(x, y)
// }
// Vector.prototype.minus = function(b) {
//   let x = this.x - b.x
//   let y = this.y - b.y
//   return new Vector(x, y)
// }

// function Complex(real, imag) {
//   this.real = real
//   this.imag = imag
// }

// Complex.prototype.plus = function(b) {
//   return new Complex(this.real + b.real, this.imag + b.imag)
// }


// Complex.prototype.minus = function(b) {
//   return new Complex(this.real - b.real, this.imag - b.imag)
// }

// Complex.prototype.mul = function(b) {
//   let real = this.real * b.real - this.imag * b.imag
//   let imag = this.real * b.imag + this.imag * b.real
//   return new Complex(real, imag)
// }
// Complex.prototype.div = function(b) {
//   let f = b.real * b.real + b.imag * b.imag
//   let real = (this.real * b.real + this.imag * b.imag) / f
//   let imag = (this.real * b.imag - this.real * b.imag) / f
//   return new Complex(real, imag)
// }



// 做完
// https://leetcode.com/problems/same-tree/
// https://leetcode-cn.com/problems/symmetric-tree/
// https://leetcode.com/problems/minimum-depth-of-binary-tree
// https://leetcode.com/problems/maximum-depth-of-binary-tree
// https://leetcode.com/problems/invert-binary-tree
// https://leetcode.com/problems/binary-tree-level-order-traversal
// https://leetcode.com/problems/binary-tree-level-order-traversal-ii
// https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal
// https://leetcode.com/problems/merge-two-binary-trees



// 在做
// https://leetcode.com/problems/construct-string-from-binary-tree

// https://leetcode.com/problems/binary-tree-inorder-traversal



/**
 *
https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal
https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal
https://leetcode.com/problems/flatten-binary-tree-to-linked-list
https://leetcode.com/problems/binary-tree-preorder-traversal
https://leetcode.com/problems/serialize-and-deserialize-binary-tree
https://leetcode.com/problems/sum-of-left-leaves
https://leetcode.com/problems/print-binary-tree
https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal
 */







// function aryToTree(ary, rootPos = 0) {
//   if(ary.length == 0) {
//     return null
//   }
//   if(ary[rootPos]) {
//     return null
//   }


//   let tree = createTreeNode(ary[rootPos])
//   tree.left = aryToTree(ary, leftPos)
//   tree.right = aryToTree(ary, rightPos)

// }
// function treeToAry(tree, rootPos = 0, ary = []) {
//   if(!tree) {
//     return ary
//   }
//   ary[rootPos] = tree.val
//   let leftPos = rootPos * 2 + 1
//   let rightPos = rootPos * 2 - 1
//   treeToAry(tree.left, leftPos, ary)
//   treeToAry(tree.right, rightPos, ary)
//   return ary


// }

// function condensedAryToTree(ary) {
//   let tree = {}
//   for(let i = 0; i < ary.length; i++) {


//   }


// }







//
// function jiewei(ary) {
//   return ary.reduce(
//     (result, value) => {
//       if(Array.isArray(value)){
//         return result.concat(jiewei(value))
//       } else {
//         result.push(value)
//         return result
//       }
//     }
//     , [])
// }
















// function geat(obj){
//   for(let i in obj){
//     if(!obj.has(obj[i])) {
//       return obj[i]
//     }
//   }

// }

// function keyby(array, propName){

// }

// function qSort(ary, start = 0, end = ary.length){
//   if(start >= end){
//     return ary
//   }
//   let i = ary[~~(Math.random() * (end - start) + start)]



// }


// function quickSort(ary){
//   if(ary.length < 2){
//     return ary.slice()
//   }
//   let i = ary[~~(Math.random() * ary.length)]

//   let min = []
//   let deng = []
//   let max = []

//   ary.forEach(num => {
//     if(num > i){
//       max.push(num)
//     } else if (num == i) {
//       deng.push(num)
//     } else {
//       min.push(num)
//     }
//   })
//   let left = quickSort(min)
//   let right = quickSort(max)
//   return [...left, deng, ...right]

// }

