export default class gotService {
    constructor() {
        this._apiBase = "https://anapioficeandfire.com/api";
    }
    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    }
     getAllCharacters = async () => {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter);
    }
     getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }
     getAllBooks = async () => {
        const res = await this.getResource(`/books/`);
        return res.map(this._transformBook);
    }
     getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }
     getAllHouses = async () => {
        const res = await this.getResource(`/houses/`);
        return res.map(this._transformHouse);
    }
     getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }
    isSetData = (data) => {
        if (data) {
            return data
        } else {
            return 'no data';
        }
    }
    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }
    
    _transformCharacter = (character) => {
        return {
            id: this._extractId(character),
            name: this.isSetData(character.name),
            gender: this.isSetData(character.gender),
            born: this.isSetData(character.born),
            died: this.isSetData(character.died),
            culture: this.isSetData(character.culture)
        }
    }
    _transformHouse = (house) => {
        return {
            id: this._extractId(house),
            name: this.isSetData(house.name),
            region: this.isSetData(house.region),
            words: this.isSetData(house.words),
            titles: this.isSetData(house.titles),
            overlord: this.isSetData(house.overlord),
            ancestralWeapons: this.isSetData(house.ancestralWeapons)
        }
    }
    _transformBook = (book) => {
        return {
            id: this._extractId(book),
            name: this.isSetData(book.name),
            numberOfPages: this.isSetData(book.numberOfPages),
            publisher: this.isSetData(book.publisher),
            released: this.isSetData(book.released)
        }
    }
}
