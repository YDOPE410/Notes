import React from 'react'
import '../styles/newNote.css';

export default class NewNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "new-note-title": "",
            "new-note-description": "",
            y: 0,
            x: 0
        }
    }
    uuid = () => 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.
        replace(/[x]/g,
            (c, r) => ('x' == c ?
                (r = Math.random() * 16 | 0) :
                (r & 0x3 | 0x8)).toString(16));





    cancelAction = () => {
        document.getElementById('new-note').hidden = !document.getElementById('new-note').hidden;
    }


    textChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        let renderNotes = this.props.renderNotes;
        return (
            <div id="new-note" hidden>
                <div className="new-note-title">
                    <input type="text" id="new-note-title" name="new-note-title" onChange={this.textChangeHandler} required minLength="1" maxLength="36" />
                </div>
                <div className="new-note-description">
                    <textarea name="new-note-description" id="new-note-description" onChange={this.textChangeHandler} cols="30" rows="10"></textarea>
                </div>
                <div className="new-note-buttons">
                    <div className="new-note-button" id="new-note-add">
                        <input onClick={() => {

                            fetch('http://localhost:3001/add-note', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    "token": localStorage.getItem("userToken"),
                                    note: {
                                        id: this.uuid(),
                                        title: this.state["new-note-title"],
                                        description: this.state["new-note-description"],
                                        x: this.state.x,
                                        y: this.state.y
                                    }
                                })
                            }).then(res => {
                                renderNotes()
                            }).catch(err => console.log(err))

                        }} id="new-note-add-button" type="button" value="Add" />
                    </div>
                    <div className="new-note-button" id="new-note-cancel">
                        <input onClick={this.cancelAction} id="new-note-cancel-button" type="button" value="Cancel" />
                    </div>
                </div>
            </div>
        )
    }
}