using Microsoft.AspNetCore.Mvc;

namespace SimpleCrm.Web.ViewComponents
{
    public class GreetingViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke()
        {
            return View("Default", "Hello");
        }
    }
}
