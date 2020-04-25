var submit = document.querySelector('.submit');
var inputs = document.querySelectorAll('.newsletter-data');
submit.addEventListener('click', function (e) {
    e.preventDefault();
    var enquiryData = {};
    inputs.forEach(function (input) {
        enquiryData[input.name] = input.value;
    });
});
