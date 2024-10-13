import notesData from "../data/notes.js";

class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); 
    this.notes = notesData;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = '';

    // Menambahkan link ke file CSS
    const style = document.createElement('style');
    style.textContent = `
    .note-list {
        display: block;
      }

      .note-listing .bahan-ruang {
        padding-top: 5%;
        display: grid;
      }

      .note-listing .bahan-ruang .judul-notes {
        padding-top: 1em;
        text-align: center;
      }

      .note-listing .bahan-ruang hr {
        width: 90%;
        border: 1.8px solid #ff7300;
        margin: 1em auto;
      }

      .note-listing .bahan-isi {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        align-items: center;
        justify-items: center;
        gap: 4em;
        padding: 2.5em;
      }

      .note-listing .bahan-ruang .bahan-isi .content {
        background-color: white;
        opacity: 0.8;
        border: none;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        width: 100%;
        max-width: 300px;
        height: 100%;
        padding: 1em;
        text-align: left;
      }

      .note-listing .bahan-ruang .bahan-isi .content p {
        padding-top: 1em;
        font-size: 1.1em;
        line-height: 1.4em;
        color: #333;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .note-listing .bahan-ruang .bahan-isi .content h2 {
        margin-bottom: 0.5em;
        font-size: 1.2em;
      }

      .note-listing .bahan-ruang .bahan-isi .content small {
        font-size: 0.9;
        margin-top: 1px;
        color: #666;
      }

      .action-tombol {
        display: flex;
        justify-content: space-between;
        margin-top: 1em;
      }

      .action-tombol button {
        margin-top: 1em;
        border: none;
        padding: 0.7em 3em;
        border-radius: 5px;
        font-size: 1em;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
      }

      .action-tombol .edit-note {
        background-color: #0a0eec;
        color: #edf9fc;
      }

      .action-tombol .delete-note {
        background-color: #f34646;
        color: white;
      }

      .action-tombol button:hover {
        opacity: 0.8;
      }
    `;
    this.shadowRoot.appendChild(style);

    // Bungkus konten dalam div dengan class 'note-listing'
    const wrapper = document.createElement('div');
    wrapper.className = 'note-listing';
    wrapper.innerHTML = `
      <div class="bahan-ruang">
        <h1 class="judul-notes">Catatan Kegiatan yang Harus Dikerjakan</h1>
        <hr>
        <div class="bahan-isi">
          ${this.notes.map(note => `
            <div class="content">
              <h2>${note.title}</h2>
              <p>${note.body}</p>
              <small>Dibuat pada: ${new Date(note.createdAt).toLocaleDateString('id-ID')}</small>
              <div class="action-tombol">
                <button class="edit-note" data-id="${note.id}">Edit</button>
                <button class="delete-note" data-id="${note.id}">Hapus</button>
              </div>
            </div>`).join('')}
        </div>
      </div>
    `;

    this.shadowRoot.appendChild(wrapper);

    // Tambahkan event listener untuk edit dan delete
    const editButtons = this.shadowRoot.querySelectorAll('.edit-note');
    const deleteButtons = this.shadowRoot.querySelectorAll('.delete-note');

    editButtons.forEach(button => {
      button.addEventListener('click', () => {
        const noteId = button.getAttribute('data-id');
        this.dispatchEvent(new CustomEvent('edit-note', { detail: { noteId } }));
      });
    });

    deleteButtons.forEach(button => {
      button.addEventListener('click', () => {
        const noteId = button.getAttribute('data-id');
        this.dispatchEvent(new CustomEvent('delete-note', { detail: { noteId } }));
      });
    });
  }
}

customElements.define("note-list", NoteList);
