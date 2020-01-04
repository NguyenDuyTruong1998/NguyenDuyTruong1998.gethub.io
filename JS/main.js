// Chữ của menu, nút & menu
let menuText = document.querySelectorAll('.menu-text'),
    toggleMenu = document.getElementById('js-toggle-menu'),
    menu = document.getElementById('js-header'),
    menuFoot = document.getElementById('js-menu-foot'),
    showMenu = false;

let jsControl = [
    {
        btn : document.getElementById('js-btn-about-me'),
        content : document.getElementById('js-aboutme')
    },
    {
        btn : document.getElementById('js-btn-my-work'),
        content : document.getElementById('js-mywork')
    },
    {
        btn : document.getElementById('js-btn-resume'),
        content : document.getElementById('js-resume')
    },
    {
        btn : document.getElementById('js-btn-contact'),
        content : document.getElementById('js-contact')
    },
    {
        btn : document.getElementById('js-btn-game'),
        content : document.getElementById('js-game')
    }
];

try {
    // Hàm sự kiên onclick của nút ẩn hiện menu
   toggleMenu.onclick = () => {
        if (showMenu) {
            // Hidden
            showMenu = false;
            menu.style.maxWidth = '6.5rem';
            menuText.forEach((el) => {
                el.style.display = 'none';
            });
            menuFoot.style.opacity = '0';
        } else {
            // Show
            showMenu = true;
            menu.style.maxWidth = '25rem';
            // Sau 0.2s hien thi text len
            setTimeout(() => {
                menuText.forEach((el) => {
                    el.style.display = 'initial';
                });
            }, 180);
            menuFoot.style.opacity = '1';
        }
    } // end onclick
} catch(e){}

// Show content when click btn
try {
    jsControl.forEach((el) => {
        el.btn.onclick = () => {
            showSlide(el.content);
            offMenu();
            el.btn.classList.add('active');
        };
    });
} catch(e){}


// Function
/**
 * This function will show slide.
 * @param {obj} slide want display.
 */
function showSlide(_slide) {
    jsControl.forEach((el) => {
        el.content.style.display = 'none';
    });
    _slide.style.display = 'block';
} // end function show slide

function offMenu() {
    // Hidden
    showMenu = false;
    menu.style.maxWidth = '6.5rem';
    // an chu
    menuText.forEach((el) => {
        el.style.display = 'none';
    });
    // xoa danh dau do
    jsControl.forEach((el) => {
        el.btn.classList.remove('active');
    });
    // hidden foot menu
    menuFoot.style.opacity = '0';
}