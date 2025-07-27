import React, { useState } from 'react';
     import { InstantSearch, SearchBox, Hits, RefinementList } from 'react-instantsearch-dom';
     import algoliasearch from 'algoliasearch/lite';
     import axios from 'axios';
     import './App.css';

     const searchClient = algoliasearch('MXRRPKCZEL', 'aff6cdc5cb37795daf354b923d60b564');

     const Hit = ({ hit }) => {
       const [analysis, setAnalysis] = useState('');
       const [loading, setLoading] = useState(false);

       const enrichWithClaude = async () => {
         setLoading(true);
         try {
           const response = await axios.post('http://localhost:3001/enrich', {
             commodity: hit.commodity,
             indonesia_tariff: hit.indonesia_tariff,
             usa_tariff: hit.usa_tariff
           });
           setAnalysis(response.data.analysis);
         } catch (err) {
           setAnalysis('Error fetching analysis');
         }
         setLoading(false);
       };

       return (
         <div className="hit">
           <h3>{hit.commodity}</h3>
           <p>HS Code: {hit.hs_code}</p>
           <p>Indonesia Tariff: {hit.indonesia_tariff}</p>
           <p>USA Tariff: {hit.usa_tariff}</p>
           <p>Category: {hit.category}</p>
           <button
             onClick={enrichWithClaude}
             className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
             disabled={loading}
             aria-label={`Analyze tariffs for ${hit.commodity}`}
           >
             {loading ? 'Analyzing...' : 'Analyze Tariffs with Claude'}
           </button>
           {analysis && <p className="mt-2 text-sm">{analysis}</p>}
         </div>
       );
     };

     function App() {
      const [searchState, setSearchState] = useState({});
       return (
         <div className="container mx-auto p-4">
           <h1 className="text-2xl font-bold mb-4">HS Code Commodity Search</h1>
           <InstantSearch
        searchClient={searchClient}
        indexName="hs_codes"
        onSearchStateChange={(state) => setSearchState(state)}
      >
        <SearchBox
          className="mb-4"
          translations={{ placeholder: 'Search by HS code or commodity...' }}
          aria-label="Search for HS codes or commodities"
        />
        <div className="flex">
          <div className="w-1/4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <RefinementList attribute="category" />
            <RefinementList attribute="indonesia_tariff" />
            <RefinementList attribute="usa_tariff" />
          </div>
          <div className="w-3/4">
            <Hits hitComponent={Hit} />
            {searchState.query && searchState.results && searchState.results.nbHits === 0 && <p>No results found.</p>}
          </div>
        </div>
      </InstantSearch>
         </div>
       );
     }

     export default App;