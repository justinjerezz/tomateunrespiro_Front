import React, { useState, useEffect } from "react";
import { Container, Loader, Image } from "semantic-ui-react";
import { ENV } from "../../../utils";
import "./Post.scss";
import { useParams } from "react-router-dom";
import { Post as PostController } from "../../../api";

const postController = new PostController();

export function Post() {
  const [post, setPost] = useState(null);
  const { path } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await postController.getPost(path);
        setPost(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [path]);

  if (!post) return <Loader active inline="centered"></Loader>;
  return (
    <Container className="post">
      <h1 className="title">{post.title} <h3 className="title2">{post.city}</h3></h1>
      
      <div className="image-post">
        <Image src={`${ENV.BASE_PATH}/${post.miniature}`} fluid />
      </div>

      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </Container>
  );
}
