let newNote = document.getElementById('new-note');
let noteContaier = document.getElementById('note-container');
let cancelNewNoteButton = document.getElementById('new-note-cancel-button');
let addNewNoteButton = document.getElementById('new-note-add-button');
let mainWrapper = document.getElementById('main-wrapper');

const uuid = () => 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.
    replace(/[x]/g,
        (c, r) => ('x' == c ?
            (r = Math.random() * 16 | 0) :
            (r & 0x3 | 0x8)).toString(16));

class Note {

    constructor(id, title, description, left, top) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._left = left;
        this._top = top;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get title() {
        return this._title;
    }

    set title(title) {
        this._title = title;
    }

    get description() {
        return this._description;
    }

    set description(description) {
        this._description = description;
    }

    get left() {
        return this._left;
    }

    set left(left) {
        this._left = left;
    }

    get top() {
        return this._top;
    }

    set top(top) {
        this._top = top;
    }
}


function getValue(id) {
    return document.getElementById(id).value;
}

function setValue(id, value) {
    document.getElementById(id).value = value;
}

function addNote(title, id, top, left) {
    let div = document.createElement('div');
    let p = document.createElement('p');
    let h4 = document.createElement('h4');
    let input = document.createElement('input');
    input.type = 'button';
    input.value = '[X]';
    input.className = 'delete-note-button';
    p.textContent = '...';
    h4.textContent = title;
    div.className = 'note';
    div.style.top = top + 'px';
    div.style.left = left + 'px';
    div.id = id;
    div.append(input);
    div.append(h4);
    div.append(p);
    noteContaier.append(div);
}

function addNoteToStorage(note) {
    localStorage.setItem(note.id, JSON.stringify(note));
}

function openNote(id) {
    mainWrapper.hidden = true;
    let note = JSON.parse(localStorage.getItem(id));
    let divOpenedNote = document.createElement('div');
    divOpenedNote.id = 'opened-note';

    let divOpenedNoteTitle = document.createElement('div');
    divOpenedNoteTitle.className = 'opened-note-title';
    let h1OpenedNote = document.createElement('h1');
    h1OpenedNote.id = 'opened-note-title';
    h1OpenedNote.textContent = note._title;
    divOpenedNoteTitle.append(h1OpenedNote);


    let divOpenedNoteDescription = document.createElement('div');
    divOpenedNoteDescription.className = 'opened-note-description';
    let pOpenedNote = document.createElement('p');
    pOpenedNote.id = "opened-note-description";
    pOpenedNote.textContent = note._description;
    divOpenedNoteDescription.append(pOpenedNote);

    let divOpenedNoteButton = document.createElement('div');
    divOpenedNoteButton.className = 'opened-note-button';
    let inputOpenedNote = document.createElement('input');
    inputOpenedNote.id = 'opened-note-button';
    inputOpenedNote.value = 'Close';
    inputOpenedNote.type = 'button';
    inputOpenedNote.onclick = () => closeNote();
    divOpenedNoteButton.append(inputOpenedNote);

    divOpenedNote.append(divOpenedNoteTitle);
    divOpenedNote.append(divOpenedNoteDescription);
    divOpenedNote.append(divOpenedNoteButton);

    mainWrapper.after(divOpenedNote);
}

function closeNote() {
    document.getElementById('opened-note').remove();
    mainWrapper.hidden = false;
}

function deleteNote(note) {
    note.remove();
}

function deleteNoteFromStorage(id) {
    localStorage.removeItem(id);
}

document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'n' && event.altKey) {
        if (!newNote.hidden) {
            newNote.hidden = true;
        } else {
            newNote.hidden = false;
        }
    }
})

addNewNoteButton.addEventListener('click', () => {
    let titleValue = getValue('new-note-title');
    let descriptionValue = getValue('new-note-description');
    if (titleValue.length > 0 && descriptionValue.length > 0) {
        let note = new Note(uuid(), titleValue, descriptionValue, 0, 100);
        addNote(titleValue, note.id, note.top, note.left);
        addNoteToStorage(note);
        setValue('new-note-title', "");
        setValue('new-note-description', "");
    }
    else {
        alert("title or description empty");
    }
});

cancelNewNoteButton.addEventListener('click', () => {
    newNote.hidden = true;
    setValue('new-note-title', "");
    setValue('new-note-description', "");
})

document.addEventListener('click', (e) => {
    if (e.target.type == 'button') {
        let currentElementParentNode = e.target.parentNode;
        if (currentElementParentNode.className == 'note') {
            deleteNoteFromStorage(currentElementParentNode.id);
            deleteNote(currentElementParentNode);
        }
    }
})

document.addEventListener('dblclick', (e) => {
    let currentElementParentNode = e.target.parentNode;
    if (currentElementParentNode.className == 'note') {
        openNote(currentElementParentNode.id);
    }

})



document.addEventListener('mousedown', function (e) {
    let currentElementParentNode = e.target.parentNode;
    if (currentElementParentNode.className == 'note') {
        let currentNote = document.getElementById(currentElementParentNode.id);
        let storageObj = JSON.parse(localStorage.getItem(currentElementParentNode.id));
        currentNote.onmousedown = function (e) {
            let coords = getCoords(currentNote);
            let shiftX = e.pageX - coords.left;
            let shiftY = e.pageY - coords.top;

            moveAt(e);

            function moveAt(e) {
                currentNote.style.left = e.pageX - shiftX + 'px';
                currentNote.style.top = e.pageY - shiftY + 'px';
                storageObj._top = e.pageY - shiftY;
                storageObj._left = e.pageX - shiftX;
            }

            document.onmousemove = function (e) {
                moveAt(e);
            };

            currentNote.onmouseup = function () {
                document.onmousemove = null;
                currentNote.onmouseup = null;
                localStorage.setItem(currentElementParentNode.id, JSON.stringify(storageObj));
            };
        }

        currentNote.ondragstart = function () {
            return false;
        };

        function getCoords(elem) {
            let box = elem.getBoundingClientRect();
            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        }
    }
})

window.addEventListener('DOMContentLoaded', function () {
    let objectKeys = Object.keys(localStorage);
    for (let i = 0; i < objectKeys.length; i++) {
        let item = JSON.parse(localStorage.getItem(objectKeys[i]));
        addNote(item._title, item._id, item._top, item._left)
    }
})
