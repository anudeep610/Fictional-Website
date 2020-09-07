//Food page variables
var totalPrice=0;
var totalItems=0;
var taxAmount=0;
var totalAmount=0;
var inputs=document.querySelectorAll("input[type=number]");
var cartButton=document.querySelector("#add");
var resetButton=document.querySelector("#reset");
var selectedItems=document.querySelector("#total-number-value");
var printPrice=document.querySelector("#total-price-value");
var taxPrint=document.querySelector("#tax-value");
var amountPrint = document.querySelector("#bill-value");
var confirmButton=document.querySelector("#confirm");


//playing page variables
var bookLinks=document.querySelectorAll(".book__link");


//book page variables
var bookNamePrint=document.querySelector("#book-name");
var bookImagePrint=document.querySelector("#book-image");
var bookDatePrint=document.querySelector("#book-date");
var bookTimePrint=document.querySelector("#book-time");
var adultsNumber=document.querySelector("#adults");
var childrenNumber=document.querySelector("#children");
var kidsNumber=document.querySelector("#kids");
var pricePrint=document.querySelector("#price-value");
var taxPrint=document.querySelector("#tax-value");
var TotalPrint=document.querySelector("#total-value");
var bookButton=document.querySelector("#book-button");
var bookConfirm=document.querySelector("#book-confirm-button");



if(document.querySelector("section").classList.contains("eatery")){
    cartButton.addEventListener("click",function(){
        document.querySelector("#seatValue").value = "" ;
        document.querySelector(".eatery__confirmation").classList.add("off");
        document.querySelector(".confirm_statement").classList.add("off");
        calculateBill();
        if(totalAmount > 0)
        {
            document.querySelector(".eatery__confirmation").classList.remove("off");
        }
        else
        {
            document.querySelector(".eatery__confirmation").classList.add("off");
            document.querySelector(".confirm_statement").classList.add("off");
            alert("Your cart is empty.");
        }
    });
    
    resetButton.addEventListener("click",function(){
        reset();
    });
    
    confirmButton.addEventListener("click",function(){
        if(document.querySelector("#seatValue").value != "" )
        {
            document.querySelector("#confirmAmount").textContent=totalAmount;
            document.querySelector(".confirm_statement").classList.remove("off");
        }
        else{
            document.querySelector(".confirm_statement").classList.add("off");
            alert("Enter your ticket number.");
        }
    });
}




function reset()
{
    for(var i=0;i<inputs.length;i++)
    {
        inputs[i].value=0;
    }
    totalPrice=0;
    totalItems=0;
    taxAmount=0;
    totalAmount=0;
    displayBill();
    document.querySelector(".eatery__confirmation").classList.add("off");
    document.querySelector(".confirm_statement").classList.add("off");
    document.querySelector("#seatValue").value = ""; 
}

function calculateBill()
{
    totalPrice=0;
    totalItems=0;
    for(var i=0;i<inputs.length;i++)
    {
        if(parseInt(inputs[i].value) !== 0)
        {
            totalItems=totalItems + parseInt(inputs[i].value);
            calculatePrice(inputs[i]);
        }
    }
    calculateTax();
    calculateAmount();
    displayBill();
}

function displayBill()
{
    selectedItems.textContent=totalItems;
    printPrice.textContent=totalPrice;
    taxPrint.textContent=taxAmount;
    amountPrint.textContent=totalAmount;
}

function calculatePrice(a)
{
    totalPrice = totalPrice + parseInt(a.parentElement.childNodes[1].textContent) * parseInt(a.value);
    totalPrice = parseFloat(totalPrice);
}

function calculateTax()
{
    taxAmount = 0.18 * totalPrice;
    taxAmount = parseFloat(taxAmount.toFixed(2));
}

function calculateAmount()
{
    totalAmount = totalPrice + taxAmount;
}

if(document.querySelector("section").classList.contains("playing"))
{
    for(var i=0; i<bookLinks.length; i++)
    {
        bookLinks[i].addEventListener("click", function(){
            sessionStorage.setItem("name", this.parentElement.childNodes[1].textContent);
            sessionStorage.setItem("image", this.parentElement.parentElement.childNodes[1].childNodes[1].src);
            sessionStorage.setItem("date",this.parentElement.childNodes[3].textContent);
            sessionStorage.setItem("time",this.parentElement.childNodes[5].textContent);
        });
    }
}

if(document.querySelector("section").classList.contains("book"))
{
    bookNamePrint.textContent=sessionStorage.getItem("name");
    bookImagePrint.setAttribute("src",sessionStorage.getItem("image"));
    bookDatePrint.textContent=sessionStorage.getItem("date");
    bookTimePrint.textContent=sessionStorage.getItem("time");
    var amount=0;
    var ticketNumber= parseInt(Math.random() * 100);

    bookButton.addEventListener("click",function(){
        amount=parseInt(adultsNumber.value) * 650 + parseInt(childrenNumber.value) * 400 + parseInt(kidsNumber.value) * 200;
        if(amount > 0)
        {
            pricePrint.textContent=amount;
            taxPrint.textContent= 0.18 * amount;
            TotalPrint.textContent= amount + 0.18 * amount;
            document.querySelector(".book__print").classList.remove("off");
        }
        else
        alert("Please select atleast one ticket!!!");
    });

    bookConfirm.addEventListener("click",function(){
        var totalTickets= parseInt(adultsNumber.value) + parseInt(childrenNumber.value) + parseInt(kidsNumber.value);
        if(confirm("Confirmation of booking:-\nMovie Name: " + sessionStorage.getItem("name") + "\nTotal tickets: " + totalTickets +"\nTotal price: " + TotalPrint.textContent))
        {
            document.querySelector(".book__print").classList.add("off");
            adultsNumber.value=0;
            childrenNumber.value=0;
            kidsNumber.value=0;
            amount=0;
            alert("Your ticket number is: " + ticketNumber + "\nThank you for booking.Hope you enjoy " + sessionStorage.getItem("name") + ".");
        }
        else
        {
            alert("Booking cancelled :(");
        }
    });
}