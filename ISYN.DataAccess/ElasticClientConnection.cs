using System;
using System.Collections.Generic;
using System.Text;
using Nest;

namespace ISYN.DataAccess
{
    public class ElasticClientConnection
    {
        public static ElasticClient GetElasticClient()
        {
            var local = new Uri("http://localhost:9200");

            var settings = new ConnectionSettings(local).DefaultIndex("notes");

            return new ElasticClient(settings);
        }
    }
}
