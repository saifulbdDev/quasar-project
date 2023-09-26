import { defineStore } from "pinia";
import { Notify } from "quasar";
import { api } from "boot/axios";
export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [],
    comments: [],
    post: {},
    user: {},
    users: [],
    selectUser: null,
    currentPage: 1,
    isAddPost: false,
    isUpdatePost: false,
    loader: false,
  }),
  getters: {
    postsList: (state) =>
      state.selectUser?.id
        ? state.posts.filter((item) => item?.userId === state.selectUser?.id)
        : state.posts,
  },
  actions: {
    currentUser(user) {
      this.user = user;
      this.router.push("/");
    },
    onAddPost(value) {
      this.isAddPost = value;
    },
    onUpdateModel(value) {
      this.isUpdatePost = value;
    },

    async getUsers() {
      try {
        const { data } = await api.get("/users");

        this.users = data;
      } catch (error) {}
    },
    async getPosts() {
      try {
        const { data } = await api.get("/posts");

        this.posts = data;
      } catch (error) {}
    },
    async getPost(id) {
      try {
        const { data } = await api.get(`/posts/${id}`);

        this.post = data;
      } catch (error) {}
    },
    async getPostComments(id) {
      try {
        const { data } = await api.get(`/posts/${id}/comments`);

        this.comments = data;
      } catch (error) {}
    },

    async addPost({ title, body }) {
      try {
        this.loader = true;
        const response = await api.post("/posts", {
          title,
          body,
          userId: this.user.id,
        });

        if (response.status === 201) {
          const newPost = response.data;
          this.posts.push(newPost);

          Notify.create({
            icon: "check_circle",
            message: `Post "${newPost.title.slice(
              0,
              30
            )}..." has been successfully created.`,
            color: "green",
            position: "top-right",
          });
        } else {
          // Handle unexpected response status
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error adding post:", error);
      } finally {
        this.loader = false;
      }
    },
    async updatePost({ title, body, id }) {
      try {
        this.loader = true;
        const response = await api.put(`/posts/${id}`, {
          title,
          body,
          id,
          userId: this.user.id,
        });

        if (response.status === 200) {
          const updatedPostIndex = this.posts.findIndex(
            (post) => post.id === id
          );
          this.posts[updatedPostIndex].title = title;
          this.posts[updatedPostIndex].body = body;

          Notify.create({
            icon: "check_circle",
            message: `Post "${title.slice(
              0,
              30
            )}..." has been successfully updated.`,
            color: "green",
            position: "top-right",
          });
        } else {
          // Handle unexpected response status
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error adding post:", error);
      } finally {
        this.loader = false;
      }
    },
    async deletePost(id) {
      try {
        this.loader = true;
        const response = await api.delete(`/posts/${id}`);

        if (response.status === 200) {
          // Delete the post from this.posts by filtering it out
          this.posts = this.posts.filter((post) => post.id !== id);

          Notify.create({
            icon: "check_circle",
            message: `Post with ID ${id} has been successfully deleted.`,
            color: "dark",
            position: "top-right",
          });
        } else {
          // Handle unexpected response status
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      } finally {
        this.loader = false;
      }
    },
  },
});
