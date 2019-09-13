
export default class UrlHelper {
  constructor() {
    this._params = {};
  }

  get params() {
    let match;
    const pl = /\+/g; // Regex for replacing addition symbol with a space
    const search = /([^&=]+)=?([^&]*)/g;
    const decode = function (s) { return decodeURIComponent(s.replace(pl, ' ')); };
    const query = window.location.search.substring(1);

    while (match = search.exec(query)) {
      this._params[decode(match[1])] = decode(match[2]);
    }
    return this._params;
  }

  // ler os parâmetros na query string e criar um array associativo
  // TODO dava pra isolar esse código em um modulo
}
