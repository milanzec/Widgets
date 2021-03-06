import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [term, setTerm] = useState('reactJS');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: debouncedTerm,
        },
      });
      setResults(data.query.search);
    };
    search();
  }, [debouncedTerm]);

  const renderedResult = results.map((res) => {
    return (
      <div className="item" key={res.pageid}>
        <div className="right floated content">
          <a
            href={`https://en.wikipedia.org?curid=${res.pageid}`}
            className="ui button"
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{res.title}</div>
          <span dangerouslySetInnerHTML={{ __html: res.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div className="search-bar ui segment">
      <div className="ui form">
        <div className="field">
          <label>
            Enter Search Term
            <input
              className="input"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="ui celled list">{renderedResult}</div>
    </div>
  );
};

export default Search;
