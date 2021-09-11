import { defineStore } from 'pinia'
import axios from 'axios'
import { reloadBrowser, toast } from "../logic/utils"



axios.defaults.baseURL = 'http://localhost:3000'

export const blogStore = defineStore({
  id: 'Blogs',
  actions: {
    async getAllBlogs(cb: (success: boolean, msg: any)=> any) {
      try {
        const { data } = await axios.get("/blog")
        if (data) {
          cb(true, data)
        }
      } catch (error) {
        toast("Some Error Occured", "danger")
      }
    }
  },
})
