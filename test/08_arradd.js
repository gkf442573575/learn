function randGenerator(n, red) {
  let sum = n * red,
    iAcc = 0
  aryRet = []
  let fSumTmp = sum
  for (let i = 0; i < n - 1; i++) {
    let iTmp = parseFloat((Math.random() * fSumTmp / 2 + 0.1).toFixed(2))
    aryRet.push(iTmp)
    fSumTmp -= iTmp
    iAcc += iTmp
  }
  let endNum = parseFloat((sum - iAcc).toFixed(2))
  aryRet.push(endNum)
  return aryRet
}

for (let index = 0; index < 30; index++) {
  console.log(randGenerator(6,1))
}
