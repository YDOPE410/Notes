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
                    <Note/>
                 
                </div>
            </>
        )
    }
}