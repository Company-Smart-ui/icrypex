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
    const { max, value } = hero_range;
    const percent = (value / max * 100).toFixed(0);    

    line.style.setProperty('--perc', `${percent}%`);
    heroRangeBulletsPainter(parent, value, max);
  }

  function heroRangeBulletsPainter(parent, value, max) {
    const bullets = parent.querySelectorAll('.range__bullets i');

    console.log('---');

    for(let i = 1; i < bullets.length; i++) {
      if ( ((max / 7) * i) > +value ) {
        bullets[i].parentNode.dataset.step = i;
        console.log('step = ', i);
        break;
      } else {
        bullets[i].parentNode.dataset.step = bullets.length;
      }
      console.log(((max / 7) * i), value);
    }

    // bullets.forEach((bl, i) => {    
    //   if ( ((max / 7) * i) > +value ) {
    //     bl.parentNode.dataset.step = i;
    //     console.log('step = ', i);
    //   }
    //   console.log(((max / 7) * i), value);
    // });
  }

  
});
