using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ISYN.DataAccess.Models;
using Nest;

namespace ISYN.DataAccess
{
    public class NoteDataAccess
    {
        /// <summary>
        /// Simply searches for first 10 notes in the index. For demo purposes only
        /// </summary>
        /// <returns>Returns first 10 notes in the index</returns>
        public IEnumerable<string> GetAllNotes()
        {
            ElasticClient client = ElasticClientConnection.GetElasticClient();

            var searchResponse = client.Search<Note>(s => s
                .MatchAll()
            );

            var resultsList = new List<string>();

            foreach (var note in searchResponse.Documents)
            {
                resultsList.Add(note.Content);
            }

            return resultsList;

        }

        /// <summary>
        /// Main search method for matching text with documents in the ES index. 
        /// </summary>
        /// <param name="content">text that needs to be searched</param>
        /// <returns>Returns list of 10 most relevant notes</returns>
        public IEnumerable<Note> GetNotes(string content)
        {
            ElasticClient client = ElasticClientConnection.GetElasticClient();

            var searchResponse = client.Search<Note>(s => s
                .Query(q => q
                    .Match(m => m
                        .Field(f => f.Content)
                        .Fuzziness(Fuzziness.Auto)
                        .Operator(Operator.Or)
                        .Query(content)
                    ) || q
                    .Match(m => m
                        .Field(f => f.Content)
                        .Fuzziness(Fuzziness.Auto)
                        .Operator(Operator.And)
                        .Query(content)
                    ) || q
                    .MatchPhrase(mp => mp
                        .Field(f => f.Content)
                        .Boost(2)
                        .Query(content)
                    ) || q
                    .RankFeature(rf => rf
                        .Field(f => f.Rank)
                    )
                 )
            );

            List<Note> resultList = new List<Note>();
            
            foreach (var note in searchResponse.Hits)
            {
                resultList.Add(new Note { Id = note.Id, Content = note.Source.Content, Score = note.Score.ToString() });
            }

            return resultList;
        }

        /// <summary>
        /// Inserts a new document in ES index
        /// </summary>
        /// <param name="content">content of the note to be added</param>
        /// <returns>returns true if note was succesfuly added to the index</returns>
        public bool InsertNote(string content)
        {
            ElasticClient client = ElasticClientConnection.GetElasticClient();

            var note = new Note();
            note.Content = content;
            note.Rank = 1;

            var indexResponse = client.IndexDocument(note);

                      
            if (indexResponse.IsValid)
            {
                return true;
            }
            return false;
           
        }

        /// <summary>
        /// Updates document's popularity by increasing specific documents rank by 1
        /// </summary>
        /// <param name="noteId">ID of the ES document</param>
        /// <returns>Returns true if update successful</returns>
        public bool UpdateNote(string noteId)
        {
            ElasticClient client = ElasticClientConnection.GetElasticClient();

            var updateResponse = client.Update<Note>(noteId, u => u
                .Script(script => script
                    .Source("ctx._source.rank += params.rank")
                    .Params(p => p
                        .Add("rank", 1)
                    )
                )
                .RetryOnConflict(5)
            );

            if (updateResponse.IsValid)
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// This method checks if the note exists in the ES index. If so, it updates the documents popularity, if not, it 
        /// creates a new document in index.
        /// </summary>
        /// <param name="content">Content of the document that needs to be posted</param>
        /// <returns></returns>
        public bool PostNote(string content)
        {
            ElasticClient client = ElasticClientConnection.GetElasticClient();

            char[] charsToTrim = { ',', '.', ' ', '@', ';', '!', '?', '"', ':' };

            string trimmedContent = content.Trim(charsToTrim);

            var searchResponse = client.Search<Note>(s => s
                .Query(q => q
                    .Term(t => t
                        .Field(f => f.Content.Suffix("raw"))
                        .Value(trimmedContent)
                    )
                )
            );

            if (searchResponse.IsValid)
            {
                if (searchResponse.Hits.Count > 0)
                {
                    if (UpdateNote(searchResponse.Hits.FirstOrDefault().Id))
                    {
                        return true;
                    }
                }
                else
                {
                    if (InsertNote(trimmedContent))
                    {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}
