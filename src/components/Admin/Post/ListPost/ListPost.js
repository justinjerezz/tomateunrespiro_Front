import React, { useState, useEffect } from "react";
import { Post } from "../../../../api";
import { Auth } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { User } from "../../../../api";
import { map, size } from "lodash";
import { Loader, Pagination } from "semantic-ui-react";
import "./ListPost.scss";
import { PostItem } from "../PostItem";

const postController = new Post();
const authController = new Auth();
const userController = new User();
export function ListPost(props) {
  const [posts, setPosts] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const{accessToken}=useAuth();


  const {reload,onReload}= props;

  useEffect(() => {
    (async () => {
      try {
        const idUser=authController.getIdUser();
        const infoUser= await userController.getMe(accessToken);

        if (infoUser.role==="user") {
           const response = await postController.getPosts(page,limit,idUser);
           setPosts(response.docs);
           setPagination({
             limit: response.limit,
             page: response.page,
             pages: response.pages,
             total: response.total,
           });
        }else{
          const response2=await postController.getPostsPrincipal(page,limit);
          setPosts(response2.docs);
          setPagination({
            limit: response2.limit,
            page: response2.page,
            pages: response2.pages,
            total: response2.total,
          });
        }

      } catch (error) {
        console.error(error);
      }
    })();
  }, [page,reload]);

  const changePage = (_, data) => {
    setPage(data.activePage);
  };

  if (!posts) return <Loader active inline="centered"></Loader>;
  if (size(posts) === 0) return "No hay nigun post";

  return (
    <div className="list-post">
      {map(posts, (post) => (
        <PostItem key={post._id} post={post} onReload={onReload}></PostItem>
      ))}

      <div className="list-post__pagination">
        <Pagination
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          onPageChange={changePage}
        ></Pagination>
      </div>
    </div>
  );
}
