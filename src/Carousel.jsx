import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './Carousel.css'

class Carousel extends PureComponent {
  constructor(props) {
    super(props)
    // 鼠标按下时的坐标
    this.downX = 0
    this.moveX = 0
    // 鼠标是否按下
    this.isDown = false
    this.state = {
      curIndex: 0,
      x: 0-props.width,
    }
  }

  onMouseDown = (e) => {
    e.stopPropagation()
    console.log('down', e.clientX)
    this.isDown = true
    this.downX = e.clientX
  }

  calcShouldMove = (x) => {
    let remain = x%this.props.width
    if (remain > 200) {
      return x + this.props.width - remain
    } else if (remain > 0) {
      return x - remain
    } else if (remain < -200) {
      return x - remain - this.props.width
    } else {
      return x - remain
    }
  }

  calcCurrentIndex = (offset) => {
    let ratio = offset/this.props.width
    let count = React.Children.count(this.props.children)
    if (ratio === 0 || ratio === (-count)) return count - 1
    if (ratio === -1 || ratio === (-count - 1)) return 0
    return 0 - ratio - 1
  }

  onMouseUp = (e) => {
    this.isDown = false
    let shouldMove = this.calcShouldMove(this.state.x)
    requestAnimationFrame(() => this.moveRemain(Math.floor(this.state.x),Math.floor(shouldMove)))
  }

  moveRemain = (curX, descX) => {
    if (curX === descX) {
      this.setState({
        x: curX,
        curIndex: this.calcCurrentIndex(curX),
      })
      return
    }
    let distance = descX - curX
    let stepLen = 1
    if (distance > 0)
      stepLen = 10
    else
      stepLen = -10
    curX += stepLen
    if ((stepLen > 0 && curX >= descX) || (stepLen < 0 && curX <= descX))
      curX = descX
    this.setState({
      x: curX,
      curIndex: this.calcCurrentIndex(curX),
    })
    requestAnimationFrame(() => this.moveRemain(curX, descX))
  }

  onMouseMove = (e) => {
    if (this.isDown) {
      this.moveX = (e.clientX - this.downX) - (this.state.curIndex+1)*this.props.width
      console.log('moveX', this.moveX)
      this.setState({
        x: this.moveX,
      })
    }
  }

  onMouseLeave = (e) => {
    this.isDown = false
    let shouldMove = this.calcShouldMove(this.state.x)
    console.log('shouldmove', this.state.x, shouldMove)
    requestAnimationFrame(() => this.moveRemain(Math.floor(this.state.x),Math.floor(shouldMove)))
  }

  renderChild = () => {
    let childList = []
    const { children } = this.props
    if (children.length >= 1)
      childList.push(children[children.length -1])
    React.Children.forEach(this.props.children, (child, index) => {
      childList.push(child)
    })
    if (children.length >= 1)
    childList.push(children[0])
    return childList
  }

  render() {
    return (
      <div
        className='carousel'
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseMove={this.onMouseMove}
        onMouseLeave={this.onMouseLeave}
      >
        <div className='container' style={{marginLeft: this.state.x}}>
          {this.renderChild()}
        </div>
      </div>)
  }
}

Carousel.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

export default Carousel

