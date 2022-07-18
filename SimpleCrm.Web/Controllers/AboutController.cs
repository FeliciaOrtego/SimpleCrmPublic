using Microsoft.AspNetCore.Mvc;

namespace SimpleCrm.Web.Controllers
{
    [Route("About")]

    public class AboutController
    {
        [Route("ph")]
        public string Phone()
        {
            return "636-900-2497";
        }

        [Route("add")]
        public string Address()
        {
            return "USA";
        }
    }


}
