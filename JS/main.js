// Chữ của menu.
let menuText = document.querySelectorAll('.menu-text');
// Các nút của menu
let btn = {
    toggleMenu : document.getElementById('js-toggle-menu'),
    btnAboutMe : document.getElementById('js-btn-about-me'),
    btnMyWork  : document.getElementById('js-btn-my-work'),
    btnResume  : document.getElementById('js-btn-resume'),
    btnContact : document.getElementById('js-btn-contact')
};

let slide = {
    header  : document.getElementById('js-header'),
    aboutMe : document.getElementById('js-aboutme'),
    myWork  : document.getElementById('js-mywork'),
    resume  : document.getElementById('js-resume'),
    swing   : document.getElementById('js-swing'),
    contact : document.getElementById('js-contact')
};
let show = false;

/**
 * This function will show slide.
 * @param {obj} slide want display.
 */
function showSlide(_slide) {
    slide.aboutMe.style.display = 'none';
    slide.myWork.style.display  = 'none';
    slide.resume.style.display  = 'none';
    slide.swing.style.display   = 'none';
    slide.contact.style.display = 'none';

    _slide.style.display = 'block';
} // end function show slide
function offMenu() {
    // Hidden
    let btnArr = Object.values(btn);
    show = false;
    slide.header.style.maxWidth = '6.5rem';
    // an chu
    menuText.forEach((el) => {
        el.style.display = 'none';
    });
    // xoa danh dau do
    btnArr.forEach((el) => {
        el.classList.remove('active');
    });
}
try {
    // Hàm sự kiên onclick của nút ẩn hiện menu
    btn.toggleMenu.onclick = () => {
        if (show) {
            // Hidden
            show = false;
            slide.header.style.maxWidth = '6.5rem';
            menuText.forEach((el) => {
                el.style.display = 'none';
            });
        } else {
            // Show
            show = true;
            slide.header.style.maxWidth = '25rem';
            // Sau 0.2s hien thi text len
            setTimeout(() => {
                menuText.forEach((el) => {
                    el.style.display = 'initial';
                });
            }, 200);
        }
    } // end onclick
} catch(e){}

// show home - aboutme
try {
    btn.btnAboutMe.onclick = () => {
        showSlide(slide.aboutMe);
        offMenu();
        btn.btnAboutMe.classList.add('active');
    } // end onclick

    btn.btnMyWork.onclick = () => {
        showSlide(slide.myWork);
        offMenu();
        btn.btnMyWork.classList.add('active');
    } // end onclick

    btn.btnResume.onclick = () => {
        showSlide(slide.resume);
        offMenu();
    } // end onclick

    btn.btnContact.onclick = () => {
        showSlide(slide.contact);
        offMenu();
    } // end onclick
} catch(e){}