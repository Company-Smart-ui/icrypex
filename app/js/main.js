window.addEventListener('load', function() {

  const hero_range = document.querySelector('#hero_range');
  const qr_modal = document.querySelector('#qr_modal');
  


  document.addEventListener('click', e => {
    const t = e.target;
    const t_c = t.classList;

    if (t_c.contains('dropdown__title')) dropdownHandler.call(t);
    if (t_c.contains('select__title')) selectHandler.call(t);
    if (t_c.contains('open_qr') || t.closest('.open_qr')) qrModalOpener.call(t);
    if (t_c.contains('open_qr') || t.closest('.open_qr')) qrModalOpener.call(t);
    if (t_c.contains('close') || t.closest('.close')) modalCloser.call(t);
    if (t_c.contains('copy_id') || t.closest('.copy_id')) copyTrigger.call(t);
    if (t_c.contains('copy_link') || t.closest('.copy_link')) copyTrigger.call(t);
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
        bullets[i].parentNode.dataset.step = i;
        break;
      }
    }
  }

  function qrModalOpener() {
    qr_modal.classList.add('active');
  }

  function modalCloser() {
    const modal = this.closest('.modal');

    if (!modal) return;

    modal.classList.remove('active');
  }

  function copyTrigger() {
    const val = this.innerText;
    const tmp = document.createElement('input');
    document.body.appendChild(tmp);
    tmp.value = val;
    tmp.focus();
    tmp.select();
    document.execCommand('copy');
    tmp.remove();
    window.scrollTo(0, 0);
    this.classList.add('copied');
  }

  
});
