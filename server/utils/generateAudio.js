const tts = require("@google-cloud/text-to-speech");
const fs = require('fs');
const util = require('util')
const client = new tts.TextToSpeechClient()
const path = require('path');
const Order = require('../models/Order');
const Item = require('../models/Item');
const writeFile = util.promisify(fs.writeFile);

module.exports = async function (item, language = "en-US", delay = 1) {
    try {

        const { _id: id, ingredients, extra, name, quantity } = item;
        const audioName = String(id) + language + '.mp3';
        const audioPath = path.resolve(__dirname, '..', 'static', `${audioName}`);
        const returnObject = { data: path.join('static', audioName) };

        if (fs.existsSync(audioPath)) {
            return returnObject;
        };

        const ingredientData = await Item.findIngredients(id);
        const ingredientString = ingredientData.map(ingredient => `${ingredient.name} <break time="1s" />`).join(' ');

        const text = `
            <speak>
                ${quantity} ${name}
                <break time="${delay}s" />
                ${ingredientString}
                extra information <break time="${delay}s" />
                ${extra.join(' ')}
            </speak>
            `
        const request = {
            input: { ssml: text },
            // LANGUAGE HAS TO BE IN THIS FORMAT - [en-US]
            voice: { languageCode: language, ssmlGender: 'FEMALE' },
            audioConfig: { audioEncoding: 'MP3' },
        };

        const [response] = await client.synthesizeSpeech(request);

        await writeFile(audioPath, response.audioContent, 'binary');
        console.log(`Saved to ${audioPath}`);

        return returnObject;
    } catch (e) {
        console.log(e)
    }
}