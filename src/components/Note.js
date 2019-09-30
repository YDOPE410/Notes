import React from 'react';
import '../styles/note.css';

export default class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            title: props.title,
            description: props.description,
            x: props.x,
            y: props.y
        }

    }

    componentDidMount() {
        this.currentNote = document.getElementById(this.state.id);
        this.currentNote.ondragstart = () => false;
        this.currentNote.style.left = this.state.x + 'px';
        this.currentNote.style.top = this.state.y + 'px';
    }

    moveAt = (e, shiftX, shiftY) => {
        this.currentNote.style.left = e.pageX - shiftX + 'px';
        this.currentNote.style.top = e.pageY - shiftY + 'px';
        this.setState({ x: e.pageX - shiftX, y: e.pageY - shiftY });
    }

    getCoords = (elem) => {
        let box = elem.getBoundingClientRect();
        let res = {
            top: box.top + window.pageYOffset,
            left: box.left + window.pageXOffset
        }
        return res;
    }

    onMouseDownHandler = (e) => {
        document.getElementById('notes-container').style.cursor = 'grabbing';
        let coords = this.getCoords(this.currentNote);
        let shiftX = e.pageX - coords.left;
        let shiftY = e.pageY - coords.top + 6.5 * document.documentElement.clientHeight / 100;
        this.moveAt(e, shiftX, shiftY);
        document.onmousemove = (e) => {
            this.moveAt(e, shiftX, shiftY);
        };
    }

    onMouseUpHandler = (e) => {
        document.getElementById('notes-container').style.cursor = 'default';
        document.onmousemove = null;
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
        })
        return null;
    }


    


    render() {
        return (
            <div
                onDoubleClick={()=>{
                    this.props.openNote(this.state)
                }}
                onMouseDown={this.onMouseDownHandler}
                className='note'
                id={this.state.id}
                onMouseUp={this.onMouseUpHandler}
            >
                <input
                    type='button'
                    value='[x]'
                    className='delete-note-button'
                    onClick={() => {
                        let renderNotes = this.props.deleteHandler;
                        fetch('http://localhost:3001/delete-note', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                "token": localStorage.getItem("userToken"),
                                id: this.state.id,

                            })
                        }).then(res => {
                            renderNotes()
                        }).catch(err => console.log(err))

                    }}
                />

                <h4>{this.state.title}</h4>
                <br />
                <p>{this.state.description.length>20?this.state.description.slice(0,20) + '...' : this.state.description}</p>

            </div>
        )
    }
}