import React from 'react'

const useFetch = () => {
    const urlAPI = 'https://chamados-posweb.herokuapp.com/'
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(null);
  
    const request = React.useCallback(async (url, options) => {
      let response;
      let json;
      try {
        setError(null);
        setLoading(true);
        response = await fetch(urlAPI+url, options);
        json = await response.json();
      } catch (erro) {
        json = null;
        setError('Erro');
      } finally {
        setData(json);
        setLoading(false);
        return { response, json };
      }
    }, []);
  
    return { data, error, loading, request };
}

export default useFetch
