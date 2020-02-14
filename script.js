var deal = "https://deckofcardsapi.com/api/deck/new/draw/?count=4"
var hit = "https://deckofcardsapi.com/api/deck/new/draw/?count=1"
var stand = $("#stand")
var foaas = "https://www.foaas.com/text/plain/asshole/:from"
var playerHand;
var dealerHand;


$(document).ready(function(){

  

//Start Game
$("#deal").click(function(){
  
  $.ajax({
    url: deal,
    method: "GET"

    //dealer hand
  }).then(function(response){
    console.log(response)
    var tRow = $("#dealer");
    var card = $("<img>").attr('src',response.cards[0].image)
    var card2 = $("<img>").attr('src',response.cards[2].image)

    tRow.append(card)
    tRow.append(card2)

    //player hand
    var tRow2 = $("#player");
    var cards = $("<img>").attr('src',response.cards[1].image)
    var cards2 = $("<img>").attr('src',response.cards[3].image)
    tRow2.append(cards)
    tRow2.append(cards2)
   
      
  
  })
});

   //take a hit
$("#hit").click(function(){
  $.ajax({
    url: hit,
    method: "GET"
  }).then(function(response){
    console.log(response)
    var tRow2 = $("#player")
    var cards = $("<img>").attr('src', response.cards[0].image)
    tRow2.append(cards)
  })
});
  //stand function
$("#stand").click(function(){
  
});











})

  














