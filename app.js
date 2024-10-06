import './source/web component/index.js';
import notesData from './source/data/notes.js';

const tombol = document.getElementById("Add");
const catatan = document.getElementById("NoteList");


function showNoteform() {
    console.log("Tombol + sudah ditekan");
    tombol.style.display = "none";
            const formHTML = `
            <div class="note-page">
            <div class="note-form">
                    <h1>Silahkan Masukkan Catatan Baru</h1>
                    <form action="" id="NoteFormulir" class="note-formulir">
                <div class="form-class">
                <div class="form-judul">
                    <label for="note-judul"></label>
                    <input type="text" id="NoteJudul" name="note-judul" placeholder="Masukkan Judul" maxlength="60" required>
                    <div id="JudulError" class="judul-error"></div>
                    <small id="HitungCharJudul" class="char-count">0/60</small>
                </div>
                <div class="form-isi">
                    <label for="note-isi"></label>
                    <textarea name="note-isi" id="NoteIsi" cols="30" rows="10" placeholder="Masukkan Deskripsi" maxlength="150" required></textarea>
                    <div id="IsiError" class="isi-error"></div>
                    <small id="HitungCharIsi" class="char-count-desc">0/150</small>
                </div class="berdampingan">
                    <button type="submit" name="submit" class="tombol-submit">Masukkan ke Catatan</button>
                    <button type="button" id="CancelButton" class="tombol-cancel">Batalkan</button>
                </div>
                    </form>
            </div>
            </div>
            `;
                catatan.innerHTML = formHTML; 
                const form = document.getElementById("NoteFormulir");
                form.addEventListener("submit", addNote); 

                const cancelbtn = document.getElementById('CancelButton');
                cancelbtn.addEventListener('click', () => {
                tombol.style.display = "block";
                renderNotes();
                });
    
    document.getElementById("NoteJudul").addEventListener('input', updateJumlahCharJudul);
    document.getElementById("NoteIsi").addEventListener('input', updateJumlahCharIsi);

    document.getElementById("NoteJudul").addEventListener('input', validasiTitle);
    document.getElementById("NoteIsi").addEventListener('input', validasiContent);
}

function addNote(event) {
    event.preventDefault();

    const Topic = document.getElementById("NoteJudul").value.trim();
    const Descrypt = document.getElementById("NoteIsi").value.trim();
    const judulError = document.getElementById("JudulError");
    const isiError = document.getElementById("IsiError");

    judulError.textContent = "";
    isiError.textContent = "";

    let Error = false;

        if (Topic.length < 5) {
            isiError.textContent = `Minimal 5 Karakter`;
            Error = true;
        }

        if (Descrypt.length < 15) {
            isiError.textContent = `Minimal 15 Karakter`;
            Error = true;
        }
    if (Error) {
        return;
    }

    const newCatatan = {
        id: `notes-${Date.now()}`,
        title: Topic,
        body: Descrypt,
        createdAt: new Date().toISOString(),
        archived: false,
    };

    notesData.push(newCatatan);
    renderNotes();
}

function updateJumlahCharJudul() {
    const judulInput = document.getElementById("NoteJudul");
    const isiInput = document.getElementById("HitungCharJudul");
    isiInput.textContent = `${judulInput.value.length}/60`;
}

function updateJumlahCharIsi() {
    const kontenInput = document.getElementById("NoteIsi");
    const isiInput = document.getElementById("HitungCharIsi");
    isiInput.textContent = `${kontenInput.value.length}/150`;
}

    function validasiTitle() {
        const judulInput = document.getElementById("NoteJudul");
        const judulError = document.getElementById("JudulError");

        if (judulInput.value.length < 8) {
            judulError.textContent = `Judul harus minimal 8 karakter`;
            judulError.style.display = "block";
        } else {
            judulError.textContent = "";
            judulError.style.display = "none"
        }

    }

    function validasiContent() {
        const kontenInput = document.getElementById("NoteIsi");
        const kontenError = document.getElementById("IsiError");

        if (kontenInput.value.length < 15) {
            kontenError.textContent = `Deskripsi harus minimal 15 karakter`;
            kontenError.style.display = "block";
        } else {
            kontenError.textContent = "";
            kontenError.style.display = "none";
        }

    }


function hapus(noteId) {
    const index = notesData.findIndex(note => note.id === noteId);
        if (index !== -1) {
            notesData.splice(index, 1);
            renderNotes();
        }
}

function edit(noteId) {
    tombol.style.display = "none";
    const getEdit = notesData.find(note => note.id === noteId);
    if (getEdit) {
        const formHTML = `
        <div class="note-page">
            <div class="note-form">
                <h1>Edit Catatan</h1>
                <form action="" id="NoteEditForm" class="note-formulir">
                    <div class="form-class">
                        <div class="form-judul">
                            <label for="note-judul"></label>
                            <input type="text" id="EditNoteJudul" name="note-judul" value="${getEdit.title}" maxlength="60" required>
                            <div id="EditJudulError" class="judul-error"></div>
                            <small id="EditHitungCharJudul" class="char-count">${getEdit.title.length}/60</small>
                        </div>
                        <div class="form-isi">
                            <label for="note-isi"></label>
                            <textarea name="note-isi" id="EditNoteIsi" cols="30" rows="10" maxlength="150" required>${getEdit.body}</textarea>
                            <div id="EditIsiError" class="isi-error"></div>
                            <small id="EditHitungCharIsi" class="char-count-desc">${getEdit.body.length}/150</small>
                        </div>
                    </div>
                    <div class="berdampingan">
                        <button type="submit" class="tombol-submit">Perbarui</button>
                        <button type="button" id="CancelEditButton" class="tombol-cancel">Batal</button>
                    </div>
                </form>
            </div>
        </div>
        `;
        catatan.innerHTML = formHTML;

        const judulinputEdit = document.getElementById("EditNoteJudul");
        const hitungCharJudulEdit = document.getElementById("EditHitungCharJudul");
        judulinputEdit.addEventListener('input', () => {
            hitungCharJudulEdit.textContent = `${judulinputEdit.value.length}/60`;
        });

        const IsiInputedit = document.getElementById("EditNoteIsi");
        const hitungCharIsiEdit = document.getElementById("EditHitungCharIsi");
        IsiInputedit.addEventListener('input', () => {
            hitungCharIsiEdit.textContent = `${IsiInputedit.value.length}/150`;
        });

        function validasiTitle() {
            const judulErrorEdit = document.getElementById("EditJudulError");
            if (judulinputEdit.value.length < 8) {
                judulErrorEdit.textContent = `Judul harus minimal 8 karakter`;
                judulErrorEdit.style.display = "block";
                return false;
            } else {
                judulErrorEdit.textContent = '';
                judulErrorEdit.style.display = "none";
                return true;
            }
        }

        function validasiDescription() {
            const deskripsiErrorEdit = document.getElementById("EditIsiError");
            if (IsiInputedit.value.length < 15) {
                deskripsiErrorEdit.textContent = `Deskripsi harus minimal 15 karakter`;
                deskripsiErrorEdit.style.display = "block";
                return false;
            } else {
                deskripsiErrorEdit.textContent = '';
                deskripsiErrorEdit.style.display = "none";
                return true;
            }
        }
        
        judulinputEdit.addEventListener('input',validasiTitle);
        IsiInputedit.addEventListener('input', validasiDescription);

        const formulir = document.getElementById('NoteEditForm');
        formulir.addEventListener('submit', (event) => {
            event.preventDefault();

            const thisJudulinputEdit = validasiTitle();
            const thisIsiInputedit = validasiDescription();

            if (thisJudulinputEdit && thisIsiInputedit) {
                getEdit.title = document.getElementById('EditNoteJudul').value;
                getEdit.body = document.getElementById('EditNoteIsi').value;
                tombol.style.display = "block";
                renderNotes();
            }
        });

        const cancelbtn = document.getElementById('CancelEditButton');
        cancelbtn.addEventListener('click', () => {
            tombol.style.display = "block";
            renderNotes();
        });
        
    }
}

function renderNotes() {
   catatan.innerHTML = '';
   const ruang = document.createElement('div');
   ruang.className = 'note-listing'; 

   ruang.innerHTML = `
    <div class="bahan-ruang"> 
        <h1 class="judul-notes">Catatan Kegiatan yang Harus Dikerjakan</h1>
        <hr>
        <div class="bahan-isi"></div>
    </div>
   `;

    const bahanIsi = ruang.querySelector('.bahan-isi');
    notesData.forEach(note => {
        const noteItem = document.createElement('div');
        noteItem.className = 'content';

        noteItem.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.body}</p>
            <small>Dibuat pada: ${new Date(note.createdAt).toLocaleDateString()}</small>
            <div class="action-tombol">
                <button class="edit-note" data-id="${note.id}">Edit</button>
                <button class="delete-note" data-id="${note.id}">Hapus</button>
            </div>
        `;
        bahanIsi.appendChild(noteItem);

        const deletebtn = noteItem.querySelector('.delete-note');
        deletebtn.addEventListener('click', () => hapus(note.id));

        const editbtn = noteItem.querySelector('.edit-note');
        editbtn.addEventListener('click', () => edit(note.id));
    });
    catatan.appendChild(ruang);
}

tombol.addEventListener("click", showNoteform);
renderNotes();

