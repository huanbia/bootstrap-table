using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.utils;

namespace WebApplication1.ashx
{
    public class Department{
        public String ID;
        public String Name;
        public String Level;
        public String Desc;
    }
    /// <summary>
    /// index1 的摘要说明
    /// </summary>
    public class index1 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "json";
            int limit = int.Parse(context.Request.Params["limit"]);
            int offset = int.Parse(context.Request.Params["offset"]);
            string departmentname = context.Request.Params["departmentname"];
            string statu = context.Request.Params["statu"];
            var lstRes = new List<Department>();
            for (var i = 0; i < 50; i++)
            {
                var oModel = new Department();
                oModel.ID = i.ToString();
                oModel.Name = "销售部" + i;
                oModel.Level = i.ToString();
                oModel.Desc = "暂无描述信息";
                lstRes.Add(oModel);
            }

            var total = lstRes.Count;
            var rows = lstRes.Skip<Department>(offset).Take(limit).ToList();
            int[] qrow = new int[4] {0,10,19,23};
            var jsonResult = JsonHelper.SerializeObject(new { total = total, rows = rows, qrow = qrow });
            context.Response.Write(jsonResult);
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