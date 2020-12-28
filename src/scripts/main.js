function main() {
    // alert('masuk main');
    const indoPopulation = 268583016;
    const baseUrl = "https://covid19.mathdro.id/api/countries/Indonesia";

    const getdata = () => {
        fetch(`${baseUrl}`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                renderConfirmed(responseJson.confirmed);
                renderRecovered(responseJson.recovered);
                renderDeaths(responseJson.deaths);
            })
            .catch(error => {
                showResponseMessage(error);
            });
    };




    const renderConfirmed = (keterangan) => {
        let kasusPer1Juta = keterangan.value / (indoPopulation / 1000000);
        let fix = kasusPer1Juta.toFixed(0);

        const dataBox = document.querySelector("#stat-confirmed");
        const spanBox = document.querySelector("#fixPer1Juta");

        spanBox.innerHTML = "";
        dataBox.innerHTML = "";
        dataBox.innerHTML += `
            <div>${keterangan.value}<div>
        `;
        spanBox.innerHTML += `${fix} `;


    };

    const renderRecovered = (keterangan) => {
        let positif = document.querySelector("#stat-confirmed").innerText;
        let positifValue = parseInt(positif);
        let sembuhPerPositif = ((keterangan.value / positifValue) * 100).toFixed(2);

        const dataBox = document.querySelector("#stat-recovered");
        const persenSembuh = document.querySelector("#sembuh");

        dataBox.innerHTML = "";
        persenSembuh.innerHTML = "";

        dataBox.innerHTML += `
            <div>${keterangan.value}<div>
        `;
        persenSembuh.innerHTML += `${sembuhPerPositif}% `;
    };

    const renderDeaths = (keterangan) => {
        let positif = document.querySelector("#stat-confirmed").innerText;
        let positifValue = parseInt(positif);
        let matiPerPositif = ((keterangan.value / positifValue) * 100).toFixed(2);

        const dataBox = document.querySelector("#stat-deaths");
        const persenMati = document.querySelector("#mati");

        dataBox.innerHTML = "";
        persenMati.innerHTML = ""

        dataBox.innerHTML += `
            <div>${keterangan.value}<div>
        `;
        persenMati.innerHTML += ` ${matiPerPositif}%`;
    };

    const showResponseMessage = (message = "Request data belum berhasil") => {
        alert(message);
    };

    getdata();
}

export default main;