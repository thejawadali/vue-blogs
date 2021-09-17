import { defineStore } from 'pinia'
import axios from 'axios'
import { reloadBrowser, toast } from "../logic/utils"
import { LS } from "./auth"



axios.defaults.baseURL = 'http://localhost:3000'

export const categoryStore = defineStore({
  id: 'Tag',
  actions: {
    async getAllTags(cb: (success: boolean, msg: any) => any) {
      try {
        const { data } = await axios.get("/category")
        if (data) {
          cb(true, data)
        }
      } catch (error) {
        toast("Some Error Occured", "danger")
      }
    }
  },
})
