import { defineStore } from 'pinia'
import axios from 'axios'
import { reloadBrowser} from "../logic/utils"

export enum LS {
  userProfile = 'userProfile',
  authToken = 'authToken'
}

axios.defaults.baseURL = import.meta.env.APP_BASE_URL?.toString()

export const userAuth = defineStore({
  id: 'Auth',
  state: () => ({
  }),
  getters: {

  },
  actions: {
    // user registration
    async signup(userCreds: any, cb: (success: boolean, msg: string) => any) {
      const formData = new FormData()
      formData.append("name", userCreds.name)
      formData.append("email", userCreds.email)
      formData.append("password", userCreds.password)
      if (userCreds.statusText) {
        formData.append("statusText", userCreds.statusText)
      }
      if (userCreds.file) {
        formData.append("profileImage", userCreds.file)
      }
      try {
        const {data} = await axios.post("/auth/register", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        
        if (data) {
          localStorage.setItem(LS.authToken, data.token)
          localStorage.setItem(LS.userProfile, JSON.stringify(data.user))
          cb(true, "Register successfully")
        }
      } catch (error) {
        cb(false, "Can not register")
      }
    },

    // user login
    async login(userCreds: { email: string, password: string }, cb: (succes: boolean, msg: string) => any) {
      try {
        const { data } = await axios.post('/auth/login', userCreds)
        if (data) {
          localStorage.setItem(LS.authToken, data.token)
          localStorage.setItem(LS.userProfile, JSON.stringify(data.user))
          cb(true, "Login successfully")
        }
      }
      catch (error) {
        cb(false, "User not found")
      }
    },

    // user log out
    logout() {
      localStorage.clear()
      reloadBrowser("/blogs")
    }
  },
})
