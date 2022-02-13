import 'dotenv/config'
import axios from 'axios'

const changeLight = async (lightId, on, hue, sat, bri) => {
    try {
        return await axios.put(
            `http://${process.env.BRIDGE_IP}/api/${process.env.BRIDGE_USERNAME}/lights/${lightId}/state`,
            {
                on,
                ...(sat && { sat }),
                ...(bri && { bri }),
                ...(hue && { hue }),
            }
        );
    } catch (err) {
        console.error(err);
    }
};

export default changeLight