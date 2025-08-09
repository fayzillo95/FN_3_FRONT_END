document.querySelector('.menu').addEventListener('click', function () {
    console.log(document.querySelector('.header-nav-toggle__items').classList)
    document.querySelector('.header-nav-toggle__items').classList.toggle('active');
    setTimeout(() => {
        document.querySelector('.header-nav-toggle__items').style.rigth = 0
    },2000)
});
