import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let dataSet = {
    dialogs:{
        messages:[
            {id:1, message:'Hey, how a u?', time:'10:00'},
            {id:2, message:'Hey, how a u, friend?', time:'10:01'},
            {id:3, message:'Hey, fine?', time:'10:03'},
            {id:4, message:'And u?', time:'10:04'},
            {id:5, message:'The same', time:'10:07'},
        ],
        dialogItems:[
            {
                id:'1',
                avatarLink:'https://s3.cdn.teleprogramma.pro/wp-content/uploads/2020/01/a76ebd11ecf1ab90a360b056f49b90a0.jpg',
                name:'Vasya',
                messageName:'Vasya',
                message:'how a ya bro?'
            },
            {
                id:'2',
                avatarLink:'https://s3.cdn.teleprogramma.pro/wp-content/uploads/2020/01/a76ebd11ecf1ab90a360b056f49b90a0.jpg',
                name:'Tanya',
                messageName:'Tanya',
                message:'how a ya ma loveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee?'
            },
            {
                id:'3',
                avatarLink:'https://s3.cdn.teleprogramma.pro/wp-content/uploads/2020/01/a76ebd11ecf1ab90a360b056f49b90a0.jpg',
                name:'Dimich',
                messageName:'Dimich',
                message:'how a ya bro?'
            },
        ]
    },
    profile: {
        posts: [
            {
                id: 1,
                profileLink: '#',
                name: 'Philip',
                profileImage: 'https://s3.cdn.teleprogramma.pro/wp-content/uploads/2020/01/a76ebd11ecf1ab90a360b056f49b90a0.jpg',
                text: 'My 1st post, guys!',
                likesCount: '17',
                commentsCount: '1',
            },
            {
                id: 2,
                profileLink: '#',
                name: 'Philip',
                profileImage: 'https://s3.cdn.teleprogramma.pro/wp-content/uploads/2020/01/a76ebd11ecf1ab90a360b056f49b90a0.jpg',
                text: 'My 1st post, guys!',
                likesCount: '17',
                commentsCount: '1',
            },
            {
                id: 3,
                profileLink: '#',
                name: 'Philip',
                profileImage: 'https://s3.cdn.teleprogramma.pro/wp-content/uploads/2020/01/a76ebd11ecf1ab90a360b056f49b90a0.jpg',
                text: 'My 1st post, guys!',
                likesCount: '17',
                commentsCount: '1',
            },
        ]
    }
}

ReactDOM.render(
  <React.StrictMode>
    <App data={dataSet}/>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
