import React from 'react'
import ReactDOM from 'react-dom'

const portalElm = document.createElement('div')
document.body.appendChild(portalElm)

class App extends React.Component {
  state = {
    show: true,
  }

  handleClick = () => {
    this.setState({
      show: !this.state.show,
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>click me </button>
        {this.state.show ? (
          <div>{ReactDOM.createPortal(<span>123</span>, portalElm)}</div>
        ) : null}
      </div>
    )
  }
}
export default App
