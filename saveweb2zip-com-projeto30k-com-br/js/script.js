const notificacoes = [
    {
        nome: 'João Oliveira',
        tempo: 'acabou de comprar',
    },
    {
        nome: 'Amanda Matias',
        tempo: 'acabou de comprar',
    },
    {
        nome: 'Marcos Santos',
        tempo: 'acabou de comprar',
    },
    {
        nome: 'Jordana Oliveira',
        tempo: 'acabou de comprar',
    },
    {
        nome: 'Artus Novaes',
        tempo: 'acabou de comprar',
    },
    {
        nome: 'Keila Silva',
        tempo: 'acabou de comprar',
    },
    {
        nome: 'Gilberto Andrade',
        tempo: 'acabou de comprar',
    },
    {
        nome: 'Fabrício Arantes',
        tempo: 'acabou de comprar',
    },
    {
        nome: 'Flávio Jr.',
        tempo: 'acabou de comprar',
    },
    {
        nome: 'Cristian Fernandes',
        tempo: 'acabou de comprar',
    },
    {
        nome: 'Lucas Nunes',
        tempo: 'acabou de comprar',
    },
        {
        nome: 'Júlia Marques',
        tempo: 'acabou de comprar',
    },
        {
        nome: 'Junior Matias',
        tempo: 'acabou de comprar',
    },
    {
        nome: 'Ramon Xavier',
        tempo: 'acabou de comprar',
    },
    {
        nome: 'Susana Rodrigues',
        tempo: 'acabou de comprar',
    },
    {
        nome: 'Maiara Cardoso',
        tempo: 'acabou de comprar',
    },
    {
        nome: 'Pedro Santos',
        tempo: 'acabou de comprar',
    },
    {
        nome: 'Júlio Alvez',
        tempo: 'acabou de comprar',
    },
    {
        nome: 'Lucas Souza',
        tempo: 'acabou de comprar',
    },
    {
        nome: 'Felipe Soares',
        tempo: 'acabou de comprar',
    },
];


let notificationIndex = 0;
const setupNotifications = () => {
    const $notification = $('.notification');

    const notificationContent = notificacoes[notificationIndex];

    $notification.find('.name').text(notificationContent.nome);
    $notification.find('.quantity').text(notificationContent.quantidade);
    $notification.find('.time').text(notificationContent.tempo);

    notificationIndex++;

    if (notificationIndex >= notificacoes.length) {
        notificationIndex = 0;
    }

    $notification.addClass('active');

    let hideTimeout = setTimeout(() => {
        $notification.removeClass('active');
    }, 5000);

    $notification.find('.close').on('click', () => {
        $notification.removeClass('active');
        clearTimeout(hideTimeout);
    });

    setTimeout(() => {
        setupNotifications();
    }, 15000);
};

const setupTodayDate = () => {
    const today = new Date();
    const localeDate = today.toLocaleDateString();

    $('.top-strip b').text(localeDate);
};

const setupViewers = () => {
    $('.viewers b').text(localStorage.viewers || 341);

    setInterval(() => {
        const viewers = Number(localStorage.viewers || 341);
        // increment or decrement viewers
        let newViewers = viewers + Math.floor(Math.random() * 30) - 10;

        if (newViewers <= 300) {
            newViewers += Math.floor(Math.random() * 15);
        }

        localStorage.viewers = newViewers;
        $('.viewers b').text(newViewers);
    }, 5000);
};

document.addEventListener('DOMContentLoaded', () => {
    setupViewers();
    setupTodayDate();

    window.addEventListener('showHiddenElements', () => {
        console.log('showHiddenElements');
        setupNotifications();
    });
});
