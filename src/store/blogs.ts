import { defineStore } from 'pinia'
import axios from 'axios'
import { reloadBrowser, toast } from "../logic/utils"
import { LS } from "./auth"
import imageCompression from 'browser-image-compression';



axios.defaults.baseURL = import.meta.env.APP_BASE_URL?.toString()
// axios.defaults.headers.Authorization = localStorage.getItem(LS.authToken)

export const blogStore = defineStore({
  id: 'Blogs',
  actions: {
    async getAllBlogs(cb: (success: boolean, msg: any) => any) {
      try {
        const { data } = await axios.get("/blog")
        if (data) {
          cb(true, data)
        }
      } catch (error) {
        toast("Some Error Occured", "danger")
      }
    },
    async getSingleBlog(_id: string, cb: (success: boolean, msg: any) => any) {
      try {
        const { data } = await axios.get(`/blog/${_id}`)
        if (data) {
          cb(true, data)
        }
      } catch (error) {
        toast("Some Error Occured", "danger")
      }
    },
    async postBlog(blogData: any, cb: (success: boolean, msg: any) => any) {
      try {
        const formData = new FormData()
        formData.append("categoryId", blogData.catId)
        formData.append("initialParagraph", blogData.firstParagraph)
        formData.append("title", blogData.title)
        formData.append("details", blogData.details)
        if (blogData.image) { 
          const fileToUpload = await imageCompression(blogData.image, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1024,
          });
          formData.append("image", fileToUpload)
        }
        const { data } = await axios.post("/blog/", formData,{
          headers: { Authorization: `${localStorage.getItem(LS.authToken)}` }
        })
        if (data) {
          cb(true, data)
          toast("Blog Created", "success")
        }
      } catch (error) {
        toast("Some Error Occured", "danger")
      }
    },
    async postComment(blogId: string, comment: string, cb: (success: boolean, msg: any) => any) {
      try {
        const { data } = await axios.post(`/blog/${blogId}/comment`, {comment},{
          headers: { Authorization: `${localStorage.getItem(LS.authToken)}` }
        })
        if (data) {
          cb(true, "Comment added")
        }
      } catch (error) {
        toast("Some Error Occured", "danger")
      }
    },
  },
})
