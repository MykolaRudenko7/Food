function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activeClass
) {
  let tabs = document.querySelectorAll(tabsSelector);
  let tabContents = document.querySelectorAll(tabsContentSelector);
  let tabsWrapper = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabContents.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((tab) => {
      tab.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    tabContents[i].classList.add("show", "fade");
    tabContents[i].classList.remove("hide");

    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  tabsWrapper.addEventListener("click", (e) => {
    const target = e.target;
    //  нова строка, але без першого символу(без крапки)
    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((tab, i) => {
        if (target == tab) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

// module.exports = tabs;
export default tabs;
