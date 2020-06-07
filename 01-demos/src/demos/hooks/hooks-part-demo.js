/**
 * 必须要react和react-dom 16.8以上
 */

import React, {
  memo,
  createContext,
  forwardRef,

  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
  useImperativeHandle
} from 'react'

const TestContext = createContext('default')

const Comp = memo((props) => {
  useEffect(() => {
    console.log('comp updated')
  })

  const updateValue = () => {
    props.onChick(props.name + '1')
  }

  return <button onClick={updateValue}>button {props.name}</button>
})

const ContextComp = forwardRef((props, ref) => {
  const [name] = useState('123')
  const context = useContext(TestContext)

  useEffect(() => {
    console.log('context comp updated')
  })

  useImperativeHandle(ref, () => ({
    method() {
      console.log('method invoked')
    }
  }))

  return <p>{context} {name}</p>
})

export default function App() {
  const [name, setName] = useState('jokcy')
  const [compName, setCompName] = useState('compName')

  const ref = useRef()

  useEffect(() => {
    console.log('component update')

    ref.current.method()

    // api.sub

    return () => {
      console.log('unbind')
    }
  }, [name]) // 去掉这个数组就会每次都调用

  const compCallback = useCallback((value) => {
    setCompName(value)
  }, [compName]) // 演示没有`[compName]`每次Comp都会调用effect

  return (
    <>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <Comp name={compName} onClick={compCallback} />
      <TestContext.Provider value={name}>
        <ContextComp ref={ref} />
      </TestContext.Provider>
    </>
  )
}
