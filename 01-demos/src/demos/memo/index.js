import React, { memo } from 'react'

export default memo(
  function TestMemo() {
    return <span>123</span>
  },
  () => false,
)
