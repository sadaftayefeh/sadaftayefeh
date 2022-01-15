
import {incrementCustomProperty,getCustomProperty, setCustomProperty}from "./updateCustomProperty.js"

const pigElm=document.querySelector("[data-pig]")
const JUMP_SPEED=0.45
const GRAVITY=0.0015
const PIG_FRAME_COUNT=2
const FRAME_TIME=220



let isJumping
let pigFrame
let currentFrameTime
let yVelocity

export function setUpPig(){
    isJumping=false
    pigFrame=0
    currentFrameTime=0
    yVelocity=0
    setCustomProperty(pigElm, "--bottom",0)
    document.removeEventListener("keydown",onJump)
    document.addEventListener("keydown",onJump)
}

export function updatePig(delta,speedScale){

    handleRun(delta,speedScale)

    handleJump(delta)

}
export function getPigRect() {
    return pigElm.getBoundingClientRect()
  }
  
  export function setPigLose() {
    pigElm.src = "images/pig-lose1.png"
  }

function handleRun(delta,speedScale){
    if(isJumping){
        pigElm.src=`./images/pig-jump.png`
        return
    }
    if(currentFrameTime >= FRAME_TIME){

        pigFrame=(pigFrame+1)%PIG_FRAME_COUNT
        pigElm.src=`./images/pig-run-${pigFrame}.png`
        currentFrameTime -= FRAME_TIME
    }
    currentFrameTime+=delta*speedScale
}

function handleJump(delta){
    if(!isJumping)
    return
    incrementCustomProperty(pigElm,"--bottom",yVelocity*delta)

    if(getCustomProperty(pigElm,"--bottom")<=0){
        setCustomProperty(pigElm,"--bottom",0)
        isJumping=false

    }
    yVelocity-=GRAVITY*delta

}

function onJump(e){
    if(e.code !== "Enter"|| isJumping) 
    return
    yVelocity=JUMP_SPEED
    isJumping=true

}