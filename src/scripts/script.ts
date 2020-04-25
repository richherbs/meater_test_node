let submit :Node = document.querySelector('.submit');
let inputs :NodeList = document.querySelectorAll('.newsletter-data');

submit.addEventListener('click', (e) => {
    e.preventDefault();
    let enquiryData :any = {};

    inputs.forEach((input) => {
        if ((<HTMLInputElement>input).type != 'checkbox'){
            enquiryData[(<HTMLInputElement>input).name] = (<HTMLInputElement>input).value;
        } else {
            enquiryData[(<HTMLInputElement>input).name] = (<HTMLInputElement>input).checked;
        }
    });

    console.log(enquiryData);
})