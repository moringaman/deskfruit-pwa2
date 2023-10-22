
import env from "react-dotenv";

const GITPOD_ID = env.GITPOD_WORKSPACE_ID  || ""
const GITPOD_CLUSTER = env.GITPOD_WORKSPACE_CLUSTER_HOST
const API_PORT = 3001

export const API_BASE_URL = 
    (process.env.NODE_ENV === 'development' && GITPOD_ID !== "") ? 
    `https://${API_PORT}-${GITPOD_ID}.${GITPOD_CLUSTER}` :
    (process.env.NODE_ENV === 'production') ?
     `https://deskfruit-api.vercel.app/` : 
    `http://localhost:${API_PORT}`

// config cat setup vars here



// UI Config

type UiConfig = {
    hasFooterMenu: string[]
    hasAddUserButton: string[]
    hasHeader: string[]
}

export const uiConfig:UiConfig = {
    hasFooterMenu: [ 'profile', 'auth'], // List pages with footer menu here
    hasAddUserButton: ['profile'],
    hasHeader: ['/', 'profile']
}