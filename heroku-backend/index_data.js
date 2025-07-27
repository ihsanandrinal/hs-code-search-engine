const algoliasearch = require('algoliasearch');
     const fs = require('fs');
     const { parse } = require('csv-parse');

     const client = algoliasearch('MXRRPKCZEL', '23b0ee14c07cb8694e79e9c4bb231fab');
     const index = client.initIndex('hs_codes');

     const records = [];

     index.clearObjects().then(() => {
       console.log('Existing index cleared');
       fs.createReadStream('hs_codes.csv')
         .pipe(
           parse({
             columns: true,
             skip_empty_lines: true,
             trim: true,
             quote: '"',
             escape: '"',
             skip_lines_with_error: true
           })
         )
         .on('data', (row) => {
           records.push({
             hs_code: row.hs_code.trim(),
             commodity: row.commodity.trim(),
             indonesia_tariff: row.indonesia_tariff.trim(),
             usa_tariff: row.usa_tariff.trim(),
             category: row.category.trim()
           });
         })
         .on('end', () => {
           index
             .saveObjects(records, { autoGenerateObjectIDIfNotExist: true })
             .then(() => {
               console.log('Data indexed successfully');
               index.setSettings({
                 searchableAttributes: ['hs_code', 'commodity', 'category'],
                 attributesForFaceting: ['category', 'indonesia_tariff', 'usa_tariff']
               }).then(() => console.log('Settings and facets configured'));
             })
             .catch(err => console.error('Error indexing data:', err));
         })
         .on('error', (err) => console.error('Error parsing CSV:', err));
     }).catch(err => console.error('Error clearing index:', err));