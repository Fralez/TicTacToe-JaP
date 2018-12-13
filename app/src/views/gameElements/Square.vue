<template>
  <div @click="clickSquare" class="square ma-2 ">
    <span class="mark">
      <slot></slot>
    </span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        touched: false
      }
    },
    methods: {
      clickSquare() {
        // Emit that it was clicked to the board
        if(!this.touched) this.$emit('clickedSquare', this.squareId)
        this.touched = true
      }
    },
    props: {
      squareId: {
        type: Number,
        required: true
      }
    }
  }
</script>

<style scoped>
  .square {
    min-width: 12vw;
    min-height: 12vw;
    background: teal;
    border: 1px solid black;
  }   
  
  .mark {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10rem
  }
</style>