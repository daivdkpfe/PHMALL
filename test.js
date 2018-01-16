window.onload=function(){
    var meta = document.createElement('meta');
    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', 'width=device-width');
    document.getElementsByTagName('head')[0].appendChild(meta);
    var imgs = document.getElementsByTagName('div');
    for (var i in imgs) {
    if (i < imgs.length - 1) {
    imgs[i].style.maxWidth = '375px';
    imgs[i].style.height = 'auto';
    }
    }
    var imgs = document.getElementsByTagName('h1');
    for (var i in imgs) {
    if (i < imgs.length - 1) {
    imgs[i].style.maxWidth = '375px';
    imgs[i].style.height = 'auto';
    }
    }
    var imgs = document.getElementsByTagName('h2');
    for (var i in imgs) {
    if (i < imgs.length - 1) {
    imgs[i].style.maxWidth = '375px';
    imgs[i].style.height = 'auto';
    }
    }
    var imgs = document.getElementsByTagName('h3');
    for (var i in imgs) {
    if (i < imgs.length - 1) {
    imgs[i].style.maxWidth = '375px';
    imgs[i].style.height = 'auto';
    }
    }
    var imgs = document.getElementsByTagName('h4');
    for (var i in imgs) {
    if (i < imgs.length - 1) {
    imgs[i].style.maxWidth = '375px';
    imgs[i].style.height = 'auto';
    }
    }
    var imgs = document.getElementsByTagName('h5');
    for (var i in imgs) {
    if (i < imgs.length - 1) {
    imgs[i].style.maxWidth = '375px';
    imgs[i].style.height = 'auto';
    }
    }
    var imgs = document.getElementsByTagName('h6');
    for (var i in imgs) {
    if (i < imgs.length - 1) {
    imgs[i].style.maxWidth = '375px';
    imgs[i].style.height = 'auto';
    }
    }
    var imgs = document.getElementsByTagName('table');
    for (var i in imgs) {
    if (i < imgs.length - 1) {
    imgs[i].style.maxWidth = '375px';
    imgs[i].style.height = 'auto';
    }
    }
    var imgs = document.getElementsByTagName('tr');
    for (var i in imgs) {
    if (i < imgs.length - 1) {
    imgs[i].style.maxWidth = '375px';
    imgs[i].style.height = 'auto';
    }
    }
    var imgs = document.getElementsByTagName('td');
    for (var i in imgs) {
    if (i < imgs.length - 1) {
    imgs[i].style.maxWidth = '375px';
    imgs[i].style.height = 'auto';
    }
    }
    var imgs = document.getElementsByTagName('p');
    for (var i in imgs) {
    if (i < imgs.length - 1) {
    imgs[i].style.maxWidth = '375px';
    imgs[i].style.height = 'auto';
    }
    }
}