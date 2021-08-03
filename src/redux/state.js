let state = {
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
    },
    rightSideBar:{
        friendsList:[
            {
                avatar:'https://miro.medium.com/max/1400/1*JyYin7G7aGwgD9zpYBZ12Q.png',
                name:'Vasya',
                isOnline: true
            },
            {
                avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcI9trY8oLre9yDw8OL15v4w7gYlmHL5oIpQwot7Qy26HxtcrMLPBMoc3iJvdM_KOJgTY&usqp=CAU',
                name:'John',
                isOnline: false
            },
            {
                avatar:'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-in-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?size=626&ext=jpg',
                name:'Peter',
                isOnline: false
            },
            {
                avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYH_VDaGfxQ_cPhkgDPyoxXJgnnKHzEw7kdg&usqp=CAU',
                name:'Vasya',
                isOnline: true
            },            {
                avatar:'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
                name:'Vasya',
                isOnline: true
            },
            {
                avatar:'https://miro.medium.com/max/1400/1*JyYin7G7aGwgD9zpYBZ12Q.png',
                name:'Vasya',
                isOnline: true
            },
            {
                avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcI9trY8oLre9yDw8OL15v4w7gYlmHL5oIpQwot7Qy26HxtcrMLPBMoc3iJvdM_KOJgTY&usqp=CAU',
                name:'John',
                isOnline: false
            },
            {
                avatar:'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-in-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?size=626&ext=jpg',
                name:'Peter',
                isOnline: false
            },
            {
                avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYH_VDaGfxQ_cPhkgDPyoxXJgnnKHzEw7kdg&usqp=CAU',
                name:'Vasya',
                isOnline: true
            },            {
                avatar:'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
                name:'Vasya',
                isOnline: true
            },
            {
                avatar:'https://miro.medium.com/max/1400/1*JyYin7G7aGwgD9zpYBZ12Q.png',
                name:'Vasya',
                isOnline: true
            },
            {
                avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcI9trY8oLre9yDw8OL15v4w7gYlmHL5oIpQwot7Qy26HxtcrMLPBMoc3iJvdM_KOJgTY&usqp=CAU',
                name:'John',
                isOnline: false
            },
            {
                avatar:'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-in-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?size=626&ext=jpg',
                name:'Peter',
                isOnline: false
            },
            {
                avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYH_VDaGfxQ_cPhkgDPyoxXJgnnKHzEw7kdg&usqp=CAU',
                name:'Vasya',
                isOnline: true
            },            {
                avatar:'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
                name:'Vasya',
                isOnline: true
            },
            {
                avatar:'https://miro.medium.com/max/1400/1*JyYin7G7aGwgD9zpYBZ12Q.png',
                name:'Vasya',
                isOnline: true
            },
            {
                avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcI9trY8oLre9yDw8OL15v4w7gYlmHL5oIpQwot7Qy26HxtcrMLPBMoc3iJvdM_KOJgTY&usqp=CAU',
                name:'John',
                isOnline: false
            },
            {
                avatar:'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-in-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?size=626&ext=jpg',
                name:'Peter',
                isOnline: false
            },
            {
                avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYH_VDaGfxQ_cPhkgDPyoxXJgnnKHzEw7kdg&usqp=CAU',
                name:'Vasya',
                isOnline: true
            },            {
                avatar:'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
                name:'Vasya',
                isOnline: true
            },

        ]
    }
}

export default state;