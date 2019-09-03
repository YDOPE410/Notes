let newNote = document.getElementById('new-note');
let noteContaier = document.getElementById('note-container');
let cancelNewNoteButton = document.getElementById('new-note-cancel-button');
let addNewNoteButton = document.getElementById('new-note-add-button');
let mainWrapper = document.getElementById('main-wrapper');
let localStorageItemName = "Notes";

const uuid = () => 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.
    replace(/[x]/g,
        (c, r) => ('x' == c ?
            (r = Math.random() * 16 | 0) :
            (r & 0x3 | 0x8)).toString(16));

function getValue(id) {
    return document.getElementById(id).value;
}

function setValue(id, value) {
    document.getElementById(id).value = value;
}

function addNote(title, description, id, top, left) {
    let div = document.createElement('div');
    let p = document.createElement('p');
    let h4 = document.createElement('h4');
    let input = document.createElement('input');
    let divp = document.createElement('div');
    input.type = 'button';
    input.value = '[X]';
    input.className = 'delete-note-button';
    divp.className = 'note-description'
    if (description.length > 40)
        p.textContent = description.slice(0,40) + '...';
    else
        p.textContent = description
    h4.textContent = title;
    div.className = 'note';
    div.style.top = top + 'px';
    div.style.left = left + 'px';
    div.id = id;
    div.append(input);
    div.append(h4);
    divp.append(p);
    div.append(divp);
    noteContaier.append(div);
}

function addNoteToStorage(note) {
    if (localStorage.getItem(localStorageItemName) == null) {
        localStorage.setItem(localStorageItemName, JSON.stringify({ [note.id]: note, }));
    }
    else {
        let obj = JSON.parse(localStorage.getItem(localStorageItemName));
        obj[note.id] = note;
        localStorage.setItem(localStorageItemName, JSON.stringify(obj));
    }
}

function openNote(id) {
    mainWrapper.hidden = true;
    let note = JSON.parse(localStorage.getItem(localStorageItemName))[id];
    let divOpenedNote = document.createElement('div');
    divOpenedNote.id = 'opened-note';

    let divOpenedNoteTitle = document.createElement('div');
    divOpenedNoteTitle.className = 'opened-note-title';
    let h1OpenedNote = document.createElement('h1');
    h1OpenedNote.id = 'opened-note-title';
    h1OpenedNote.textContent = note.title;
    divOpenedNoteTitle.append(h1OpenedNote);


    let divOpenedNoteDescription = document.createElement('div');
    divOpenedNoteDescription.className = 'opened-note-description';
    let pOpenedNote = document.createElement('p');
    pOpenedNote.id = "opened-note-description";
    pOpenedNote.textContent = note.description;
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
    let obj = JSON.parse(localStorage.getItem(localStorageItemName));
    delete obj[id];
    localStorage.setItem(localStorageItemName, JSON.stringify(obj));
}

function controlHiddenParam() {
    if (!newNote.hidden) {
        newNote.hidden = true;
    } else {
        newNote.hidden = false;
    }
}

document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'n' && event.altKey) {
        controlHiddenParam();
    }
})

addNewNoteButton.addEventListener('click', () => {
    let titleValue = getValue('new-note-title');
    let descriptionValue = getValue('new-note-description');
    if (titleValue.length > 0 && descriptionValue.length > 0) {
        let note = {
            id: uuid(),
            title: titleValue,
            description: descriptionValue,
            left: 0,
            top: 100
        }
        addNote(titleValue,descriptionValue, note.id, note.top, note.left);
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
    if (e.target.className == 'note' || e.target.className == 'note-description'){
        openNote(e.target.id)
    }
    if (currentElementParentNode.className == 'note') {
        
        openNote(currentElementParentNode.id);
    }

})

document.addEventListener('mousedown', function (e) {
    let currentElementParentNode = e.target.parentNode;
    if (currentElementParentNode.className == 'note') {
        let currentNote = document.getElementById(currentElementParentNode.id);
        let storageObj = JSON.parse(localStorage.getItem(localStorageItemName))[currentElementParentNode.id];
        currentNote.onmousedown = function (e) {
            document.getElementById('main-wrapper').style.cursor = 'grabbing';
            let coords = getCoords(currentNote);
            let shiftX = e.pageX - coords.left;
            let shiftY = e.pageY - coords.top;
           
            moveAt(e);

            function moveAt(e) {
                
                currentNote.style.left = e.pageX - shiftX + 'px';
                currentNote.style.top = e.pageY - shiftY + 'px';
                storageObj.top = e.pageY - shiftY;
                storageObj.left = e.pageX - shiftX;
            }

            document.onmousemove = function (e) {
                moveAt(e);
            };

            currentNote.onmouseup = function () {
                document.getElementById('main-wrapper').style.cursor = 'default';
                document.onmousemove = null;
                currentNote.onmouseup = null;
                let localStorageObject = JSON.parse(localStorage.getItem(localStorageItemName));
                localStorageObject[currentElementParentNode.id] = storageObj;
                localStorage.setItem(localStorageItemName, JSON.stringify(localStorageObject));
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
    let notes = JSON.parse(localStorage.getItem(localStorageItemName));
    let keys = Object.keys(notes);
    keys.forEach(e => addNote(notes[e].title,notes[e].description, notes[e].id, notes[e].top, notes[e].left))
})
