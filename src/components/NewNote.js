import React from 'react'
import '../styles/newNote.css';
import Note from './Note';

export default class NewNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastKey: 0
        }
    }

    addNoteAction = () => {
        this.props.addHandler()
    }

    cancelAction = () => {
        document.getElementById('new-note').hidden = !document.getElementById('new-note').hidden;
    }

    getKey = () => {
        this.setState({
            lastKey: this.state.lastKey + 1
        })
        return this.state.lastKey;
    }

    render() {
        let addHandler = this.props.addHandler;
        return (
            <div id="new-note" hidden>
                <div className="new-note-title">
                    <input type="text" id="new-note-title" name="new-note-title" required minLength="1" maxLength="36" />
                </div>
                <div className="new-note-description">
                    <textarea name="new-note-description" id="new-note-description" cols="30" rows="10"></textarea>
                </div>
                <div className="new-note-buttons">
                    <div className="new-note-button" id="new-note-add">
                        <input onClick={() => addHandler(<Note key={this.getKey()} id='123' x={0} y={0} />)} id="new-note-add-button" type="button" value="Add" />
                    </div>
                    <div className="new-note-button" id="new-note-cancel">
                        <input onClick={this.cancelAction} id="new-note-cancel-button" type="button" value="Cancel" />
                    </div>
                </div>
            </div>
        )
    }
}