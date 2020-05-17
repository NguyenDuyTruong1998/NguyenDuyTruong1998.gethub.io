const handleData = function(data) {
    return function() {
        return data;
    }
}
/* Data */
const dataHeading = handleData({
    headingContent: 'Pacman game 2020'
})
const dataFooter = handleData({
    footerContent: 'Coming soon...'
})
const footerTemplate = `
<footer class="footer" id="footer">
    {{ footerContent }}
</footer>`
const headingTemplate = `
<header class="heading" id="heading">
    <h1>{{ headingContent }}</h1>
</header>`

Vue.component('page-footer', {
    data: dataFooter,
    props: [],
    template: footerTemplate
})

Vue.component('page-heading', {
    data: dataHeading,
    template: headingTemplate
})
