const scrollToView = (classe: string, cssActive: string) => {
  const itemDiversity = document.querySelectorAll(`${classe}`);
  const scroll = new IntersectionObserver((entry) => {
    entry.forEach((e) => {
      const { target } = e;
      target.classList.toggle(`${cssActive}`, e.isIntersecting);
    });
  }, {});
  itemDiversity.forEach((item) => {
    scroll.observe(item);
  });
};
export default scrollToView;
