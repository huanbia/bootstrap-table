using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.utils;

namespace WebApplication1.ashx
{
    public class TableRelation {
        public string id;
        public string table1;
        public List<string> table1Relation;
        public string table2;
        public List<string> table2Relation;
    }
    /// <summary>
    /// index5 的摘要说明
    /// </summary>
    public class index5 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "json";
            String temp = context.Request.QueryString["relation"];
            List<TableRelation> tt = JsonHelper.DeserializeJsonToList<TableRelation>(temp);
            context.Response.Write("Hello World");
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}