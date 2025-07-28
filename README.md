# hs-code-search-engine
HS Code Commodity Search Engine built with React, Node.js, Algolia, and Claude for Algolia MCP Challenge

## What I Built
I developed an HS Code Commodity Search Engine for the Algolia MCP Server Challenge. This web app enables users to search Harmonized System (HS) codes, filter by categories and tariffs, and analyze tariff differences using Anthropic’s Claude AI. Hosted with a Node.js backend on Heroku and a React frontend on Vercel, it targets trade-related needs.

**Benefit for Users:**
- For exporters, tariff analysis offers critical insights before exporting, aiding decision-making.
- For government users, Algolia provides a searchable, public-facing tariff database, simplifying commodity information access.


## Key Project Features

- **Search**: Algolia powers fast HS code and commodity lookups.

- **Filters**: Category and tariff filters refine results for a tailored experience.

- **Tariff Analysis**: Claude AI delivers real-time tariff difference insights.


## Demo
Explore the live demo at [Vercel URL](https://hs-code-commodity-search.vercel.app/) and [YouTube](https://youtu.be/4f3vgrcSPzQ). Search "horses," filter by "Live Animals," and click “Analyze Tariffs with Claude” to see the analysis.

![App Screenshot](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mimrbk66wyq9b4h50szz.png)


## Repo
The code is on [GitHub](https://github.com/ihsanandrinal/hs-code-search-engine) under the MIT License, open for collaboration.


## How I Utilized the Algolia MCP Server
I used the Algolia MCP Server to index a dataset of 39 dummy commodities with HS codes, tariffs for Indonesia and the USA, and categories. The backend leverages Algolia’s search API for efficient queries and facet-based filtering, demonstrating robust platform utilization.


## Innovative Approach to Algolia Usage
The innovation combines Algolia’s search with Claude AI for tariff analysis. While Algolia retrieves data, Claude processes it for insights, enhanced by planned synonym support (e.g., "timber," "lumber" for "wood") to boost relevance.


## How It Worked Step by Step

1. **Data Preparation**: Parsed a CSV with dummy HS code data.
2. **Algolia Indexing**: Indexed data with facets for filters.
![Code snippet](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fs20qys9i986qrtw350b.png)

3. **Backend Setup**: Built a Node.js server with Express for search/enrich endpoints.
4. **AI Integration**: Integrated Claude API for analysis.
5. **Frontend Development**: Developed a React app with Tailwind CSS, linking to the backend.
6. **Deployment**: Deployed on Heroku and Vercel, ensuring port compatibility.

![Flow](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zl6158t4dbkbs13fbd2i.png)


## Key Challenges

- **CSV Parsing Issues**: Handled malformed dummy data with validation.
- **Duplicate Records**: Added deduplication logic in Algolia.
- **Facet Configuration**: Iterated to ensure accurate filtering.


## Key Takeaways

- Algolia’s speed and facets transform data-driven apps.
- Claude integration adds value but requires API optimization.
- Heroku/Vercel deployment was streamlined, though port setup was tricky.


## Next Development and Current Limitations

- **Current Limitations**: The app uses dummy data comparing Indonesia and USA tariffs, covering only 39 commodities—not all HS codes.
- **Next Steps**: Expand to other countries with multilingual support (e.g., Spanish, Mandarin), automate tariff updates with n8n, and configure Algolia to recognize synonyms like "timber" and "lumber" as related to "wood" for better relevance.


## Conclusion
Thanks to the DEV Community and Algolia MCP Server Challenge team! The project is open-source under the MIT License—contribute on [GitHub](https://github.com/ihsanandrinal/hs-code-search-engine). Test it at [Vercel URL](https://hs-code-commodity-search.vercel.app/)!
