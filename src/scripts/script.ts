interface Enquiry{
    name :string
    email :string
    message: string
    newsletterChoice: Boolean
    time: Date
}

let submit :Node = document.querySelector('.submit');
let inputs :NodeList = document.querySelectorAll('.newsletter-data');

/**
 * Pass in an enquiry object and send to the server using a promise based function
 * @param anEnquiryObject - an enquiry object which follows the enquiry interface
 */
const sendEnquiry = async (anEnquiryObject:Enquiry) => {
    fetch('/files', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(anEnquiryObject),
        }).then((response => {
            return response.json()
        })).then((data) => {
            console.log(data)
        });
    }

submit.addEventListener('click', (e) => {
    // e.preventDefault();
    let enquiryData :Enquiry = {
        name: '',
        email: '',
        message: '',
        newsletterChoice: false,
        time: Date.now()
    };

    inputs.forEach((input) => {
        if ((<HTMLInputElement>input).type != 'checkbox'){
            enquiryData[(<HTMLInputElement>input).name] = (<HTMLInputElement>input).value;
        } else {
            enquiryData[(<HTMLInputElement>input).name] = (<HTMLInputElement>input).checked;
        }
    });
    
    sendEnquiry(enquiryData);
})