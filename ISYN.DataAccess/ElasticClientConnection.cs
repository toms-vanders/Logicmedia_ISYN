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
            //var local = new Uri("http://localhost:9200");
            var server = new Uri("http://search.aensland.tech");

            var settings = new ConnectionSettings(server)
                .DefaultIndex("notes")
                .RequestTimeout(TimeSpan.FromMinutes(2))
                .BasicAuthentication("toms", "helloworld"); ;

            return new ElasticClient(settings);
        }
    }
}