interface Enquiry{
    name :string
    email :string
    message: string
    newsletterChoice: Boolean
}

let submit :Node = document.querySelector('.submit');
let inputs :NodeList = document.querySelectorAll('.newsletter-data');

/**
 * Pass in an enquiry object and send to the server using a promise based function
 * @param anEnquiryObject - an enquiry object which follows the enquiry interface
 */
const sendEnquiry = async (anEnquiryObject:Enquiry) => {
    const response = await fetch('/files', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(anEnquiryObject) // body data type must match "Content-Type" header
    });
  return response.json(); // parses JSON response into native JavaScript objects
}

submit.addEventListener('click', (e) => {
    e.preventDefault();
    let enquiryData :Enquiry = {
        name: '',
        email: '',
        message: '',
        newsletterChoice: false
    };

    inputs.forEach((input) => {
        if ((<HTMLInputElement>input).type != 'checkbox'){
            enquiryData[(<HTMLInputElement>input).name] = (<HTMLInputElement>input).value;
        } else {
            enquiryData[(<HTMLInputElement>input).name] = (<HTMLInputElement>input).checked;
        }
    });

    sendEnquiry(enquiryData).then((data) => console.log(data))
})