const Discord = require('discord.js')
const { client } = require('../index'); 
  const { createCmd } = require('../dataHandler')

  client.on('ready', () => {
    createCmd(client, '952337892678701127')
  })