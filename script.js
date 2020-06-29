var deal = "https://deckofcardsapi.com/api/deck/new/draw/?count=3"
var hit = "https://deckofcardsapi.com/api/deck/new/draw/?count=1"
var deck = "https://deckofcardsapi.com/api/deck/new/"
var stand = "https://deckofcardsapi.com/api/deck/new/draw/?count=2"
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

$(document).ready(function () {

  //Blackjack
  $("#deal").click(function () {

    $.ajax({
      url: deal,
      method: "GET"

      //dealer hand
    }).then(function (response) {

      var tRow = $("#dealer");
      var card = $("<img>").attr('src', response.cards[0].image)
        .animate({ height: '50%', width: '20%', })
      tRow.append(card)

      dealerHand = cardValue[response.cards[0].code]
      

      //player hand
      var tRow2 = $("#player");
      var cards = $("<img>").attr('src', response.cards[1].image)
        .animate({ height: '50%', width: '20%' })
      var cards2 = $("<img>").attr('src', response.cards[2].image)
        .animate({ height: '50%', width: '20%' })
      tRow2.append(cards)
      tRow2.append(cards2)

      playerHand = cardValue[response.cards[1].code] +
        cardValue[response.cards[2].code]

      

      if (playerHand === 21) {
        swal("BLACKJACK MOTHERFUCKER!!!!!!")
      }
    })
  });


  //take a hit
  $("#hit").click(function () {
    $.ajax({
      url: hit,
      method: "GET"
    }).then(function (response) {
      var tRow2 = $("#player")
      var cards = $("<img>").attr('src', response.cards[0].image)
        .animate({ height: '50%', width: '20%' })
      playerHand = playerHand + cardValue[response.cards[0].code]

      // if hit card is an A and total hand is over 21, subtract 10.
      if ((cardValue[response.cards[0].code] == 11) && (playerHand > 21)) {
        playerHand -= 10;
      }

      if (playerHand > 21) {
        swal("way to go SHIT FOR BRAINS!!!")
      }
      tRow2.append(cards)
    })

  });
  //stand function
  $("#stand").click(function () {

    $.ajax({
      url: hit,
      method: "GET"
    }).then(function (response) {
      var tRow = $("#dealer");
      var cards = $("<img>").attr('src', response.cards[0].image)
        .animate({ height: '50%', width: '20%' })

      dealerHand = dealerHand + cardValue[response.cards[0].code]

      if (dealerHand < 17) {
        $.ajax({
          url: hit,
          method: "GET"
        }).then(function (response) {
          var tRow = $("#dealer");
          var cards = $("<img>").attr('src', response.cards[0].image)
            .animate({ height: '50%', width: '20%' })

          dealerHand = dealerHand + cardValue[response.cards[0].code]
          tRow.append(cards)


        })
      }

      if (dealerHand > playerHand && dealerHand < 22) {
        swal("Dealer wins!", "You suck ASS!!!!!!")
      }
      else if (dealerHand > 21) {
        swal("good job", "You ASSHOLE!!!")
      }
      else if (dealerHand === playerHand) {
        swal("TIE!", "We're both FUCKED!!!")
      } else if (playerHand > dealerHand && playerHand < 22) {
        swal("Good job", "DICK FACE!!!")
      }

      tRow.append(cards)
    })
  });
  $("#deal").click(function () {
    $("#dealer").empty()
    $("#player").empty()
    $("#dealerhand").empty()
    $("#playerhand").empty()

  });
 //war
  $("#deal2").click(function(){
    
    $.ajax({
      url: stand,
      method: "GET"
    }).then(function(response){
      console.log(response)
      //dealer hand
      var tRow = $(".dealers1")
      var card = $("<img>").attr( 'src', response.cards[0].image)
                            .animate({ height: '60%', width: '40%'})
       dealerHand = cardValue[response.cards[0].value]
      
      //player hand
      var tRow2 = $(".players1")
      var cards = $("<img>").attr( 'src', response.cards[1].image)
                            .animate({ height: '60%', width: '40%'})
        playerHand = cardValue[response.cards[1].value]
       
      tRow.append(card)
      tRow2.append(cards)

    
      if(dealerHand < playerHand){
        swal('You lose BITCH!!!')
      }
       
  
      

    })
    $("#deal2").click(function(){
      $(".dealers1").empty()
      $(".players1").empty()
    })
  })


})
















