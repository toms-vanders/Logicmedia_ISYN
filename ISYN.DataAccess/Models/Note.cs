using System;
using System.Collections.Generic;
using System.Text;

namespace ISYN.DataAccess.Models
{
    public class Note
    {
        public string Content { get; set; }

        public Note()
        {

        }

        public Note(string content)
        {
            this.Content = content;
        }
    }
}
