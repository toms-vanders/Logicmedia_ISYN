using System;
using System.Collections.Generic;
using System.Text;

namespace ISYN.DataAccess.Models
{
    /// <summary>
    /// POCO for mapping Elasticsearch Document
    /// </summary>
    public class Note
    {
        /// <value> Id of the document. For new documents ES automatically generates ID</value>
        public string Id { get; set; }
        /// <value> The content of the document </value>
        public string Content { get; set; }
        /// <value> The rank of the document that measures it's popularity</value>
        public int Rank { get; set; }
        /// <value> The score of document. For demonstrational purposes only.</value>
        public string Score { get; set; }

        public Note()
        {

        }
    }
}
