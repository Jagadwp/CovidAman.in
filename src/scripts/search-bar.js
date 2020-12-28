class SearchBar extends HTMLElement {

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    set clickEvent(event) {
        this._clickEvent = event;
        this.render();
    }

    get value() {
        return this.shadowDOM.querySelector("#searchElement").value;
    }

    render() {
        this.shadowDOM.innerHTML = `
        <style>
        .search-container {
            margin-top: 3%; 
            max-width: 831px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            padding: 16px;
            border-radius: 8px;
            display: flex;
            position: relative;
            background-color: white;
            font-family: 'Montserrat', sans-serif;
        }

        .search-container > input {
            width: 75%;
            padding: 16px;
            border: 0;
            border-bottom: 1px solid #dc3545;
            font-weight: bold;
            font-family: 'Montserrat', sans-serif;
            
        }
        
        .search-container > input:focus {
            outline: 0;
            border-bottom: 2px solid #dc3545;
        }
        
        .search-container > input:focus::placeholder {
            font-weight: bold;
            font-family: 'Ubuntu', sans-serif;
        }
        
        .search-container >  input::placeholder {
            color: #494738;
            font-weight: normal;
            font-family: 'Ubuntu', sans-serif;
        }
        
        .search-container > button {
            width: 23%;
            cursor: pointer;
            margin-left: auto;
            padding: 16px;
            background-color: #dc3545;
            color: white;
            border: 0;
            text-transform: uppercase;
            font-family: 'Ubuntu', sans-serif;
            letter-spacing: 1px;
            border-radius: 5px;
        }
        
        @media screen and (max-width: 550px){
            .search-container {
                flex-direction: column;
                position: static;
            }
        
            .search-container > input {
                width: 100%;
                margin-bottom: 12px;
            }
        
            .search-container > button {
                width: 100%;
            }

            .search-container > input:focus::placeholder {
                font-weight: bold;
                font-family: 'Ubuntu', sans-serif;
            }
            
            .search-container >  input::placeholder {
                color: #494738;
                font-size: 0.75rem;
                font-weight: normal;
                font-family: 'Ubuntu', sans-serif;
            }
        }
       </style>

        <div id="search-container" class="search-container">
            <input placeholder="Ex: 'spain', 'US' ( dlm B.Inggris )" id="searchElement" type="search">
            <button id="searchButtonElement" type="submit">Search</button>
        </div>
        `;

        this.shadowDOM.querySelector("#searchButtonElement").addEventListener("click", this._clickEvent);

    }
}

customElements.define("search-bar", SearchBar);