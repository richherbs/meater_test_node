let submit :Node = document.querySelector('.submit');
let inputs :NodeList = document.querySelectorAll('.newsletter-data');

submit.addEventListener('click', (e) => {
    e.preventDefault();
    let enquiryData :any = {};

    inputs.forEach((input) => {
        let inputHtmlElement = (<HTMLInputElement>input)

        enquiryData[inputHtmlElement.name] = inputHtmlElement.nodeValue;
    });

    console.log(enquiryData);
})