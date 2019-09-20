import React from 'react'

class Avatar extends React.Component {
   

    render() {
        return (
            <div>
                <img src={ require('../images/avatar.jpg')} alt='cat-avatar' style={{borderRadius: '50px', height: '100px', width: '100px'}}/>
            </div>
        )
    }
}

export default Avatar