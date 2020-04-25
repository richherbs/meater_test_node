interface Enquiry{
    name :string
    email :string
    message: string
    newsletterChoice: Boolean
    time: number
}

let submit :Node = document.querySelector('.submit');
let inputs :NodeList = document.querySelectorAll('.newsletter-data');
let warning :Node = document.querySelector('.emailWarning')
const LETTERSANDSPACES :RegExp = /^[A-Za-z\s]+$/
const EMAILADDRESS :RegExp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

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

/**
 * Returns true if an element matches a regular expression else false
 * @param anElement - an HTMLElement
 * @param aRegex 
 */
function checkRegex(anElement :HTMLInputElement, aRegex :RegExp) :Boolean{
    return aRegex.test((<|HTMLInputElement>anElement).value)
}

submit.addEventListener('click', (e) => {
    console.log((<HTMLInputElement>inputs[1]).value)
    console.log(checkRegex((<HTMLInputElement>inputs[1]), EMAILADDRESS))

    if(checkRegex((<HTMLInputElement>inputs[1]), EMAILADDRESS)){
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
    } else {
        alert("Please make sure your email address is valid.")
        e.preventDefault();
    }
})