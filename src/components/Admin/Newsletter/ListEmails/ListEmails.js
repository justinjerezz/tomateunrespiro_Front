import React, { useState, useEffect } from "react";
import { Newsletter } from "../../../../api";
import { Loader, Pagination } from "semantic-ui-react";
import { useAuth } from "../../../../hooks";
import { map, size } from "lodash";
import { EmailItem } from "../EmailItem";
import "./ListEmail.scss"

const newsletterController = new Newsletter();

export function ListEmails() {
  const [emails, setEmails] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [reload, setrReload] = useState(false);
  const { accessToken } = useAuth();


  const onReload=()=> setrReload((prevState)=>!prevState);


  useEffect(() => {
    (async () => {
      try {
        const response = await newsletterController.getEmails(accessToken,page);
        setEmails(response.docs);
        setPagination({
          limit: response.limit,
          page: response.page,
          pages: response.pages,
          total: response.total,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page,reload]);

  const changePage=(_,data)=>{
    setPage(data.activePage);
  }

  if (!emails) return <Loader active inline="centered"></Loader>;
  if (size(emails) === 0) return "No hay emails registrados";

  return (
    <div>
      {map(emails, (email) => (
        <EmailItem key={email._id} email={email} onReload={onReload} />
      ))}
      <div className="list-emails__pagination">
        <Pagination
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={false}
          firstItem={false}
          lastItem={false}
          onPageChange={changePage}
        ></Pagination>
      </div>
    </div>
  );
}
