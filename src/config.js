
import env from "react-dotenv";

const GITPOD_ID = env.GITPOD_WORKSPACE_ID  || ""
const API_PORT = 3001

export const API_BASE_URL = 
    (process.env.NODE_ENV === 'development' && GITPOD_ID !== "") ? 
    `https://${API_PORT}-${GITPOD_ID}.ws-eu73.gitpod.io` :
    (process.env.NODE_ENV === 'production') ?
     `https//production_URL_here` : 
    `http://localhost:${API_PORT}`

// config cat setup vars here