import React from 'react';
import '../styles/note.css';

export default class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 'sda',
            title: "asdasd",
            description: "asdasdsadasda",
            x: 0,
            y: 0
        }

    }

    componentDidMount() {
        this.currentNote = document.getElementById(this.state.id);
        this.currentNote.ondragstart = () => false;
    }

    moveAt = (e, shiftX, shiftY) => {
        this.currentNote.style.left = e.pageX - shiftX + 'px';
        this.currentNote.style.top = e.pageY - shiftY + 'px';
    }

    getCoords = (elem) => {
        let box = elem.getBoundingClientRect();
        let res = {
            top: box.top + window.pageYOffset,
            left: box.left + window.pageXOffset
        }
        this.setState({ x: res.left, y: res.top });
        return res;
    }

    onMouseDownHandler = (e) => {
        document.getElementById('notes-container').style.cursor = 'grabbing';
        let coords = this.getCoords(this.currentNote);
        let shiftX = e.pageX - coords.left;
        let shiftY = e.pageY - coords.top + 71.56;
        console.log(`${shiftY} = ${e.pageY} - ${coords.top}`)
        this.moveAt(e, shiftX, shiftY);
        document.onmousemove = (e) => {
            this.moveAt(e, shiftX, shiftY);
        };
    }

    onMouseUpHandler = (e) => {
        document.getElementById('notes-container').style.cursor = 'default';
        document.onmousemove = null;
        return null;
    }

    render() {
        return (
            <div
                onMouseDown={this.onMouseDownHandler}
                className='note'
                id={this.state.id}
                onMouseUp={this.onMouseUpHandler}
            >
                <input
                    type='button'
                    value='[x]'
                    className='delete-note-button'
                />

                <h4>{this.state.title}</h4>
                <br />
                <p>{this.state.description}</p>

            </div>
        )
    }
}