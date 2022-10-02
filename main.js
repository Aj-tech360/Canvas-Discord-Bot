require('dotenv').config();
const Discord = require('discord.js');
const { MessageAttachment, Client, GatewayIntentBits } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { canvasUrl, redirectUrl } = require('./config.json')


// start new discord client
const client = new Discord.Client({ intents: ["GUILDS", "DIRECT_MESSAGES", 'GUILD_MESSAGES']});
client.commands = new Discord.Collection();

// canvas oauth2 
const url = canvasUrl.concat('/login/oauth2/auth?client_id=',process.env.CLIENTID,'&response_type=code&redirect_uri=', redirectUrl);
client.once('ready', () => {
    console.log('ready!');
    fetch(url).then((response) => {
        return response.json();
    }).then((myJson) => {
        console.log(myJson);
    });
});

// login to discord
client.login(process.env.DISCORD_TOKEN);

//todo: get canvas courses, add groups to discord, project calendar