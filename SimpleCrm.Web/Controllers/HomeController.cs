using Microsoft.AspNetCore.Mvc;
using SimpleCrm.Web.Models.Home;
using Microsoft.AspNetCore.Authorization;

namespace SimpleCrm.Web.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly ICustomerData _customerData;

        public HomeController(ICustomerData customerData)
        {
            _customerData = customerData;
        }
        [AllowAnonymous]
        public IActionResult Index()
        {
            var model = new HomePageViewModel();
            model.Customers = _customerData.GetAll();
            return View(model);

        }
        public IActionResult Details(int id)
        {
            Customer cust = _customerData.Get(id);
            if (cust == null)
            {
                return RedirectToAction(nameof(Index));
            }
            return View(cust);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }
       [HttpPost()]
        [ValidateAntiForgeryToken()]
        public IActionResult Create(Customer model)
        {
            if (ModelState.IsValid)
            {
                var customer = new Customer
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    PhoneNumber = model.PhoneNumber,
                    OptInNewsletter = model.OptInNewsletter,
                    Type = model.Type
                };
                _customerData.Add(customer);
                return RedirectToAction(nameof(Details), new { id = customer.Id });
            }
            return View();
        }   
        
        [HttpPost()]
        [ValidateAntiForgeryToken()]

        public IActionResult Edit(CustomerEditViewModel model)
        {
            if(ModelState.IsValid)
            {
                var customer = _customerData.Get(model.Id);


                customer.FirstName = model.FirstName;
                customer.LastName = model.LastName;
                customer.PhoneNumber = model.PhoneNumber;
                customer.OptInNewsletter = model.OptInNewsletter;
                customer.Type = model.Type;

                _customerData.Update(customer);
                return RedirectToAction(nameof(Details), new { id = customer.Id });
            }
            return View();
        }
    }
}

