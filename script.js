var deal = "https://deckofcardsapi.com/api/deck/new/draw/?count=4"
var hit = "https://deckofcardsapi.com/api/deck/new/draw/?count=1"
var stand = $("#stand")
var foaas = "https://www.foaas.com/text/plain/asshole/:from"
var playerHand;
var dealerHand;


$(document).ready(function () {


  //Start Game
  $("#deal").click(function () {
    $.ajax({
      url: deal,
      method: "GET"

      //dealer hand
    }).then(function (response) {
      console.log(response)
      var tRow = $("#dealer");
      var card = $("<img>").attr('src', response.cards[0].image)
        .animate({ height: '50%', width: '20%' }); $("<img>").attr('src', response.cards[0].image)
          .animate({ height: '50%', width: '20%' })
      //var card2 = $("<img>").attr('src', response.cards[2].image)
      //.animate({ height: '50%', width: '20%' })
      tRow.append(card)
      //tRow.append(card2)

      //player hand
      var tRow2 = $("#player");
      var cards = $("<img>").attr('src', response.cards[1].image)
        .animate({ height: '50%', width: '20%' })
      var cards2 = $("<img>").attr('src', response.cards[3].image)
        .animate({ height: '50%', width: '20%' })
      tRow2.append(cards)
      tRow2.append(cards2)
      dealerHand = cardValue[response.cards[0].code] +
        cardValue[response.cards[2].code]
      console.log("dealer's hand count: " + dealerHand)

      //Update Dealer's card number
      var dealerNum = $('#dealers')
      dealerNum.text(dealerHand)

      playerHand = cardValue[response.cards[1].code] +
        cardValue[response.cards[3].code]
      console.log("players hand count: " + playerHand)

      //Update player's card number
      var playersNum = $('#players')
      playersNum.text(playerHand)
    })
  });

  //take a hit
  $("#hit").click(function () {
    $.ajax({
      url: hit,
      method: "GET"
    }).then(function (response) {
      console.log(response)
      var tRow2 = $("#player")
      var cards = $("<img>").attr('src', response.cards[0].image)
      tRow2.append(cards)
    })
  });

  //stand function
  $("#stand").click(function () {

  });
})
















