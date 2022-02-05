import ComfyJS from 'comfy.js'
import themes from './Lights/hueThemes.js'
import changeLights from './Lights/hueControls.js'
import shoutouts from './Shoutouts/shoutouts.js'

console.log(shoutouts)

const themeNames = ['fairfax', 'osaka', 'tokyo', 'motown', 'starlight']
ComfyJS.onChat = ( user, message, flags, self, extra ) => {
    if ( extra.customRewardId === '2e881bbe-fd0c-4223-b35b-21a8f2877f95' ) {
        if( themeNames.indexOf(message.toLowerCase()) === -1 ){
            console.log('Try another theme name')
        } else {
            console.log("Switching to", message)
            const light0 = themes[message][0]
            const light1 = themes[message][1]
            changeLights(3, true, light0.hue, light0.sat, light0.bri)
            changeLights(5, true, light1.hue, light1.sat, light1.bri)
        }
    }
}
ComfyJS.Init( "sekeidesign" );
