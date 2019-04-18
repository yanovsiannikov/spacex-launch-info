document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelectorAll('.cont');
    const filtery = document.querySelector('#filter')
    const filterr = document.querySelector('#filterr')

    content.forEach((e) => {
        const date = e.querySelector('.date').textContent
        const timer = e.querySelector('.launch')

        var deadline = Number(date)*1000;
        var x = setInterval(function () {
            var now = new Date().getTime();
            var t = deadline - now;
            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((t % (1000 * 60)) / 1000);
            if (seconds<10) seconds ='0' + seconds
            if (minutes<10) minutes ='0' + minutes
            if (hours<10) hours ='0' + hours
            timer.innerHTML = days + " days "
                + hours + ":" + minutes + ":" + seconds;
            if (t < 0) {
                clearInterval(x);
                timer.innerHTML = 'LAUNCHED';
            }
        }, 1000);
    })

    function filtering() {
        content.forEach((el) => {
            let r = el.querySelector('.rocket').innerText
            let y = el.querySelector('.year').innerText
            if (filtery.value.toLowerCase() === 'all') {
                if (r.toLowerCase().includes(filterr.value.toLowerCase()))
                el.style.display = 'inherit';
                else 
                el.style.display = 'none';
            } 
              else if ((r.toLowerCase().includes(filterr.value.toLowerCase()) && y.startsWith(filtery.value)))
                    el.style.display = 'inherit';
                    else 
                    el.style.display = 'none';
        })
    }

    filterr.addEventListener('input', (e) => {
        filtering()
    })
    filtery.addEventListener('input', (e) => {
        filtering()
    })
});
