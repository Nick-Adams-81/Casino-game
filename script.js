var deal = "https://deckofcardsapi.com/api/deck/new/draw/?count=4"
var hit = "https://deckofcardsapi.com/api/deck/new/draw/?count=1"
var deck = "https://deckofcardsapi.com/api/deck/new/"
var stand = "https://deckofcardsapi.com/api/deck/new/draw/?count=1"
var foaas = "https://www.foaas.com/text/plain/asshole/:from"
var cardValue = {
                 '2C': 2,
                 '2H': 2,
                 '2D': 2,
                 '2S': 2,
                 '3C': 3,
                 '3H': 3,
                 '3D': 3,
                 '3S': 3,
                 '4C': 4,
                 '4H': 4,
                 '4D': 4,
                 '4S': 4,
                 '5C': 5,
                 '5H': 5,
                 '5C': 5,
                 '5S': 5,
                 '6C': 6,
                 '6H': 6,
                 '6D': 6,
                 '6S': 6,
                 '7C': 7,
                 '7H': 7,
                 '7D': 7,
                 '7S': 7,
                 '8C': 8,
                 '8D': 8,
                 '8H': 8,
                 '8S': 8,
                 '9C': 9,
                 '9H': 9,
                 '9D': 9,
                 '9S': 9,
                 '0C': 10,
                 '0H': 10,
                 '0D': 10,
                 '0S': 10,
                 'JC': 10,
                 'JH': 10,
                 'JD': 10,
                 'JS': 10,
                 'QC': 10,
                 'QH': 10,
                 'QC': 10,
                 'QS': 10,
                 'KC': 10,
                 'KH': 10,
                 'KD': 10,
                 'KS': 10,
                 'AC': [11,1],
                 'AH': [11,1],
                 'AC': [11,1],
                 'AS': [11,1]
                } 
var dealerHand = 0
var playerHand = 0








$(document).ready(function(){
  //card values
  

  

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
                         .animate({height: '50%',width: '20%'})
    var card2 = $("<img>").attr('src',response.cards[2].image)
                          .animate({height: '50%',width: '20%'})

    tRow.append(card)
    tRow.append(card2)

  
  

    //player hand
    var tRow2 = $("#player");
    var cards = $("<img>").attr('src',response.cards[1].image)
                          .animate({height: '50%',width: '20%'})
    var cards2 = $("<img>").attr('src',response.cards[3].image)
                           .animate({height: '50%',width: '20%'})
    tRow2.append(cards)
    tRow2.append(cards2)
   
    dealerHand = cardValue[response.cards[0].code] + 
                 cardValue[response.cards[2].code]
          

    console.log(dealerHand)

    playerHand = cardValue[response.cards[1].code] +
                 cardValue[response.cards[3].code]

              
   
    console.log(playerHand)  
  
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
                          .animate({height: '50%',width: '20%'})
  playerHand = playerHand + cardValue[response.cards[0].code] 
  
  console.log(playerHand)

  tRow2.append(cards)

    
  })
  
});
  //stand function
$("#stand").click(function(){
  if(dealerHand < 17){
    $.ajax({
      url: hit,
      method:"GET"
    }).then(function(response){
      var tRow = $("#dealer");
      var cards = $("<img>").attr('src', response.cards[0].image)
                            .animate({height: '50%', width: '20%'})
      dealerHand = dealerHand + cardValue[response.cards[0].code]

      console.log(dealerHand)

      tRow.append(cards)
      

    })
    
  

  }
  
});

console.log(cardValue['4C'] + cardValue['0H'])











})

  














