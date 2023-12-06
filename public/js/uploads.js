document.querySelectorAll('ul#file-list li a').forEach(function (link) {
    link.addEventListener('click', function () {
      this.classList.add('clicked');
    });
  });

  