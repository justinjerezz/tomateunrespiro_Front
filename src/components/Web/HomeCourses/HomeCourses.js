import React, { useState, useEffect } from "react";
import { Container, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { Post } from "../../../api";
import { ENV } from "../../../utils";
import "./HomeCourses.scss";

const postController = new Post();

export function HomeCourses() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await postController.getPostsPrincipal({
          limit: 6,
        });
        setPosts(response.docs);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Container className="home-courses">
      <h2>Viajeros que han compartido sus rutas</h2>
      <div className="home-courses__all-courses">
        {map(posts,(post)=>(
            <Link key={post._id} className="list-post-item" to={`/blog/${post.path}`}>
            <Image src={`${ENV.BASE_PATH}/${post.miniature}`} fluid />
            <h2>{post.title}</h2>
            <h3>{post.city}</h3>

          </Link>
        ))}
      </div>
      <div className="home-courses__more">
            <Button as={Link} to="/blog" primary>Ver más</Button>
      </div>
    </Container>
  );
}
