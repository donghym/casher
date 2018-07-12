
import axios from 'axios'
import qs from 'qs'
axios.defaults.withCredentials = true

export const getarchives = (json) =>new axios.get("/api/archivesData");
