import React from 'react'


export default class Avatar extends React.Component {
   

    render() {
        return (
            <div>
                <img src={ require('../images/avatar.jpg')} alt='cat-avatar' style={{borderRadius: '33px', height: '65px', width: '65px'}}/>
            </div>
        )
    }
}