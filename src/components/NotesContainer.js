import React from 'react';
import Header from './Header';
import '../styles/notesContainer.css'
import Note from './Note';


export default class NotesContainer extends React.Component {

    render() {
        return (
            <>
                <Header />
                <div
                    id='notes-container'
                >
                    <Note id='asd' title='' description='' x={0} y={0} />
                 
                </div>
            </>
        )
    }
}