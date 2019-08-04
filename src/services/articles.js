import axios from "axios";
import config from "./../config";
const { validateAll } = window;

export default class ArticlesService{
    getArticles = (url = `${config.apiUrl}/articles`) => {
        return new Promise((resolve, reject) => {
            axios.get(url).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    getArticle = (slug) => {
        return new Promise((resolve, reject) => {
            axios.get(`${config.apiUrl}/article/${slug}`).then(response => {
                resolve(response.data.data)
            }).catch(error => {
                reject(error)
            })
        })
    }
    getUserArticles = (token, url = `${config.apiUrl}/user/articles`) => {
        return new Promise((resolve, reject) => {
            axios.get(url,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                resolve(response.data.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    getArticleCategories = () => {
        return new Promise((resolve, reject) => {
            const categories = JSON.parse(localStorage.getItem('categories'))
            if(categories){
                resolve(categories)
            }else{
                axios.get(`${config.apiUrl}/categories`).then((response) => {
                    localStorage.setItem('categories', JSON.stringify(response.data.categories))
                    resolve(response.data.categories)
                }).catch((error) => {
                    reject(error)
                })
            }
        })
    }
    createArticle = (data, token) => {
        return new Promise((resolve, reject) => {
            const rules = {
                title: 'required',
                content: 'required',
                category: 'required'
            }
            const messages = {
                required: 'The {{field}} is required'
            }
            validateAll(data, rules, messages).then(() => {
                if(data.image){
                    this.uploadToCloudinary(data.image).then((response) => {
                        axios.post(`${config.apiUrl}/articles`,{
                            title: data.title,
                            content: data.content,
                            category_id: data.category,
                            imageUrl: response.secure_url
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then((response) => {
                            resolve(response.data)
                        }).catch((error) => {
                            reject(error.response.data)
                        })
                    }).catch((error) => {
                        reject(error)
                    })
                }else{
                    reject([
                        {
                            message: "The image is required"
                        }
                    ])
                }
            }).catch((error) => {
                reject(error)
            })
        })
    }
    updateArticle = (data, article, token) => {
        return new Promise((resolve, reject) => {
            const rules = {
                title: 'required',
                content: 'required',
                category: 'required'
            }
            const messages = {
                required: 'The {{field}} is required'
            }
            validateAll(data, rules, messages).then(() => {
                if(data.image){
                    this.uploadToCloudinary(data.image).then((response) => {
                        axios.put(`${config.apiUrl}/articles/${article.id}`,{
                            title: data.title,
                            content: data.content,
                            category_id: data.category,
                            imageUrl: response.secure_url
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then((response) => {
                            resolve(response.data)
                        }).catch((error) => {
                            reject(error.response.data)
                        })
                    }).catch((error) => {
                        reject(error)
                    })
                }else{
                    axios.put(`${config.apiUrl}/articles/${article.id}`,{
                        title: data.title,
                        content: data.content,
                        category_id: data.category,
                        imageUrl: article.imageUrl
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then((response) => {
                        resolve(response.data)
                    }).catch((error) => {
                        reject(error.response.data)
                    })
                    // reject([
                    //     {
                    //         message: "The image is required"
                    //     }
                    // ])
                }
            }).catch((error) => {
                reject(error)
            })
        })
    }
    deleteArticle = (id, token) => {
        return new Promise((resolve, reject) => {
            axios.delete(`${config.apiUrl}/articles/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    uploadToCloudinary = (image) => {
        return new Promise((resolve,reject) => {
            const form = new FormData();
            form.append('file', image)
            form.append('upload_preset','ezlgegqv')
            axios.post(`https://api.cloudinary.com/v1_1/dsmmcomos/image/upload`, form).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }
}