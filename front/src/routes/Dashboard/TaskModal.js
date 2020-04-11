import React, { useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { FormattedMessage } from "react-intl";

export default function TaskModal({
  onClose,
  modalType,
  showCommentField,
  handleBtnClick,
}) {
  const [comment, setComment] = useState("");

  function handleCommentChange({ target }) {
    setComment(target.value);
  }

  return (
    <div className="modal modal--task">
      <div className="modal__content">
        <FormattedMessage id={`modal.${modalType}`} tagName="h1" />
        <span className="modal__close" onClick={onClose}>
          x
        </span>
        <FormattedMessage id={`modal.${modalType}.description`} tagName="h2" />
        {showCommentField && (
          <div className="modal__comment">
            <CustomInput
              labelId="modal.comment"
              name="comment"
              modifier="secondary"
              layout="textarea"
              onChange={handleCommentChange}
            />
          </div>
        )}
        <div className="modal__btn">
          <CustomButton
            titleId={`modal.${modalType}`}
            modifier="primary"
            onClick={() => handleBtnClick(comment)}
          />
        </div>
      </div>
    </div>
  );
}
