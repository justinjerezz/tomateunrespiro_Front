import React, {useState} from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import "./EmailItem.scss";
import { Newsletter } from "../../../../api";
import { useAuth } from "../../../../hooks";


const newsletterController=new Newsletter();

export function EmailItem(props) {
  const { email ,onReload} = props;
  const {accessToken}=useAuth();
  const [showConfirm, setShowConfirm] = useState(false);

  const onOpenCloseConfirm=()=>setShowConfirm((prevState)=>!prevState);

  const onDelete=async()=>{
    try {
      await newsletterController.deleteEmail(accessToken,email._id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <>
      <div className="email-item">
          <span>{email.email}</span>
        <div>
          <Button icon color="red" onClick={onOpenCloseConfirm}>
            <Icon name="trash"></Icon>
          </Button>
        </div>
      </div>

      <Confirm
      open={showConfirm}
      onCancel={onOpenCloseConfirm}
      onConfirm={onDelete}
      content={`Eliminar ${email.email}`}
      size="mini"
      >

      </Confirm>
    </>
  );
}
