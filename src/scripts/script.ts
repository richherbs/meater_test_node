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
const EMAILADDRESS :RegExp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

/**
 * Pass in an enquiry object and send to the server using a promise based function
 * @param anEnquiryObject - an enquiry object which follows the enquiry interface
 */
const sendEnquiry = async (anEnquiryObject:Enquiry) => {
    let response = await fetch('/files', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(anEnquiryObject),
        })
    
    return response
}

/**
 * Returns true if an element matches a regular expression else false
 * @param anElement - an HTMLElement
 * @param aRegex - regular expression
 */
function checkRegex(anElement :Node, aRegex :RegExp) :Boolean{
    return aRegex.test((<|HTMLInputElement>anElement).value)
}

submit.addEventListener('click', (e) => {
    if(checkRegex(inputs[1], EMAILADDRESS)){
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
        sendEnquiry(enquiryData).then((response) => {
            if(response){
                alert("Your message has been received.")
            } else {
                alert("Your email address was invalid.")
            }
        })
    } else {
        alert("Please make sure your email address is valid.")
        e.preventDefault();
    }
})