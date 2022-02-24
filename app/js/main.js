window.addEventListener('load', function() {

  const hero_range = document.querySelector('#hero_range');


  document.addEventListener('click', e => {
    const t = e.target;
    const t_c = t.classList;

    if (t_c.contains('dropdown__title')) dropdownHandler.call(t);
    if (t_c.contains('select__title')) selectHandler.call(t);
  });

  hero_range.addEventListener('input', heroRangeHandler);

  heroRangeHandler();





  // handlers & helpers

  function dropdownHandler () {
    this.parentNode.classList.toggle('active');
  }

  function selectHandler () {
    this.parentNode.classList.toggle('active');
  }

  function heroRangeHandler() {
    const parent = hero_range.parentNode;
    const line = parent.querySelector('.range__line');
    const { max, value, step } = hero_range;
    const percent = (value / max * 100).toFixed(0);    

    line.style.setProperty('--perc', `${percent}%`);
    heroRangeBulletsPainter(value, step, parent);
  }

  function heroRangeBulletsPainter(value, step, parent) {
    const bullets = parent.querySelectorAll('.range__bullets i');

    for(let i=0; i<bullets.length;i++) {
      if (step * i == value) {
        console.log(i, value);
        bullets[i].parentNode.dataset.step = i;
        break;
      }
    }
  }

  
});
