let i = 0

a: while (true) {
  switch (i) {
    case 10:
      break a
    default:
      i += 1
  }
  console.log(i)
}
