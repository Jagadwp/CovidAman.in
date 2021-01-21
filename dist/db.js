//init DB
const db = firebase.firestore();

db.enablePersistence().catch((err) => {
	if (err.code === "unimplemented") {
		console.log("persistence is not available");
	}
});

//untuk realtime
const col = db.collection("keluhan");
col.onSnapshot((snapshot) => {
	snapshot.docChanges().forEach((change) => {
		// console.log(change.doc.data());
		if (change.type === "added") {
			displayCases(change.doc.data(), change.doc.id);
		}
		if (change.type === "modified") {
			displayEditCases(change.doc.data(), change.doc.id);
		}
		if (change.type === "removed") {
			removeCases(change.doc.id);
		}
	});
});

//create data
const addForm = document.querySelector('.add-case');
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const kasus = {
    kelamin: addForm.kelamin.value,
    umur : parseInt(addForm.umur.value),
    gejala : addForm.gejala.value
  };
  col.add(kasus)
    .then( docRef => M.toast({html: `Data kasus berhasil ditambahkan!`}))
    .catch( err => M.toast({html: `Terdapat kesalahan!`}))
  
  addForm.reset();
});

//handle click icon
const caseContainer = document.querySelector('#daftarKasus');
caseContainer.addEventListener('click', evt => {
  if (evt.target.innerHTML === 'create') {
    const id = evt.target.getAttribute('data-id');
    col.doc(id).get()
      .then( doc => {
        if (doc.exists) {
          const rightForm = document.querySelector('#right-form');
          const data = doc.data();
          rightForm.querySelector('#kelamin').value = data.kelamin;
          rightForm.querySelector('#umur').value = data.umur;
          rightForm.querySelector('#gejala').value = data.gejala;
          rightForm.querySelector('#case_id').value = id;
          const instance = M.Sidenav.getInstance(rightForm);
          instance.open();
        }
      })
      .catch()

  }else if (evt.target.innerHTML === 'delete_outline'){
    const id = evt.target.getAttribute('data-id');
    col.doc(id).delete()
      .then( doc => M.toast({html: `Kasus berhasil dihapus!`}))
      .catch( err => M.toast({html: `Terdapat kesalahan!`}))
  }
})

//handle submit edit form
const editForm = document.querySelector('.edit-case');
editForm.addEventListener('submit', e => {
  e.preventDefault();
  const id = editForm.case_id.value
  const kasus = {
    kelamin: editForm.kelamin.value,
    umur : parseInt(editForm.umur.value),
    gejala : editForm.gejala.value
  };
  col.doc(id).set(kasus)
    .then( docRef => M.toast({html: `Kasus berhasil diupdate!`}))
    .catch( err => M.toast({html: `Terdapat kesalahan!`}))
  
  editForm.reset();
})

