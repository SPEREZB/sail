(function() {
    let allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

    if (!allSideMenu || allSideMenu.length === 0) {
        allSideMenu = []; // Si no está definida o está vacía, inicialízala como un array vacío
    } else {
        allSideMenu.forEach(item => {
            const li = item.parentElement;

            item.addEventListener('click', function () {
                allSideMenu.forEach(i => {
                    i.parentElement.classList.remove('active');
                });
                li.classList.add('active');
            });
        });
    }

    // TOGGLE SIDEBAR
    let menuBar = document.querySelector('#content nav .bx.bx-menu');
    const sidebar = document.getElementById('sidebar');

    if (!menuBar) {
        menuBar = document.createElement('div'); // Crear un elemento ficticio si no está definido
    }

    menuBar.addEventListener('click', function () {
        sidebar.classList.toggle('hide');
    });

    let searchButton = document.querySelector('#content nav form .form-input button');
    let searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
    let searchForm = document.querySelector('#content nav form');

    if (!searchButton) {
        searchButton = document.createElement('button'); // Crea un botón ficticio si no está definido
    }

    if (searchButton) {
        searchButton.addEventListener('click', function (e) {
            if (window.innerWidth < 576) {
                e.preventDefault();
                searchForm.classList.toggle('show');
                if (searchForm.classList.contains('show')) {
                    searchButtonIcon.classList.replace('bx-search', 'bx-x');
                } else {
                    searchButtonIcon.classList.replace('bx-x', 'bx-search');
                }
            }
        });
    }

    if (window.innerWidth < 768) {
        sidebar.classList.add('hide');
    } else if (window.innerWidth > 576) {
       
    }

    window.addEventListener('resize', function () {
        if (this.innerWidth > 576) {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
            searchForm.classList.remove('show');
        }
    });

    let switchMode = document.getElementById('switch-mode');

    if (!switchMode) {
        switchMode = document.createElement('input'); // Crea un input ficticio si no está definido
        switchMode.type = 'checkbox';
    }

    if (switchMode) {
        switchMode.addEventListener('change', function () {
            if (this.checked) {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
        });
    }
})();