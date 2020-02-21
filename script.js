var deal = "https://deckofcardsapi.com/api/deck/new/draw/?count=3"
var hit = "https://deckofcardsapi.com/api/deck/new/draw/?count=1"
var deck = "https://deckofcardsapi.com/api/deck/new/"
var stand = "https://deckofcardsapi.com/api/deck/new/draw/?count=1"
var modal = $("#modal").hide()
var span = $(".close")
var insult = $("#insult")
var insults = [
  'go FUCK yourself',
  'choke on a bag of dicks',
  'thanks for being a loser',
  'congrats ASSHOLE!!!',
  'not sorry about your bad luck ASS FACE',
  'way to go shit for brains',
  'you stupid FUCK!!!',
  'please jump off a cliff!!'
]



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
        .animate({ height: '50%', width: '20%' })


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
      //players card number
      var playersNum = $('#players')
      playersNum.text("Asshole's score: " + playerHand).css({ "font-family": "Arial, Helvetica, sans-serif", "font-size": "100%" });

      //Update Dealer's card number
      var dealerNum = $('#dealers')
      dealerNum.text("Dealer's score: " + dealerHand).css({ "font-family": "Arial, Helvetica, sans-serif", "font-size": "100%" });




      if (playerHand === 21) {

        swal("BLACKJACK MOTHERFUCKER !!!!!!")
      }

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
        .animate({ height: '50%', width: '20%' })
      playerHand = playerHand + cardValue[response.cards[0].code]

      if (playerHand > 21) {
        swal('Way to go SHIT FOR BRAINS!!!!')
      }


      tRow2.append(cards)


    })

  });
  //stand function
  $("#stand").click(function(){
    if(dealerHand < 17){
      dealerDraw();
    } else {

    }
    
  });

  function dealerDraw() {
    $.ajax({
      url: hit,
      method: "GET"
    }).then(function (response) {
      var tRow = $("#dealer");
      var cards = $("<img>").attr('src', response.cards[0].image)
        .animate({ height: '50%', width: '20%' })

      dealerHand = dealerHand + cardValue[response.cards[0].code]
      if (dealerHand === 21) {
        swal('YOU LOSE FUCKER!!!!!')
      }

      if (dealerHand < 17) {
        $.ajax({
          url: stand,
          method: "GET"
        }).then(function (response) {
          var tRow = $("#dealer");
          var cards = $("<img>").attr('src', response.cards[0].image)
            .animate({ height: '50%', width: '20%' })


          dealerHand = dealerHand + cardValue[response.cards[0].code]
          tRow.append(cards)
        

        })
        if (dealerHand > playerHand && dealerHand < 22) {
          swal("GET FUCKED!!!")
        } else if (playerHand > dealerHand && playerHand < 22) {
          swal('congrats fuckface')
        }
      }
    
      tRow.append(cards)


    })
  }

  $("#msg").click(function () {
    $("#modal").show()
    var tRow = $("#insult")
    var text = $("<p>").text(insults[0, 1])


    tRow.append(text)
  })

  $(".close").click(function () {
    $("#modal").hide()

  })


  $("#deal").click(function () {
    $("#dealer").empty()
    $("#player").empty()
  });

})
