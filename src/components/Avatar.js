import React from 'react'

class Avatar extends React.Component {
    constructor(props){
        super(props)
    
    }

    render() {
        return (
            <div>
                <img src={ require('../images/avatar.jpg')} style={{borderRadius: '50px', height: '100px', width: '100px'}}/>
            </div>
        )
    }
}

export default Avatar