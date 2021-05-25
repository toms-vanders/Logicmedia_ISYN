using System;
using System.Collections.Generic;
using System.Text;
using ISYN.DataAccess.Models;
using Nest;

namespace ISYN.DataAccess
{
    public class NoteDataAccess
    {
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

        public bool PostNote(string content)
        {
            ElasticClient client = ElasticClientConnection.GetElasticClient();

            var searchResponse = client.Search<Note>(s => s
                .Query(q => q
                    .Term(t => t
                        .Field(f => f.Content.Suffix("keyword"))
                        .Value(content)
                    )
                )
            );

            if (searchResponse.IsValid)
            {
                return true;
            }
            return false;
        }

        // Won't be really used in our solution, but we can write about it in the report possibily on why we didn't choose this option
        public IEnumerable<string> SearchAsYouType(string content)
        {
            ElasticClient client = ElasticClientConnection.GetElasticClient();

            var searchResponse = client.Search<Note>(s => s
                .Query(q => q
                    .MultiMatch(mm => mm
                        .Query(content)
                        .Type(TextQueryType.BoolPrefix)
                        .Fields(f => f.Field("content").Field("content._2gram").Field("content._3gram"))
                        .Fuzziness(Fuzziness.Auto)
                    )
                )
            );

            var resultsList = new List<string>();

            foreach (var note in searchResponse.Hits)
            {
                resultsList.Add(note.Source.Content + " (Score: " + note.Score + ")");
            }

            return resultsList;
        }
    }
}
