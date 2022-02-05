import themes from './hueThemes.js'
import changeLights from './hueControls.js'
import ComfyJS from 'comfy.js'

const themeNames = ['fairfax', 'osaka', 'tokyo', 'motown', 'starlight']
ComfyJS.onChat = ( user, message, flags, self, extra ) => {
    if ( extra.customRewardId === '2e881bbe-fd0c-4223-b35b-21a8f2877f95' ) {
        if( themeNames.indexOf(message.toLowerCase()) === -1 ){
            console.log('Try another theme name')
        } else {
            console.log("Switching to", message)
            changeLights(3, true, themes[message][0].hue, themes[message][0].sat, themes[message][0].bri)
            changeLights(5, true, themes[message][1].hue, themes[message][1].sat, themes[message][1].bri)
        }
    }
}
ComfyJS.Init( "sekeidesign" );