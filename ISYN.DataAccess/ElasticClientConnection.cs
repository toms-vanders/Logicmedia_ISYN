using System;
using System.Collections.Generic;
using System.Text;
using Nest;

namespace ISYN.DataAccess
{
    /// <summary>
    /// This class creates a connection to Elasticsearch server
    /// </summary>
    public class ElasticClientConnection
    {
        public static ElasticClient GetElasticClient()
        {
            //Sets the uri for ES server
            var server = new Uri("http://search.aensland.tech");

            //Sets connection configuration options
            var settings = new ConnectionSettings(server)
                .DefaultIndex("notes")
                .RequestTimeout(TimeSpan.FromMinutes(2))
                .BasicAuthentication("toms", "helloworld");

            return new ElasticClient(settings);
        }
    }
}