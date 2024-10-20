import "./style/style.css";
import "./web component/index.js";

const baseUrl = "https://notes-api.dicoding.dev/v2"; //API
const tombol = document.getElementById("Add");
const catatan = document.getElementById("NoteList");

function LoadIndicator() {
  const loadingIndicator = document.querySelector(".loadingIndicator");
  if (loadingIndicator) {
    loadingIndicator.style.display = "flex";
  }
}

function sideIndicator() {
  const loadingIndicator = document.querySelector(".loadingIndicator");
  if (loadingIndicator) {
    loadingIndicator.style.display = "none";
  }
}

async function getNotes() {
  LoadIndicator();
  tombol.style.display = "none";
  try {
    const response = await fetch(`${baseUrl}/notes`);
    const result = await response.json();
    setTimeout(() => {
      sideIndicator();
      if (result.error) {
        console.error(result.message);
      } else {
        renderNotes(result.data);
        tombol.style.display = "block";
      }
    }, 1000);
  } catch (error) {
    sideIndicator();
    console.error("Gagal mengambil catatan:", error);
    tombol.style.display = "block";
  }
}

async function addNoteToAPI(title, body) {
  const judulError = document.getElementById("JudulError");
  const isiError = document.getElementById("IsiError");

  if (judulError.textContent !== "" || isiError.textContent !== "") {
    console.log("catatan tidak dapat dikirim");
    return;
  }

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Catatan Berhasil Ditambahkan",
    showConfirmButton: false,
    timer: 2000,
  }).then(async () => {
    LoadIndicator();
    tombol.style.display = "none";

    try {
      const response = await fetch(`${baseUrl}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": "12345",
        },
        body: JSON.stringify({ title, body }),
      });

      const result = await response.json();

      setTimeout(() => {
        sideIndicator();
        tombol.style.display = "block";

        if (result.status === "success") {
          console.log("Catatan berhasil ditambahkan");
          getNotes();
        }
      }, 1000); // Loading berlangsung 1 detik
    } catch (error) {
      sideIndicator();
      tombol.style.display = "block";
      console.error("Gagal menambahkan catatan:", error);
    }
  });
}

async function deleteNoteFromAPI(noteId) {
  Swal.fire({
    title: "Apakah Kamu yakin?",
    text: "Peringatan: Catatan yang akan dihapus tidak dapat dipulihkan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Lanjutkan",
    cancelButtonText: "Batalkan",
  }).then(async (result) => {
    if (result.isConfirmed) {
      LoadIndicator();
      try {
        const response = await fetch(`${baseUrl}/notes/${noteId}`, {
          method: "DELETE",
          headers: {
            "X-Auth-Token": "12345",
          },
        });

        const result = await response.json();
        setTimeout(() => {
          sideIndicator();
          if (result.status === "success") {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Catatan berhasil dihapus",
              showConfirmButton: false,
              timer: 2000,
            });
            getNotes();
          }
        }, 1000); // Loading berlangsung 1 detik
      } catch (error) {
        sideIndicator();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Gagal menghapus catatan!",
        });
        console.error("Gagal menghapus catatan:", error);
      }
    }
  });
}

function showNoteform() {
  console.log("Tombol + sudah ditekan");
  tombol.style.display = "none";
  const formHTML = `
        <div class="note-page">
        <div class="note-form">
                <h1>Silahkan Masukkan Catatan Baru</h1>
                <form id="NoteFormulir" class="note-formulir">
            <div class="form-class">
            <div class="form-judul">
                <input type="text" id="NoteJudul" name="note-judul" placeholder="Masukkan Judul" maxlength="60" required>
                <div id="JudulError" class="judul-error"></div>
                <small id="HitungCharJudul" class="char-count">0/60</small>
            </div>
            <div class="form-isi">
                <textarea name="note-isi" id="NoteIsi" cols="30" rows="10" placeholder="Masukkan Deskripsi" maxlength="150" required></textarea>
                <div id="IsiError" class="isi-error"></div>
                <small id="HitungCharIsi" class="char-count-desc">0/150</small>
            </div>
                <button type="submit" class="tombol-submit">Masukkan ke Catatan</button>
                <button type="button" id="CancelButton" class="tombol-cancel">Batalkan</button>
            </div>
                </form>
        </div>
        </div>
    `;
  catatan.innerHTML = formHTML;

  const judulInput = document.getElementById("NoteJudul");
  const isiInput = document.getElementById("NoteIsi");

  judulInput.addEventListener("input", updateJumlahCharJudul);
  isiInput.addEventListener("input", updateJumlahCharIsi);

  judulInput.addEventListener("input", validasiTitle);
  isiInput.addEventListener("input", validasiContent);

  const form = document.getElementById("NoteFormulir");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const title = judulInput.value.trim();
    const body = isiInput.value.trim();
    addNoteToAPI(title, body);
  });

  const cancelbtn = document.getElementById("CancelButton");
  cancelbtn.addEventListener("click", () => {
    tombol.style.display = "block";
    getNotes();
  });
}

function updateJumlahCharJudul() {
  const judulInput = document.getElementById("NoteJudul");
  const hitungCharJudul = document.getElementById("HitungCharJudul");
  hitungCharJudul.textContent = `${judulInput.value.length}/60`;
}

function updateJumlahCharIsi() {
  const isiInput = document.getElementById("NoteIsi");
  const hitungCharIsi = document.getElementById("HitungCharIsi");
  hitungCharIsi.textContent = `${isiInput.value.length}/150`;
}

function validasiTitle() {
  const judulInput = document.getElementById("NoteJudul");
  const judulError = document.getElementById("JudulError");

  if (judulInput.value.length < 8) {
    judulError.textContent = "Judul harus minimal 8 karakter";
    judulError.style.display = "block";
  } else {
    judulError.textContent = "";
    judulError.style.display = "none";
  }
}

function validasiContent() {
  const isiInput = document.getElementById("NoteIsi");
  const isiError = document.getElementById("IsiError");

  if (isiInput.value.length < 15) {
    isiError.textContent = "Deskripsi harus minimal 15 karakter";
    isiError.style.display = "block";
  } else {
    isiError.textContent = "";
    isiError.style.display = "none";
  }
}

// Fungsi untuk menampilkan catatan dari API
function renderNotes(notes) {
  const noteListElement = document.createElement("note-list");
  noteListElement.note = notes;

  noteListElement.addEventListener("delete-note", (event) => {
    const noteId = event.detail.noteId;
    deleteNoteFromAPI(noteId);
  });

  catatan.innerHTML = "";
  catatan.appendChild(noteListElement);
}

document.addEventListener("DOMContentLoaded", () => {
  tombol.addEventListener("click", showNoteform);
  getNotes();
});
