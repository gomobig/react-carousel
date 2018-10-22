import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Carousel from './Carousel'
import * as serviceWorker from './serviceWorker';

ReactDOM.render((
  <Carousel width={400} height={400}>
    <img 
      draggable="false"
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540189515942&di=99667ef98b324aabf1d1965f99097748&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201601%2F26%2F20160126173726_wcxR5.jpeg"
      style={{width: 400, height: 400}}
    >
    
    </img>
    <img 
      draggable="false"
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540189515942&di=ff8eceeafa9ff70e4acc12bdecf0f0b3&imgtype=0&src=http%3A%2F%2Fimage.jisuxz.com%2Fdesktop%2F1856%2Fjisuxz_Dilraba_01.jpg"
      style={{width: 400, height: 400}}
    >
    </img>
  </Carousel>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
