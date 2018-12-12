<template>
  <div>
    <v-container>
      <div v-for="(row, rowIndex) in squareRow" :key="rowIndex">
        <v-layout row wrap class="boardRow firstRow">
          <v-flex xs4 v-for="(square, squareIndex) in row" :key="squareIndex">
            <Square class="one" :squareId="square.squareId" @clickedSquare="clickedSquare">
              {{ square.value }}
            </Square>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </div>
</template>

<script>
import Square from './Square'

  export default {
    components: { 'Square': Square },
    data() {
      return {
        isWinner: false,
        match: {
          players: [
            this.$route.query.playerOne,
            this.$route.query.playerTwo
          ],
          tie: null,
          winner: null,
          loser: null
        },
        squareRow: [
          // First Row
          [
            {
              squareId: 1,
              touched: false,
              value: ''
            },
            {
              squareId: 2,
              touched: false,
              value: ''
            },
            {
              squareId: 3,
              touched: false,
              value: ''
            }
          ],
          // Second Row
          [
            {
              squareId: 4,
              touched: false,
              value: ''
            },
            {
              squareId: 5,
              touched: false,
              value: ''
            },
            {
              squareId: 6,
              touched: false,
              value: ''
            }
          ],
          // Third Row
          [
            {
              squareId: 7,
              touched: false,
              value: ''
            },
            {
              squareId: 8,
              touched: false,
              value: ''
            },
            {
              squareId: 9,
              touched: false,
              value: ''
            }
          ]
        ],
        playerOneSquaresIDs: [ ],
        playerTwoSquaresIDs: [ ]
      }
    },
    computed: {
      playerTurn() {
        return this.$store.getters.playerTurn
      }
    },
    watch: {
      playerOneSquaresIDs: function(value) {
        if(value.length == 5 && !this.isWinner) {
          this.tieCase()
        }
      },
      playerTwoSquaresIDs: function(value) {
        if(value.length == 5 && !this.isWinner) {
          this.tieCase()
        }
      }
    },
    methods: {
      clickedSquare(squareId) {
        // Idenfity players
        let squares = this.$store.state.playerCounter % 2 == 0 ? this.playerOneSquaresIDs : this.playerTwoSquaresIDs
        
        squares.push(squareId)
        // Mark square as touched
        this.squareRow.find(row => {
          row.find(square => {
            if(square.squareId === squareId) {
              square.touched = true
              this.$store.state.playerCounter % 2 == 0 ? square.value = 'X' : square.value = 'O'
            }
          })
        })
        // Check if the player won
        this.winner(squares)

        if(this.isWinner) this.winCase(this.playerTurn)
        // Counts a turn
        else this.$store.dispatch('COUNT_TURN')
      },
      winner(squares) {
        // We declare the possible conditions of winning
        const winConditions = [
          // Entire row 1
          [1, 2, 3],
          // Entire row 2
          [4, 5, 6],
          // Entire row 3
          [7, 8, 9],
          // Entire col 1
          [1, 4, 7],
          // Entire col 2
          [2, 5, 8],
          // Entire col 3
          [3, 6, 9],
          // Crossed decreasent
          [1, 5, 9],
          // Crossed ascendant
          [3, 5, 7]
        ]
        // Compare Arrays TODO
        winConditions.filter(condition => {
          
          const hasItem1 = squares.some(square => {
            return JSON.stringify(condition[0]) === JSON.stringify(square);
          });
          const hasItem2 = squares.some(square => {
            return JSON.stringify(condition[1]) === JSON.stringify(square);
          });
          const hasItem3 = squares.some(square => {
            return JSON.stringify(condition[2]) === JSON.stringify(square);
          });
          
          if(hasItem1 && hasItem2 && hasItem3) {
            this.isWinner = true
          }
        });
      },
      winCase(winner) {
        this.match.tie = false

        // Find out loser
        const loser = this.match.players.find(player => player !== winner._id)

        
        this.match.winner = winner._id
        this.match.loser = loser

        this.$store.dispatch('API_POST_MATCH', this.match)
      },
      tieCase() {
        this.match.tie = true

        this.$store.dispatch('API_POST_MATCH', this.match)
      }
    }
  }
</script>

<style scoped>
.boardRow {
  display: -webkit-box
}

</style>