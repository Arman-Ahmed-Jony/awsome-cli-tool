#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms=2000) => new Promise((resolve) =>{ setTimeout(resolve, ms)})


async function welcome () {
  const reainbowTitle = chalkAnimation.rainbow('who want\'s to be a js millionaire? \n')

  await sleep()

  reainbowTitle.stop()

  console.log(`
    ${chalk.bgBlue('how to play')}
    I am a process
  `)
}


async function askName () {
  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'text',
    message: "what is your name?",
    default(){
      return 'player name'
    }
  })

  playerName = answers.player_name
}


async function question() {

  const answers = await inquirer.prompt([
    {
      name: 'question_1',
      type: 'list',
      message: 'what is the creation date of javascript?',
      choices: [
        'may 23rd 1995',
        'nov 24th 1995',
        'dec 5th 1995',
      ]
    },
    {
      name: 'question_2',
      type: 'checkbox',
      message: 'what are comperison operators?',
      choices: [
        '<',
        '>',
        '=',
      ]
    },
    {
      name: 'question_3',
      type: 'confirm',
      message: 'are you willing to learn javascript?'
    },
    {
      name: 'question_4',
      type: 'editor',
      message: 'leave us some comments.'
    }
  ])

  return handleAnswer(answers)
}

async function handleAnswer(answers) {
  const spinner = createSpinner('saving your response...').start();

    await sleep()

    spinner.success({
      text:`dear ${playerName}. your response is saved to our server. will let you know soon`
    })
    // if(isCorrect) {
    //   spinner.success({
    //     text:`Nice work ${playerName}. thats a legit answer`
    //   })
    // }else{
    //   spinner.error({text: `game over. you lose ${playerName}`})
    //   process.exit(1)
    // }
}


async function winner() {
  console.clear()
  const msg = `congrats, ${playerName}\n you have won  1, 00, 00`
  figlet(msg, (err, data)=> {
    console.log(gradient.pastel.multiline(data))
  })
}

await welcome()
await askName()
await question()

winner()
