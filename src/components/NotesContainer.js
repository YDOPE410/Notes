import React from 'react';
import Header from './Header';
import '../styles/notesContainer.css'
import Note from './Note'
import NewNote from './NewNote';
import OpenNote from './OpenNote';


export default class NotesContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            openIdNote: "",
            openDescriptionNote: "",
            openTitleNote: "",
            showdata: [],
            showOpen: false,
            openX: 0,
            openY: 0
        }
    }


    componentWillMount() {
        fetch('http://localhost:3001/get-user-notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "token": localStorage.getItem('userToken'),
            })
        }).then(res => res.json()).then(res => {
            this.setState({
                showdata: res.notes
            })
        })
    }




    handler = () => {
        fetch('http://localhost:3001/get-user-notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "token": localStorage.getItem('userToken'),
            })
        }).then(res => res.json()).then(res => {
            this.setState({
                showdata: res.notes
            })
        })

    }

    openNoteAction = (note) => {
        this.setState({
            showOpen: true,
            openIdNote: note.id,
            openDescriptionNote: note.description,
            openTitleNote: note.title,
            openX: note.x,
            openY: note.y
        })
    }

    closeNoteAction = () => {
        this.setState({
            showOpen: false,

        })
    }


    render() {
        return (

            <>
                <Header />
                {!this.state.showOpen && <div id='notes-container'  >
                    {this.state.showdata.map(e =>

                        <Note
                            openNote={this.openNoteAction}
                            deleteHandler={this.handler}
                            key={e.id}
                            id={e.id}
                            title={e.title}
                            description={e.description}
                            x={e.x}
                            y={e.y}
                        />
                    )}
                </div>}

                {this.state.showOpen && <OpenNote
                renderNotes={this.handler}
                    closeNote={this.closeNoteAction}
                    description={this.state.openDescriptionNote}
                    title={this.state.openTitleNote}
                    id={this.state.openIdNote}
                    x={this.state.openX}
                    y={this.state.openY}
                />}
                <NewNote renderNotes={this.handler} />
            </>
        )
    }
}