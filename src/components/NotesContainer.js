import React from 'react';
import Header from './Header';
import '../styles/notesContainer.css'
import Note from './Note'
import NewNote from './NewNote';


export default class NotesContainer extends React.Component {

    constructor(props) {
        super(props);

        this.displayData = [];

        this.state = {
            showdata: this.displayData,
        }
    }
    
    handler = (value) =>{
        this.displayData.push(value);
        this.setState({
            showdata: this.displayData
        })
       
    }

    render() {
        return (
            <>
                <Header />
                <div
                    id='notes-container'
                >
                    {this.displayData}
                </div>
                <NewNote addHandler={this.handler}/>
            </>
        )
    }
}