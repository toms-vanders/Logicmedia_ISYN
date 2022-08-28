<!-- ABOUT THE PROJECT -->
## Project Description
Main goal for the project was to implement incremental search using Elasticsearch that would that would return relevant results not dependent on specific phrasing, spelling errors, extra spacing, or order of the words and recognize the most relevant results based on the search input and display them in order. The functionality is provided through API so it can be used by different clients.

Elasticsearch CRUD queries were implemented using .NET client. Main search query uses combination of Match, Match Phrase Query and Rank Feature to try and search for the most relevant results. It also supports fuzzy matching.

<!-- CONTRIBUTORS -->
## Acknowledgments

Project was done in collaboration with company Logicmedia A/S in Aalborg as part of 4th Semester Computer Science programme at UCN.

Contributor names and github profiles:

[Toms Vanders](https://github.com/toms-vanders)

[Adrian Mihai Dohot](https://github.com/AlexanderADM)

[Alanis Mirko](https://github.com/alanismirko)

[Mikas Kentra](https://github.com/mikaske)
