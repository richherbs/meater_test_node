var submit = document.querySelector('.submit');
var inputs = document.querySelectorAll('.newsletter-data');
submit.addEventListener('click', function (e) {
    e.preventDefault();
    var enquiryData = {};
    inputs.forEach(function (input) {
        if (input.type != 'checkbox') {
            enquiryData[input.name] = input.value;
        }
        else {
            enquiryData[input.name] = input.checked;
        }
    });
    console.log(enquiryData);
});
