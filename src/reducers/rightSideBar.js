
const initialState = {
        friendsList: [
            {
                avatar: 'https://miro.medium.com/max/1400/1*JyYin7G7aGwgD9zpYBZ12Q.png',
                name: 'Vasya',
                isOnline: true
            },
            {
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcI9trY8oLre9yDw8OL15v4w7gYlmHL5oIpQwot7Qy26HxtcrMLPBMoc3iJvdM_KOJgTY&usqp=CAU',
                name: 'John',
                isOnline: false
            },
            {
                avatar: 'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-in-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?size=626&ext=jpg',
                name: 'Peter',
                isOnline: false
            },
            {
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYH_VDaGfxQ_cPhkgDPyoxXJgnnKHzEw7kdg&usqp=CAU',
                name: 'Vasya',
                isOnline: true
            }, {
                avatar: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
                name: 'Vasya',
                isOnline: true
            },
            {
                avatar: 'https://miro.medium.com/max/1400/1*JyYin7G7aGwgD9zpYBZ12Q.png',
                name: 'Vasya',
                isOnline: true
            },
            {
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcI9trY8oLre9yDw8OL15v4w7gYlmHL5oIpQwot7Qy26HxtcrMLPBMoc3iJvdM_KOJgTY&usqp=CAU',
                name: 'John',
                isOnline: false
            },
            {
                avatar: 'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-in-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?size=626&ext=jpg',
                name: 'Peter',
                isOnline: false
            },
            {
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYH_VDaGfxQ_cPhkgDPyoxXJgnnKHzEw7kdg&usqp=CAU',
                name: 'Vasya',
                isOnline: true
            }, {
                avatar: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
                name: 'Vasya',
                isOnline: true
            },
            {
                avatar: 'https://miro.medium.com/max/1400/1*JyYin7G7aGwgD9zpYBZ12Q.png',
                name: 'Vasya',
                isOnline: true
            },
            {
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcI9trY8oLre9yDw8OL15v4w7gYlmHL5oIpQwot7Qy26HxtcrMLPBMoc3iJvdM_KOJgTY&usqp=CAU',
                name: 'John',
                isOnline: false
            },
            {
                avatar: 'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-in-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?size=626&ext=jpg',
                name: 'Peter',
                isOnline: false
            },
            {
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYH_VDaGfxQ_cPhkgDPyoxXJgnnKHzEw7kdg&usqp=CAU',
                name: 'Vasya',
                isOnline: true
            }, {
                avatar: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
                name: 'Vasya',
                isOnline: true
            },
            {
                avatar: 'https://miro.medium.com/max/1400/1*JyYin7G7aGwgD9zpYBZ12Q.png',
                name: 'Vasya',
                isOnline: true
            },
            {
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcI9trY8oLre9yDw8OL15v4w7gYlmHL5oIpQwot7Qy26HxtcrMLPBMoc3iJvdM_KOJgTY&usqp=CAU',
                name: 'John',
                isOnline: false
            },
            {
                avatar: 'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-in-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?size=626&ext=jpg',
                name: 'Peter',
                isOnline: false
            },
            {
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYH_VDaGfxQ_cPhkgDPyoxXJgnnKHzEw7kdg&usqp=CAU',
                name: 'Vasya',
                isOnline: true
            },
            {
                avatar: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
                name: 'Vasya',
                isOnline: true
            },
        ]
}

const rightSideBarReducer = (state = initialState, action) => {
    return initialState;
}

export default rightSideBarReducer;