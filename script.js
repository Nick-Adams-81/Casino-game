var deal = "https://deckofcardsapi.com/api/deck/new/draw/?count=3"
var hit = "https://deckofcardsapi.com/api/deck/new/draw/?count=1"
var deck = "https://deckofcardsapi.com/api/deck/new/"
var stand = "https://deckofcardsapi.com/api/deck/new/draw/?count=1"
var foaas = "http://foaas.com/off/Tom/Everyone?shoutcloud"
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
                 '5D': 5,
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
                 'QD': 10,
                 'QS': 10,
                 'KC': 10,
                 'KH': 10,
                 'KD': 10,
                 'KS': 10,
                 'AC': 11,
                 'AH': 11,
                 'AD': 11,
                 'AS': 11
                } 
var dealerHand = 0
var playerHand = 0








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
                         .animate({height: '50%',width: '20%'})
   
                                                           
    tRow.append(card)
    

    dealerHand = cardValue[response.cards[0].code] 
                 

    console.log(dealerHand)
    
    
    //player hand
    var tRow2 = $("#player");
    var cards = $("<img>").attr('src',response.cards[1].image)
                          .animate({height: '50%',width: '20%'})
    var cards2 = $("<img>").attr('src',response.cards[2].image)
                           .animate({height: '50%',width: '20%'})
    tRow2.append(cards)
    tRow2.append(cards2)

    playerHand = cardValue[response.cards[1].code] +
                 cardValue[response.cards[2].code]
    
    if(playerHand === 21){
  
     alert("BLACKJACK MOTHERFUCKER !!!!!!")

      
    }

    
      


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
                 //score test
                 //var total = $("<p>").text(playerHand)
                //tRow2.append(total)

    // if hit card is an A and total hand is over 21, subtract 10.
    if((cardValue[response.cards[0].code] == 11) && (playerHand > 21))
    {
    playerHand -=10;
   console.log(playerHand);
    }

    if(playerHand > 21){
    alert('You suck!!!') 
  }
   

  
  console.log(playerHand)

  tRow2.append(cards)

    
  })
  
});
  //stand function
$("#stand").click(function(){
    
    $.ajax({
      url: hit,
      method:"GET"
    }).then(function(response){
      var tRow = $("#dealer");
      var cards = $("<img>").attr('src', response.cards[0].image)
                            .animate({height: '50%', width: '20%'})

      dealerHand = dealerHand + cardValue[response.cards[0].code]

      if(dealerHand < 17){
        $.ajax({
          url: hit,
          method: "GET"
        }).then(function(response){
          var tRow = $("#dealer");
          var cards = $("<img>").attr('src', response.cards[0].image)
                                .animate({height: '50%', width: '20%'})

        dealerHand =  dealerHand + cardValue[response.cards[0].code]
          tRow.append(cards)
          console.log(dealerHand)
        })

      }
      else if(dealerHand < 17){
        $.ajax({
          url: hit,
          method: "GET"
        }).then(function(response){
          var tRow = $("#dealer");
          var cards = $("<img>").attr('src', response.cards[0].image)
                                .animate({height: '50%', width: '20%'})

        dealerHand =  dealerHand + cardValue[response.cards[0].code]

        //if dealer hit card is an A and over 21, subtract 10 to score.
        if((cardValue[response.cards[0].code] == 11) && (dealerHand > 21))
        {
        dealerHand -=10;
        console.log(dealerHand);  
        }

          tRow.append(cards)
          console.log(dealerHand)
        })

      }

      if(dealerHand > playerHand && dealerHand < 22){
        alert("dealer wins! You suck ASS!!!!!!")
      }
      else if(dealerHand > 21){
        alert("good job ASSHOLE!!!")
      }
       else if(dealerHand === playerHand){
        alert("TIE! were both FUCKED!!!")
      }else if(playerHand > dealerHand && playerHand < 22){
        alert('good job DICK FACE!!!')
      }
      console.log(dealerHand)
      tRow.append(cards)
    })     
});
$("#deal").click(function(){
  $("#dealer").empty()
  $("#player").empty()

});
  

})