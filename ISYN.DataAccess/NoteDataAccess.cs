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

        public IEnumerable<string> GetNotes(string content)
        {
            ElasticClient client = ElasticClientConnection.GetElasticClient();

            var searchResponse = client.Search<Note>(s => s
                .Size(15)
                .Query(q => q
                    .Match(m => m
                        .Field(f => f.Content)
                        .Fuzziness(Fuzziness.Auto)
                        .Query(content)
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

        public void InsertNote(string content)
        {
            ElasticClient client = ElasticClientConnection.GetElasticClient();

            var note = new Note(content);

            var indexResponse = client.IndexDocument(note);
        }

        public IEnumerable<string> SearchAsYouType(string content)
        {
            ElasticClient client = ElasticClientConnection.GetElasticClient();

            var searchResponse = client.Search<Note>(s => s
                .Index("notes_sayt")
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
