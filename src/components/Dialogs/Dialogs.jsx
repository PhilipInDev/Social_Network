import './Dialogs.scss';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import MessageInput from "./MessageInput/MessageInput";

let dialogs = [
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
];
let messages = [
    {id:1, message:'Hey, how a u?', time:'10:00'},
    {id:2, message:'Hey, how a u, friend?', time:'10:01'},
    {id:3, message:'Hey, fine?', time:'10:03'},
    {id:4, message:'And u?', time:'10:04'},
    {id:5, message:'The same', time:'10:07'},
]

let messagesElements = messages.map(el => (<Message message={el.message} time={el.time}/>));
let dialogElements = dialogs.map(el=>(<DialogItem id={el.id} avatarLink={el.avatarLink} name={el.name} messageName={el.messageName} message={el.message}/>));


const Dialogs = () => {
    return(
        <div className='dialogs'>
            <div className='dialogs-items'>
                {dialogElements}
            </div>
            <div className="messages-box">
                <div className="messages">
                    {messagesElements}
                </div>
                <MessageInput />
            </div>
        </div>
    )
}

export default Dialogs;