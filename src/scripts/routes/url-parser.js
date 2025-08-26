const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    const urlSplit = this._urlSplitter(url);
    return this._urlCombiner(urlSplit);
  },

  _urlSplitter(url) {
    const segments = url.split('/');
    return {
      resource: segments[1] || null,
      id: segments[2] || null,
    };
  },

  _urlCombiner({ resource, id }) {
    return id ? `/${resource}/:id` : `/${resource || ''}`;
  }
};

export default UrlParser;
