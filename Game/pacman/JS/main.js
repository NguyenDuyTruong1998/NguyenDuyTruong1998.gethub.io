const wraper = new Vue({
    el: '#wraper',
    data: {
        config: {
            width: 600,
            height: 300
        },
        elements: {
            canvas: document.getElementById('canvas'),
            game: document.getElementById('game'),
            container: document.getElementById('container')
        }
    },
    methods: {
        fullScreen: async function() {
            await document.getElementById('game').requestFullscreen();
        }
    },
    computed: {
        array: function() {
            return {
                width: width / 10,
                height: height / 10
            }
        }
    },
    mounted: function() {
        const screenHeight = window.screen.availHeight;
        const screenWidth = window.screen.availWidth;
        let gameWidth = Math.floor((screenWidth/3)/100) * 3 * 100;
        let gameHeight = gameWidth / 3;
        if (gameWidth > this.config.width) gameWidth = this.config.width;
        if (gameHeight > screenHeight) {
            gameHeight = Math.floor((screenHeight/3)/100) * 3 * 100;
            if (gameHeight > this.config.height) gameHeight = this.config.height
        } else {
            gameWidth = gameHeight * 3;
        }
        this.config.height = gameHeight > this.config.height ? this.config.height : gameHeight;
        this.config.width = gameWidth > this.config.width ? this.config.width : gameWidth;
    }
})
// const canvas = new Vue({
//     el: '#canvas',
//     data: {
//         chaos: "Xin chao!"
//     },
//     methods: {
//         greeter: function() {
//             console.log('Hello world');
//             console.log(this.chaos)
//         }
//     }
// })