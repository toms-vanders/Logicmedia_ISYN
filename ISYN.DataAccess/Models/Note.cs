using System;
using System.Collections.Generic;
using System.Text;

namespace ISYN.DataAccess.Models
{
    public class Note
    {
        public string Id { get; set; }
        public string Content { get; set; }
        public int Rank { get; set; }
        public string Score { get; set; }


        public Note()
        {

        }

        public Note(string content)
        {
            this.Content = content;
        }
    }
}
