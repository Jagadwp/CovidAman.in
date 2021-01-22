document.addEventListener("DOMContentLoaded", function () {
	// nav menu
	const menus = document.querySelectorAll(".side-menu");
	M.Sidenav.init(menus, { edge: "right" });
	// add recipe form
	const forms = document.querySelectorAll(".side-form");
	M.Sidenav.init(forms, { edge: "left" });

	const rightForms = document.querySelectorAll(".right-form");
	M.Sidenav.init(rightForms, { edge: "right" });
});

const displayCases = (data, id) => {
	const kasus = `
      <div class="col s12 m6 l4">
         <div class="card-panel case row" data-id="${id}">
            <div class="case-details col" style="width: 80%">
               <div class="row" style="margin-bottom: 10px">
                  <div class="case-kelamin col" style="padding-right: 5px"><em>${data.kelamin},</em></div>
                  <div class="case-umur col" style="padding: 0"><em>${data.umur} tahun</em></div>
               </div>
               <div class="case-gejala">${data.gejala}</div>
            </div>
            <div class="case-modif col" style="cursor: pointer; width: 20%">
               <div class="row">
                  <div class="col s12">
                     <i class="material-icons" data-id="${id}">create</i>
                  </div>
                  <div class="col s12">
                     <i class="material-icons" data-id="${id}">delete_outline</i>
                  </div>
               </div>
            </div>
         </div>
      </div>
   `;
	const casesContainer = document.querySelector("#daftarKasus");
	casesContainer.innerHTML += kasus;
};

const displayEditCases = (data, id) => {
	const kasus = document.querySelector(`.case[data-id ="${id}"]`);
	kasus.querySelector(".case-kelamin").innerHTML = data.kelamin;
	kasus.querySelector(".case-umur").innerHTML = data.umur;
	kasus.querySelector(".case-gejala").innerHTML = data.gejala;
};

const removeCases = (id) => {
	const kasus = document.querySelector(`.case[data-id ="${id}"]`);
	kasus.remove();
};
