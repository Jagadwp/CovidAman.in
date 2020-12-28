import DataSource from './data-source.js';
import './search-bar.js';

const find = () => {
    const searchElement = document.querySelector("search-bar");

    const onButtonSearchClicked = () => {
        DataSource.searchClub(searchElement.value) // << contoh get
            .then(responseJson => {
                foreignConfirmed(responseJson.confirmed);
                foreignRecovered(responseJson.recovered);
                foreignDeaths(responseJson.deaths);
            })
            .catch(error => {
                showResponseMessage(error);
            });
    };

    const foreignConfirmed = (keterangan) => {
        const dataBox = document.querySelector("#foreign-confirmed");
        dataBox.innerHTML = "";
        dataBox.innerHTML += `
                                <div>${keterangan.value}<div>
                            `;
    };
    const foreignRecovered = (keterangan) => {
        const dataBox = document.querySelector("#foreign-recovered");
        dataBox.innerHTML = "";
        dataBox.innerHTML += `
                                <div>${keterangan.value}<div>
                            `;
    };
    const foreignDeaths = (keterangan) => {
        const dataBox = document.querySelector("#foreign-deaths");
        dataBox.innerHTML = "";
        dataBox.innerHTML += `
                                <div>${keterangan.value}<div>
                            `;
    };

    const showResponseMessage = (message = "Request data belum berhasil") => {
        alert(message);
    };

    searchElement.clickEvent = onButtonSearchClicked;
    ///contoh set^^
};



export default find;





