
import { ENV } from "../utils";

export class Post {
  baseApi = ENV.BASE_API;

  async createPost(accessToken, data) {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.file) {
        formData.append("miniature", data.file);
      }

      const url = `${this.baseApi}/${ENV.API_ROUTES.POST}`;

      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer${accessToken}`,
        },
        body: formData,
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getPosts(page = 1, limit = 10, idUser) {
    try {
      const pageFilter = `page=${page}`;
      const limitFilter = `limit=${limit}`;
      const idUserParam=`idUser=${idUser}`

      const url = `${this.baseApi}/${ENV.API_ROUTES.POST}?${pageFilter}&${limitFilter}&${idUserParam}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
  async getPostsPrincipal(params) {
    try {
      const pageFilter = `page=${params?.page || 1}`;
      const limitFilter = `limit=${params?.limit || 10}`;

      const url = `${this.baseApi}/${ENV.API_ROUTES.POSTPRINCIPAL}?${pageFilter}&${limitFilter}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getPost(path) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.POST}/${path}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }



  async updatePost(accessToken, idPost, data) {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.file) {
        formData.append("miniature", data.file);
      }

      const url = `${this.baseApi}/${ENV.API_ROUTES.POST}/${idPost}`;

      const params = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer${accessToken}`,
        },
        body: formData,
      };

      const response = await fetch(url,params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(accessToken, idPost) {
    try {
      
      const params = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer${accessToken}`,
        },
      };

      const url = `${this.baseApi}/${ENV.API_ROUTES.POST}/${idPost}`;

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
