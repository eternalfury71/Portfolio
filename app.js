const createBtn = document.querySelector('.create_note');
const interface = document.querySelector('.interface');

getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content); 
    interface.insertBefore(noteElement, createBtn);
})

createBtn.addEventListener('click', () => addNote());

function getNotes() {
    const noteArr = localStorage.getItem("notesapp");
    if(noteArr) {
        return JSON.parse(noteArr);
    } else {
        return [];
    }    
}

function saveNotes(notes) {
    localStorage.setItem('notesapp', JSON.stringify(notes));
}


function createNoteElement(id, content) {
    const element = document.createElement("textarea");
    element.classList.add('note');
    element.value = content;
    element.placeholder = "Emply Note";
    element.addEventListener('change', () => {
        updateNote(id, element.value);
    });
    
    element.addEventListener('dblclick', () => {
        const deleteElem = confirm("You want to delete current note?");
        if(deleteElem) {
            deleteNote(id, element);
        }
    })
    return element;
}

function addNote() {
    const existingNotes = getNotes();
    const newNoteObj = {    
        id: Math.floor(Math.random() * 10000),
        content: ""
    };
    const noteElement = createNoteElement(newNoteObj.id, newNoteObj.content);
    interface.insertBefore(noteElement,createBtn);
    existingNotes.push(newNoteObj);
    saveNotes(existingNotes);
}

function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];
    console.log(targetNote);
    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNote(id, element) {
    const notes = getNotes().filter(note => note.id != id);
    saveNotes(notes);
    interface.removeChild(element);

}