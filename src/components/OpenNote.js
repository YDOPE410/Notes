import React from 'react'
import '../styles/newNote.css'

export default class OpenNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            title: props.title,
            description: props.description,
            editTitleFlag: false,
            editDescriptionFlag: false,
            x: props.x,
            y: props.y
        }
    }

    changHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div id='opened-note'>
                <div className='opened-note-title' onDoubleClick={() => this.setState({ editTitleFlag: true })}>
                    {!this.state.editTitleFlag ?
                        <h1 id='opened-note-title'>
                            {this.state.title}
                        </h1> : <input type='text' value={this.state.title} onChange={this.changHandler} name='title' />
                    }
                </div>
                <div onDoubleClick={() => this.setState({ editDescriptionFlag: true })} className='opened-note-description'>
                    {!this.state.editDescriptionFlag ?
                        <pre >
                            {this.state.description}
                        </pre> : <textarea type='text' value={this.state.description} onChange={this.changHandler} name='description' />
                    }
                </div>
                <div className='opened-note-buttons'>
                    <input id='close-opened-note-button' value='Close' type='button' onClick={() => this.props.closeNote()} />
                    <input id='edit-opened-note-button' value='Edit' type='button' onClick={() => {
                        
                        fetch('http://localhost:3001/edit-note', {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                token: localStorage.getItem('userToken'),
                                note: {
                                    id: this.state.id,
                                    title: this.state.title,
                                    description: this.state.description,
                                    x: this.state.x,
                                    y: this.state.y
                                }
                            })
                        }).then(res => {
                            this.setState({
                                editTitleFlag: false,
                                editDescriptionFlag: false
                            })
                            this.props.renderNotes()
                        })
                    }} />
                </div>
            </div>
        )
    }
}