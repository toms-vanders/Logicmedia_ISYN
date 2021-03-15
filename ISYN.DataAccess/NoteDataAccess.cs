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

            var notes = searchResponse.Documents;

            var notesContent = new List<string>();

            foreach (var note in notes)
            {
                notesContent.Add(note.Content);
            }

            return notesContent;

        }
    }
}
