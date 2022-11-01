import Dashboard from "../../pages/Dashboard.js";
import Posts from "../../pages/Posts.js";
import Products from "../../pages/Products.js";
import NotFound from "../../pages/not-found.js";
const mainDiv = document.querySelector("#app");
// what view show to user based on router?

function router() {
  // کل مسیرها را تعریف کنیم
  const routs = [
    { path: "/", view: Dashboard },
    { path: "/products", view: Products },
    { path: "/posts", view: Posts },
  ];
  // مشخص کنیم الان در نوار ادرس مرورگر چی انتخاب شده  اول یک ارایه درست می کنیم که روی کل مسیرها چک کنه کدوم مسیر الان انتخاب شده
  const potentialRoutes = routs.map((item) => {
    return { route: item, isMatch: location.pathname === item.path };
  });
  //   بعد اون مسیر رو پیدا می کنیم
  let match = potentialRoutes.find((route) => route.isMatch);
  // اگر کاربر ادرس اشتباه وارد کرد یک صفحه ثابت بهش نشون داده بشه مثل صفحه 404
  if (!match) {
    match = {
      route: { path: "/not-found", view: NotFound },
      isMatch: true,
    };
  }
  mainDiv.innerHTML = match.route.view();
}
// می خواهیم تابعی بنویسیم که کاربر را به صفحه جدید هدایت کنه
function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}
// اپ ما یک باگ داشت که فقط کابر بین صفحات با کلیدهای عقب و جلو حرکت می کرد برنامه درست کار نمیکرد
// میخوایم الان کاری کنیم که وقتی هیستوری تغییر میکنه و متد  پاپ استیت صدا زده میشه باز تابع روتر فراخوانی بشه
window.addEventListener("popstate", router);



// side-bar
const sideBarToggler = document.querySelector(".sidebar-toggler");
const sidebar = document.querySelector(".nav");
// document.querySelector(':root') === document.documentElement
const root = document.documentElement;
sideBarToggler.addEventListener("click", () => {
  sidebar.classList.toggle("mini-sidebar");
  if (sidebar.classList.contains("mini-sidebar")) {
    root.style.setProperty("--nav-width", 70 + "px");
  } else {
    root.style.setProperty("--nav-width", 250 + "px");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  //   می خواهیم وقتی صفحه لود میشه لینکهایی که دیتا لینک دارند رو انتخاب کنیم
  //    اول اجازه ندیم صفحه لود بشه بعد بر اساس این ویژگی کاربر رو بین صفحات جابه جا می کنیم
  document.body.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-link")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});

